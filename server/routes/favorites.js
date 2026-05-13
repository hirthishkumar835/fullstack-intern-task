const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Template = require('../models/Template');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate('template')
      .sort({ createdAt: -1 });

    const favoritedTemplates = favorites.map((fav) => ({
      favoriteId: fav._id,
      ...fav.template._doc,
    }));

    res.status(200).json({
      success: true,
      count: favoritedTemplates.length,
      data: favoritedTemplates,
    });
  } catch (err) {
    console.error('Get favorites error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error fetching favorites.',
    });
  }
});

router.post('/:templateId', async (req, res) => {
  try {
    const { templateId } = req.params;

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found.',
      });
    }

    const existingFavorite = await Favorite.findOne({
      user: req.user._id,
      template: templateId,
    });

    if (existingFavorite) {
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({
        success: true,
        favorited: false,
        message: 'Removed from favorites.',
      });
    }

    await Favorite.create({
      user: req.user._id,
      template: templateId,
    });

    res.status(201).json({
      success: true,
      favorited: true,
      message: 'Added to favorites!',
    });
  } catch (err) {
    console.error('Toggle favorite error:', err);
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
