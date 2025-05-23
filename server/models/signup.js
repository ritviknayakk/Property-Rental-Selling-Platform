const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  aadharID: { type: String, required: true },
  panNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['tenant', 'landlord'], required: true }
});

module.exports = mongoose.model('User', userSchema);
