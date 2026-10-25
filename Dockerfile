# --- Build stage -----------------------------------------------------
# Has webpack, babel, sass, and all devDependencies. Discarded after
# this stage - none of it becomes part of the shipped image.
FROM node:lts-alpine3.22 AS builder
WORKDIR /app

# build-base + python3 are needed because better-sqlite3 has no
# prebuilt binary for musl libc (Alpine) and has to compile from
# source; git is needed because package.json depends on a github:
# package (wasm-model-viewer-core-bin) rather than one from the npm
# registry, so npm needs git available to fetch it.
RUN apk update && \
    apk upgrade && \
    apk add --no-cache build-base python3 git

COPY package.json package-lock.json ./
RUN npm ci

# CI passes the current commit of wasm-model-viewer-core-bin main so a
# push to that repo produces a new image even though package-lock.json
# still pins an older commit. Declared after npm ci so only this layer
# and the ones below rebuild when the library changes. Left empty (local
# builds), the lockfile pin is used as-is.
ARG WASM_BIN_SHA=""
RUN if [ -n "$WASM_BIN_SHA" ]; then \
      npm install --no-audit --no-fund \
        "wasm-model-viewer-core-bin@github:stamps9k/wasm-model-viewer-core-bin#${WASM_BIN_SHA}"; \
    fi

# .dockerignore keeps node_modules, dist, and test out of what actually
# gets sent to the build context.
COPY . .

# Matches the real build script: webpack --mode production
RUN npm run build

# Prune devDependencies now that the build is done.
RUN npm prune --omit=dev

# --- Runtime stage -----------------------------------------------------
# server.mjs is a real Express app (serves the built frontend AND API
# routes) - it's not static-only, so this stage needs Node plus the
# production node_modules, not just the dist output. It isn't bundled
# by webpack (only the frontend is), so api/ and the public/libs helper
# it imports have to be copied in alongside it, and databases/app.db
# has to sit two directories above api/models.mjs, same as in the repo.
#
# node_modules is copied straight from the builder rather than
# re-running npm ci here, so this stage never needs to re-resolve the
# github: dependency a second time.
FROM node:lts-alpine3.22 AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.mjs ./server.mjs
COPY --from=builder /app/api ./api
COPY --from=builder /app/public/libs ./public/libs
COPY --from=builder /app/databases ./databases
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "server.mjs"]

