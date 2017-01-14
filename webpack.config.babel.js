import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    name: 'bug-tracker-node',
    target: 'web',
    debug: true,
    entry: [
        path.resolve(__dirname, 'app/sass/main.scss'),
        path.resolve(__dirname, 'app/main.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'main.js',
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|woff|woff2|eot|ttf)(.*)$/,
                loader: 'url-loader?limit=5000',
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        },
    },
};
