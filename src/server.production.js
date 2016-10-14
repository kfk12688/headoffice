const isDeveloping = process.env.NODE_ENV !== "production";
const port = isDeveloping ? 3001 : process.env.PORT;
const app = require("express")();
const path = require("path");
const express = require("express");
const logger = require("morgan");

if (!isDeveloping) {
  app.use(logger("dev"));
  app.use(express.static(path.join(__dirname, "public")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
}
