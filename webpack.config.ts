import * as path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
    entry: './src/js/react/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/assets'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                    loader: 'css-loader',
                    options: { url: false }
                    },
                    'sass-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        host: 'localhost',
        historyApiFallback: true,
    },
};

export default config;