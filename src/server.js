const path = require("path");
const app = require("express")();
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const proxy = require("http-proxy").createProxyServer();
const config = require("../webpack.config.js");
const isDeveloping = process.env.NODE_ENV !== "production";
const port = isDeveloping ? 3001 : process.env.PORT;

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
      modules      : false,
    },
  });
  const proxyTo = (origin) => (req, res) => {
    delete req.headers.host;
    return proxy.web(req, res, { target : "http://" + origin });
  };

  // Middleware
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Routes
  app.get("/auth/*", proxyTo("localhost:3002"));
  app.get("/api/*", proxyTo("localhost:3003"));
  app.post("/api/*", proxyTo("localhost:3003"));
  app.put("/api/*", proxyTo("localhost:3003"));
  app.delete("/api/*", proxyTo("localhost:3003"));
  app.get("*", (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, "../dist/index.html")));
    res.end();
  });

  // Events
  app.listen(port, "localhost", (err) => {
    if (err) console.log(err);
    console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  });

  proxy.on("error", (err, req, res) => {
    res.sendStatus(500);
  });
}
