const mongodb = require("../configs/dbConfig");
const userModel = require("../modals/User");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const UserController = {
  insertUser: async (req, res) => {
    const newId = uuidv4();
    let userObj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      id: newId,
    };
    userModel
      .create(userObj)
      .then(() => {
        return res.json(userObj);
      })
      .catch((e) => {
        return res.status(400).json({
          message: e.message,
        });
      });
  },
  showUser: async (req, res) => {
    const data = await userModel.find(
      { isAdmin: false },
      { __v: 0, _id: 0, password: 0 }
    );
    return res.json({
      users: data,
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    userModel.findOne(
      {
        email: email,
      },
      function (err, user) {
        if (err) throw err;
        if (!user || user.comparePassword(password, user.password)) {
          return res.status(401).json({
            message: "Authentication failed. Invalid user or password.",
          });
        }
        return res.json({
          token: jwt.sign(
            {
              email: user.email,
              name: user.name,
              id: user.id,
              isAdmin: user.isAdmin,
            },
            "RESTFULAPIs"
          ),
        });
      }
    );
  },
  getUserByEmail: async (req, res) => {
    const data = await userModel.find(
      { email: req.params.email },
      { __v: 0, _id: 0, password: 0 }
    );
    if (data[0]) return res.json(data[0]);
    else
      return res.status(404).json({
        message: "Email not found.",
      });
  },
};
module.exports = UserController;
