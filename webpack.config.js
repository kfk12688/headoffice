var path              = require("path");
var webpack           = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool : "eval",
  entry   : [
    "webpack-hot-middleware/client?reload=true",
    path.join(__dirname, "src/index.js")
  ],
  resolve : {
    root  : path.join(__dirname),
    alias : {
      components : path.join(__dirname, "src", "components"),
      utils      : path.join(__dirname, "src", "utils.js"),
      forms      : path.join(__dirname, "src", "forms"),
      dataflow   : path.join(__dirname, "src", "dataflow")
    }
  },
  output  : {
    path       : path.join(__dirname, "dist"),
    filename   : "[name].js",
    publicPath : "/"
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : "src/index.tpl.html",
      inject   : "body",
      filename : "index.html"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV" : JSON.stringify("development")
    })
  ],
  module  : {
    loaders : [{
      test    : /\.js$/,
      loader  : "babel-loader",
      exclude : /node_modules/,
      query   : {
        cacheDirectory : true,
        presets        : ["react", "es2015", "stage-0", "react-hmre"],
        plugins        : ["transform-es2015-destructuring", "transform-object-rest-spread", "ramda"]
      }
    }, {
      test   : /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader : "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test    : /\.less/,
      loaders : [
        "style",
        "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
        "less"
      ]
    }, {
      test   : /\.css$/,
      loader : "style!css"
    }]
  }
};
