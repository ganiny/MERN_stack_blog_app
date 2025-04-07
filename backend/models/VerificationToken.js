const mongoose = require("mongoose");

// Verification Token Schema
const verificationTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Verification Token Model
const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema);



module.exports = VerificationToken;
