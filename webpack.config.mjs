import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
        entry: './public/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        experiments: {
            asyncWebAssembly: true
        },
        devtool: isDev ? 'source-map' : false,
        devServer: {
            static: './dist',
            hot: true,
            port: 8080,
            historyApiFallback: true,
            proxy: [
                {
                    context: ['/api'],
                    target: "http://localhost:5000" // Redirect API calls to Express backend
                }
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.css$/, 
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.scss$/,
                    oneOf: [
                        {
                            // Rule for Bootstrap SCSS
                            include: /node_modules\/bootstrap[\\/]scss/,
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                'css-loader',
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        sassOptions: {
                                            quietDeps: true // Suppress only Bootstrap warnings
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            // Rule for all other SCSS
                            exclude: /node_modules\/bootstrap[\\/]scss/,
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                'css-loader',
                                'sass-loader' // No quietDeps, so warnings show up
                            ]
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|vert|frag|obj|ico|tex|mtl)$/,
                    type: 'asset/resource',
                        generator: {
                        filename: "assets/[name][ext]",
                    }
                }          
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            })
        ]
    };
};
