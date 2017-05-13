var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost/index.html',
        // 'webpack/hot/only-dev-server',
        './src/maya-calendar-admin-display.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin(),
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: './index.html',
    //         inject: true
    //     }),
    //     new webpack.NoErrorsPlugin(),
    //     new ExtractTextPlugin("style.css", {
    //         allChunks: true
    //     })
    // ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel', 'babel-loader','babel?presets[]=es2015,presets[]=stage-1,presets[]=react,plugins[]=transform-runtime'],
                exclude: /node_modules/,
                include: __dirname,
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }, {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            }, {
                test: /\.jpg$/,
                loader: "file-loader"
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            },             
            
        ]
    }
};
