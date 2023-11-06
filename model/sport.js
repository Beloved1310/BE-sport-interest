const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    name: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product',SportSchema);