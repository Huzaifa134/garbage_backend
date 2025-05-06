const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  organizationName: {
    type: String,
    default: "",
    required: false,
  },
  contactPerson: {
    type: String,
    default: "",
    required: false,
  },
  Location: {
    type: String,
    required: false,
  },
  registrationID: {
    type: String,
    required: false,
  },
  areasServed: {
    type: String,
    required: false,
  },
  typesofWasteManaged: {
    type: String,
    required: false,
  },
  attachments: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("UserDetails", userDetailsSchema);
