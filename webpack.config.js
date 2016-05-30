var path = require("path");
var webpack = require('webpack');

// Plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");

var nodeModulesPath = path.join(__dirname, 'node_modules');

var config = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'eval',

  // The base directory (absolute path!) for resolving the entry option.
  context: path.resolve(__dirname),

  entry: {
    vendor: ["react", "react-dom", "object-assign", "react-router"],
    app: path.join(__dirname, "app", 'client', 'index.tsx')
  },
  resolveLoader: {
    root: nodeModulesPath
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      components: path.resolve(__dirname, "app", "components")
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    modulesDirectories: ["node_modules"]
  },

  output: {
    filename: "bundle.js",
    path: path.join(__dirname, 'dist')
  },


  module: {
    preLoaders: [{
      test: /\.[ts|tsx]?$/,
      loader: "tslint",
      include: [
        path.resolve(__dirname, "app", "client"),
        path.resolve(__dirname, "app", "components")
      ]
    }],
    noParse: [],
    loaders: [{
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(jpg|png|jpg|png|eot|ttf|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader?name=[name].[ext]"
    }, {
      test: /\.less$/,
      loader: "style!css!less"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.tsx?$/,
      loaders: ['react-hot', 'ts-loader'],
      include: [
        path.resolve(__dirname, "app", "client"),
        path.resolve(__dirname, "app", "components")
      ]
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: "html?name=[name].[ext]",
    }],
    tslint : {
      fileOutput: {
        dir: path.resolve(__dirname, "linter")
      }
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),

    // Used for hot-reload
    // new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: './app/client/index.html',
      inject: 'body'
    }),

    // Uses only the en locale of the moment plugin in build
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),

    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    // new ExtractTextPlugin('[name].[hash].css')
  ],

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    contentBase: path.resolve(__dirname, 'app'),
    stats: 'minimal',
    devtool: 'eval'
  }
};

module.exports = config;
