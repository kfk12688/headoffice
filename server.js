var path = require("path");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config");
var compiler = webpack(config);
var port = 3001;

// webpack-dev-server options
var server = new WebpackDevServer(compiler, {

  contentBase : path.resolve(__dirname),

  hot : true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback : true,

  // Set this if you want to enable gzip compression for assets
  // compress : true,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "*" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy : {
    "/api/*" : "http://localhost:3000",
  },

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  // staticOptions : {},

  // webpack-dev-middleware options
  publicPath : config.output.publicPath,
  stats      : "minimal",
});

server.listen(port, "localhost", function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
