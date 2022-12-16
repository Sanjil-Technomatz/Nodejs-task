const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this._id === user._id) {
            return true;
          }
          return false;
        }
        return true;
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

userModel.methods.comparePassword = function (password1, password2) {
  if (password1 !== password2) {
    return true;
  } else {
    return false;
  }
};

const model = mongoose.model("UserData", userModel);

module.exports = model;
