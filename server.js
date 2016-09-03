var path = require("path");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config");
var compiler = webpack(config);
var port = 3001;

// webpack-dev-server options
var server = new WebpackDevServer(compiler, {
  contentBase : path.resolve(__dirname),
  // webpack-dev-middleware options
  publicPath : config.output.publicPath,
  hot : true,
  historyApiFallback : true,
  proxy : {
    "/api/*" : "http://localhost:3000",
  },
  stats      : "minimal",
});

server.listen(port, "localhost", function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
