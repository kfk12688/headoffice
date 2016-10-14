const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../webpack.config.js");

const isDeveloping = process.env.NODE_ENV !== "production";
const port = isDeveloping ? 3001 : process.env.PORT;
const app = express();

const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();
const proxyTo = (origin) => (req, res) => {
  delete req.headers.host;
  return proxy.web(req, res, { target : "http://" + origin });
};

proxy.on("error", (err, req, res) => {
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

  app.get("/auth/*", proxyTo("localhost:3002"));

  app.get("/api/*", proxyTo("localhost:3003"));
  app.post("/api/*", proxyTo("localhost:3003"));
  app.put("/api/*", proxyTo("localhost:3003"));
  app.delete("/api/*", proxyTo("localhost:3003"));
  app.get("*", (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, "../dist/index.html")));
    res.end();
  });
}

app.listen(port, "localhost", (err) => {
  if (err) console.log(err);
  console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});
