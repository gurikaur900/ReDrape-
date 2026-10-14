const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    outfit: { type: mongoose.Schema.Types.ObjectId, ref: 'Outfit', required: true },
  },
  { timestamps: true }
)

wishlistSchema.index({ user: 1, outfit: 1 }, { unique: true })

module.exports = mongoose.model('Wishlist', wishlistSchema)
