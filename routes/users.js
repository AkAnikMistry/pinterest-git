const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  posts: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }],
  dp: {
    type: String
    // You can store the path to the display picture or use another appropriate data type
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String
    // You can split this into first name and last name if needed
  }

});


userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
