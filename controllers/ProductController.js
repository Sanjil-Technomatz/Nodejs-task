const mongodb = require("../configs/dbConfig");
const productModel = require("../modals/Product");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const ProductController = {
  showProducts: async (req, res) => {
    const data = await productModel.find({}, { __v: 0, _id: 0 });
    return res.json({
      products: data,
    });
  },
  inserProduct: async (req, res) => {
    const newId = uuidv4();
    let userObj = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      user_id: req.body.user_id,
      id: newId,
    };
    productModel
      .create(userObj)
      .then(() => {
        return res.json(userObj);
      })
      .catch((e) => {
        return res.json({
          message: e.message,
        });
      });
  },
  showSingleUserProducts: async (req, res) => {
    const data = await productModel.find(
      { user_id: req.params.user_id },
      { __v: 0, _id: 0, user_id: 0 }
    );
    if (data[0]) return res.json({ products: data });
    else
      return res.status(404).json({
        message: "No products found for this user.",
      });
  },
};
module.exports = ProductController;
