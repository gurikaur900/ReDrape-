const express = require('express')
const router = express.Router()
const Outfit = require('../models/Outfit')
const Booking = require('../models/Booking')
const { protect } = require('../middleware/auth')

// @route GET /api/wardrobe
// @desc  Get all listings by the current lender
// @access Private
router.get('/', protect, async (req, res) => {
  try {
    const listings = await Outfit.find({ lender: req.user._id })
      .sort({ createdAt: -1 })
    res.json(listings)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route GET /api/wardrobe/stats
// @desc  Get lender's wardrobe stats and earnings
// @access Private
router.get('/stats', protect, async (req, res) => {
  try {
    const listings = await Outfit.find({ lender: req.user._id })
    const bookings = await Booking.find({ lender: req.user._id, status: { $ne: 'cancelled' } })

    const totalListings = listings.length
    const activeListings = listings.filter(l => l.status === 'active').length
    const totalRentals = bookings.length
    const totalEarnings = bookings.reduce((sum, b) => sum + (b.rentalTotal || 0), 0)
    const netEarnings = Math.round(totalEarnings * 0.8) // after 20% platform fee

    // Monthly earnings for chart
    const monthlyMap = {}
    bookings.forEach((b) => {
      const month = new Date(b.createdAt).toLocaleString('default', { month: 'short' })
      monthlyMap[month] = (monthlyMap[month] || 0) + b.rentalTotal
    })

    const monthlyEarnings = Object.entries(monthlyMap).map(([month, amount]) => ({ month, amount }))

    // Active rentals
    const activeBookings = await Booking.find({
      lender: req.user._id,
      status: { $in: ['confirmed', 'in-transit', 'delivered'] },
    })
      .populate('outfit', 'title')
      .populate('renter', 'name')

    res.json({
      totalListings,
      activeListings,
      totalRentals,
      totalEarnings,
      netEarnings,
      monthlyEarnings,
      activeBookings,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
