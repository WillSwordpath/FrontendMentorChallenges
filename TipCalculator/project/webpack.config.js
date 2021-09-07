const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const outputPath = path.resolve(__dirname, '..')

module.exports = [
    {
        entry: path.resolve(__dirname, 'src/main.react.tsx'),
        output: {
            path: outputPath,
            filename: 'main.js'
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'assets'),
                        to: '.',
                    },
                    // {
                    //     from: path.resolve(__dirname, './src/index.html'),
                    //     to: './[name][ext]',
                    // },
                    {
                        from: path.resolve(__dirname, './src/index.react.html'),
                        to: './index.html',
                    },
                ],
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            })
        ],
        resolve: {
            extensions: ['.tsx', '.jsx', '.ts', '.js'],
        },
        // target: 'es5',
        target: 'web',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                import: true,
                                url: false,
                            }
                        }
                    ]
                },
                {
                    test: /\.tsx?$/i,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }
            ],
        },
        optimization: {
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                // eslint-disable-next-line quotes
                `...`,
                new HtmlMinimizerPlugin(),
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            "default",
                            {
                                discardComments: { removeAll: true },
                            },
                        ],
                    },
                }),
            ],
        },
        devServer: {
            static: outputPath, // default is './'
            port: 8000,
        },
    },
]
