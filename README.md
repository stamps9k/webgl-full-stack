# webgl-full-stack
A full stack implementation of my previous static webgl project

# How to run
## Web frontend
npm start

## API
npm run dev

# Debugging
## Server side debugging
server side debugging is managed by settting the DEBUG environment variable. For example
'DEBUG="app:SUPER_SUPER_VERBOSE,app:SUPER_VERBOSE,app:VERBOSE,app:INFO,app:WARN,app:ERROR"'. Levels can be excluded depending on requirements.

## Client side debugging 
Debugging can be enabled in browser using the command "localStorage.debug = 'app:SUPER_SUPER_VERBOSE,app:SUPER_VERBOSE,app:VERBOSE,app:INFO,app:WARN,app:ERROR" levels can be excluded depending on requirements.