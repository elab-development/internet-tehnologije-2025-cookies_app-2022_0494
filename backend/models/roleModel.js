const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["ADMIN", "GUEST", "USER"]
  },
}, {
  timestamps: true
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
