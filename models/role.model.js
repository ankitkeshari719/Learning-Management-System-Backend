const mongoose = require("mongoose");

//. create a schema for Role collection
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

//4. create a model for Role collection
const Role = mongoose.model("Role", roleSchema, "Roles");

module.exports = Role;