const express = require("express");
const Router = express.Router();
const ProductController = require("../controllers/ProductController");

Router.route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader(
      "Content-Type",
      "application/json",
      "Access-Control-Request-Headers",
      "authorization"
    );
    next();
  })
  .get((req, res, next) => {
    ProductController.showProducts(req, res);
  })
  .post((req, res, next) => {
    ProductController.inserProduct(req, res);
  });

Router.route(`/:user_id`)
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .get((req, res, next) => {
    ProductController.showSingleUserProducts(req, res);
  });

module.exports = Router;
