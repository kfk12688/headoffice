const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config.js");

const isDeveloping = process.env.NODE_ENV !== "production";
const port = isDeveloping ? 3001 : process.env.PORT;
const app = express();

var httpProxy = require("http-proxy");
var proxy = httpProxy.createProxyServer();
const proxyTo = function (origin) {
  return function (req, res) {
    return proxy.web(req, res, { target : "http://" + origin });
  };
};

proxy.on("error", function (err, req, res) {
  res.sendStatus(500);
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath  : config.output.publicPath,
    contentBase : "src",
    stats       : {
      colors       : true,
      hash         : false,
      timings      : true,
      chunks       : false,
      chunkModules : false,
      modules      : false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get("/api/*", proxyTo("localhost:3000"));
  app.get("*", function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, "dist/index.html")));
    res.end();
  });
} else {
  app.use(express.static(__dirname + "/dist"));
  app.get("*", function response(req, res) {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
}

app.listen(port, "localhost", function onStart(err) {
  if (err) console.log(err);
  console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});

