const mongoose = require('mongoose');
const slugify = require('slugify');

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
}, {
  toJSON: {virtuals: true}
});

// placeSchema.set('toJSON', { getters: true, virtuals: true });

placeSchema.virtual('slug').get(function(){
  return slugify(this.title);
});

module.exports = mongoose.model('Place', placeSchema);
