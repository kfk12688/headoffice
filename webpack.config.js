var path = require("path");
var webpack = require('webpack');

var nodeModulesPath = path.join(__dirname, 'node_modules');

var config = {
  entry: {
    vendors: ['react', 'react-dom'],
    app: path.join(__dirname, 'app', 'js', 'index.tsx')
  },
  resolveLoader: {
    root: nodeModulesPath
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    modulesDirectories: ["node_modules", "resources"],
    alias: {
      'react': path.join(nodeModulesPath, 'react', 'react.js'),
      'react-dom': path.join(nodeModulesPath, 'react-dom', 'dist', 'react-dom.js')
    }
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunk].js'
  },


  module: {
    preLoaders: [{
      test: /\.tsx?$/,
      loader: "tslint",
      include: path.resolve(__dirname, "app", 'js')
    }],
    noParse: [],
    loaders: [{
      test: /\.less$/,
      loader: "style!css!less"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.(jpg|png|jpg|png|woff|eot|ttf|svg|gif)$/,
      loader: "file-loader?name=[name].[ext]"
    }, {
      test: /\.tsx?$/,
      loader: 'ts',
      include: path.resolve(__dirname, "app", 'js')
    }]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors_[chunk].js'),
    // Used for hot-reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  tslint: {
    // Rules are in tslint.json
    emitErrors: true, // false = WARNING for webpack, true = ERROR for webpack
    formattersDirectory: path.join(nodeModulesPath, 'tslint-loader', 'formatters')
  },

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    contentBase: path.resolve(__dirname, 'app', 'js'),
    stats: 'minimal'
  }
};

module.exports = config;
