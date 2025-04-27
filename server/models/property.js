const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    default: "Property"
  },
  address: { 
    type: String, 
    required: true,
  },
  cost: { 
    type: Number, 
    required: true,
  },
  amenities: {
    type: [String],
    default: []
  },
  fullyFurnished: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);