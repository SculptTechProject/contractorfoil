const path = require('path');

module.exports = {
    entry: './src/index.tsx', // ścieżka do głównego pliku projektu
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.m?js$/, // pozwala na przetwarzanie ES module (mjs) z node_modules
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: true,
        allowedHosts: 'all', // pozwala na dostęp do wszystkich hostów
        compress: true,
        port: 3000,
    },
};