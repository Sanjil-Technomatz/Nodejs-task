const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");

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
    UserController.showUser(req, res);
  })
  .post((req, res, next) => {
    UserController.insertUser(req, res);
  });

Router.route("/auth/login")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .post((req, res, next) => {
    UserController.login(req, res);
  });

Router.route(`/email=:email`)
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .get((req, res, next) => {
    UserController.getUserByEmail(req, res);
  });

module.exports = Router;
