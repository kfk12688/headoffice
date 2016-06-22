var path = require("path")
var webpack = require("webpack")

module.exports = {
  devtool : "eval",
  entry   : [
    "webpack-hot-middleware/client",
    "./index"
  ],
  resolve : {
    root  : path.resolve(__dirname),
    alias : { "components" : path.resolve(__dirname, "components") }
  },
  output  : {
    path       : path.join(__dirname, "dist"),
    filename   : "bundle.js",
    publicPath : "/static/"
  },
  plugins : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module  : {
    loaders : [{
      test    : /\.js$/,
      loaders : ["react-hot", "babel"],
      exclude : /node_modules/,
      include : __dirname
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
}
