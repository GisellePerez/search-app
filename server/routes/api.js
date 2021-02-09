var express = require("express");
const itemsController = require("../controllers/itemsController");
var router = express.Router();

const axios = require("axios");

const baseUrl = "https://api.mercadolibre.com";

router.get("/", function (req, res, next) {
  res.send("return from api.js");
});

router.get("/items", itemsController.fetchItems);

router.get("/items/:id", itemsController.fetchItemById);

module.exports = router;
