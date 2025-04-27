const express = require('express');
const router = express.Router();
const Property = require('../models/property');

// POST /api/property/list
router.post('/list', async (req, res) => {
  try {
    const { landlordId, address, cost, amenities, fullyFurnished, image } = req.body;

    if (!landlordId || !address || !cost || !fullyFurnished) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const newProperty = new Property({
      landlord: landlordId,
      address,
      cost,
      amenities,
      fullyFurnished,
      image
    });

    await newProperty.save();
    res.status(201).json({ message: 'Property listed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/property
// Retrieve all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/property/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Property.findByIdAndDelete(id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete property" });
  }
});

module.exports = router;