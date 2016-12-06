var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var less = require('less');
less.render('.class{}',
    {
      paths: ['.', './lib'],  // Specify search paths for @import directives
      filename: 'style.less', // Specify a filename, for better error messages
      compress: true          // Minify CSS output
    },
    function (e, output) {
       console.log(output.css);
    });
module.exports = {
    devtool: 'source-map',
    entry: [
        // 'webpack/hot/only-dev-server',
        './src/maya-calendar-public.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true
        }),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel', 'babel-loader','babel?presets[]=es2015,presets[]=stage-1,presets[]=react,plugins[]=transform-runtime'],
                exclude: /node_modules/,
                include: __dirname,
            }, 
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            } 
                // {
            //     test: /\.png$/,
            //     loader: "url-loader?limit=100000"
            // }, {
            //     test: /\.jpg$/,
            //     loader: "file-loader"
            // }, {
            //     test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            //     loader: 'file-loader'
            // },             
            
        ]
    },
};

