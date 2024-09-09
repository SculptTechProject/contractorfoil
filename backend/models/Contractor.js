const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    nip: { type: String, required: true },
    address: { type: String, required: true },
    contactDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contractor", contractorSchema);