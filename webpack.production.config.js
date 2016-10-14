var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");
var AutoPrefixer = require("autoprefixer");

module.exports = {
  entry   : [
    path.join(__dirname, "src/index.js")
  ],
  resolve : {
    root  : path.resolve(__dirname),
    alias : {
      components : path.resolve(__dirname, "src", "components"),
      dataflow   : path.resolve(__dirname, "src", "dataflow")
    }
  },
  output  : {
    path       : path.join(__dirname, "/dist/public"),
    filename   : "[name]-[hash].min.js",
    publicPath : "/"
  },
  plugins : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template : "src/index.tpl.html",
      inject   : "body",
      filename : "index.html"
    }),
    new ExtractTextPlugin("[name]-[hash].min.css"),
    new webpack.optimize.UglifyJsPlugin({
      compressor : {
        warnings  : false,
        screw_ie8 : true
      }
    }),
    new StatsPlugin("webpack.stats.json", {
      source  : false,
      modules : false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV" : JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module  : {
    loaders : [{
      test    : /\.js?$/,
      exclude : /node_modules/,
      loader  : "babel-loader",
      query   : {
        "presets" : ["es2015", "stage-0", "react"],
        "plugins" : ["transform-es2015-destructuring", "transform-object-rest-spread"]
      }
    }, {
      test   : /\.json?$/,
      loader : "json"
    }, {
      test   : /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader : "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test    : /\.less/,
      loaders : [
        "style",
        "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
        "postcss",
        "less"
      ]
    }, {
      test   : /\.css$/,
      loader : ExtractTextPlugin.extract("style", "css!postcss")
    }]
  },
  postcss : [AutoPrefixer]
};
