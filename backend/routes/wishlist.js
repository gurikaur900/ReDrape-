const express = require('express')
const router = express.Router()
const Wishlist = require('../models/Wishlist')
const { protect } = require('../middleware/auth')

// @route GET /api/wishlist
// @desc  Get user's wishlist
// @access Private
router.get('/', protect, async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('outfit', 'title brand images rentalPrice buyPrice rating reviewCount occasions size condition isAvailable')
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route POST /api/wishlist
// @desc  Add outfit to wishlist
// @access Private
router.post('/', protect, async (req, res) => {
  try {
    const { outfitId } = req.body
    if (!outfitId) return res.status(400).json({ message: 'Outfit ID required' })

    const existing = await Wishlist.findOne({ user: req.user._id, outfit: outfitId })
    if (existing) return res.status(409).json({ message: 'Already in wishlist' })

    const item = await Wishlist.create({ user: req.user._id, outfit: outfitId })
    const populated = await Wishlist.findById(item._id).populate('outfit', 'title brand images rentalPrice')
    res.status(201).json(populated)
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Already in wishlist' })
    res.status(500).json({ message: 'Server error' })
  }
})

// @route DELETE /api/wishlist/:outfitId
// @desc  Remove outfit from wishlist
// @access Private
router.delete('/:outfitId', protect, async (req, res) => {
  try {
    const result = await Wishlist.findOneAndDelete({
      user: req.user._id,
      outfit: req.params.outfitId,
    })
    if (!result) return res.status(404).json({ message: 'Item not in wishlist' })
    res.json({ message: 'Removed from wishlist' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
