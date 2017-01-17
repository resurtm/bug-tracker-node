import path from 'path';
import dotenv from 'dotenv';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

dotenv.config();

export default {
    name: 'bug-tracker-node',
    target: 'web',
    debug: true,
    entry: [
        path.resolve(__dirname, 'app/sass/main.scss'),
        path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract([
                    'css-loader?sourceMap=true',
                    'sass-loader?sourceMap=true'
                ])
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|woff|woff2|eot|ttf)(.*)$/,
                loader: 'url-loader?limit=5000'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
            'process.env': {
                SOCKETIO_SERVER_HOST: JSON.stringify(process.env['SOCKETIO_SERVER_HOST']),
                SOCKETIO_SERVER_PORT: JSON.stringify(process.env['SOCKETIO_SERVER_PORT'])
            }
        }),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    devtool: 'source-map'
}
