var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

var sourcesRoot = __dirname;

module.exports = function makeWebpackConfig() {

    // This is the object where all configuration gets set
    // Reference: http://webpack.github.io/docs/configuration.html
    var config = {};

    config.entry = {
        'polyfills': ['es6-shim/es6-shim.js', 'angular2/bundles/angular2-polyfills'],
        'vendor': './src/vendor.ts',
        'app': './src/main.ts' // our angular app
    };

    config.output = {
        path: path.join(sourcesRoot, 'wwwroot'),
        filename: 'js/[name].js'
    };

    config.resolve = {
        root: sourcesRoot,
        // only discover files that have those extensions
        extensions: ['', '.ts', '.js', '.css', '.html']
    };

    // List: http://webpack.github.io/docs/list-of-loaders.html
    config.module = {
        loaders: [
          // Reference: https://github.com/TypeStrong/ts-loader
          // -> ts compilation
          {
              test: /\.ts$/,
              loader: 'ts'
          },

          // Reference: https://github.com/webpack/css-loader
          // -> will resolve imports and requires in css
          // Reference: https://github.com/webpack/style-loader
          // -> will load the css into the page
          {
              test: /\.css$/,
              // all files in css folder
              include: path.join(sourcesRoot, 'src/css'),
              loader: 'style!css'
          },

          // Reference: https://github.com/webpack/raw-loader
          {
              test: /\.css$/,
              // all files in app folder will get inlined
              include: path.join(sourcesRoot, 'src/app'),
              loader: 'raw'
          },

          // https://github.com/webpack/raw-loader
          {
              test: /\.html$/,
              loader: 'raw'
          }
        ]
    };

    // Plugins
    // List: http://webpack.github.io/docs/list-of-plugins.html
    config.plugins = [
        // Copy assets from the public folder
        // Reference: https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin([{
            from: path.join(sourcesRoot, 'src/html')
        }]),

        // Generate common chunks if necessary
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        new CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        })
    ];

    return config;
}();