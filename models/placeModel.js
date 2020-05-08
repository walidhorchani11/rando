const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [40, 'A place title must have at least 40 characters'],
  },

  nbrViews: {
    type: Number,
    default: 0,
    required: false,
  },

  description: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },

  nbrLikes: {
    type: Number,
    default: 0,
    // select: false
  },

  share: {
    type: Boolean,
    default: true,
  },

  images: {
    type: [String],
    required: false,
  },

  cost: {
    type: Number,
    required: false,
  },

  location: {
    type: String,
    required: false,
  },

  adress: {
    type: String,
    required: false,
  },
  // user proprietaire
});

module.exports = mongoose.model('Place', placeSchema);
