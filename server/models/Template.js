const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Template name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    thumbnail_url: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Landing Page',
        'Dashboard',
        'E-Commerce',
        'Portfolio',
        'Blog',
        'SaaS'
      ],
      default: 'Landing Page',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Template', templateSchema);
