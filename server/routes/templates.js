const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const templates = await Template.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: templates.length,
      data: templates,
    });
  } catch (err) {
    console.error('Get templates error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error fetching templates.',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (err) {
    console.error('Get template error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid template ID.',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error.',
    });
  }
});

module.exports = router;
