const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Outfit = require('../models/Outfit')
const Booking = require('../models/Booking')
const { protect, adminOnly } = require('../middleware/auth')

// All admin routes require authentication + admin role
router.use(protect)
router.use(adminOnly)

// @route GET /api/admin/stats
// @desc  Get platform-wide stats
// @access Admin
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalOutfits, totalBookings, revenueData] = await Promise.all([
      User.countDocuments(),
      Outfit.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([
        { $match: { status: { $ne: 'cancelled' }, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$grandTotal' }, rentalTotal: { $sum: '$rentalTotal' } } },
      ]),
    ])

    const revenue = revenueData[0] || { total: 0, rentalTotal: 0 }
    const pendingOutfits = await Outfit.countDocuments({ status: 'pending' })
    const activeListings = await Outfit.countDocuments({ status: 'active' })
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(1)) },
    })

    res.json({
      totalUsers,
      totalOutfits,
      activeListings,
      pendingOutfits,
      totalBookings,
      totalRevenue: revenue.total,
      platformFee: Math.round(revenue.rentalTotal * 0.2),
      newUsersThisMonth,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route GET /api/admin/users
// @desc  Get all users
// @access Admin
router.get('/users', async (req, res) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query
    const filter = {}
    if (role) filter.role = role
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }
    const skip = (Number(page) - 1) * Number(limit)
    const total = await User.countDocuments(filter)
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
    res.json({ users, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route PUT /api/admin/users/:id
// @desc  Update user (role, suspend, verify)
// @access Admin
router.put('/users/:id', async (req, res) => {
  try {
    const { role, isSuspended, isVerified } = req.body
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    if (role) user.role = role
    if (isSuspended !== undefined) user.isSuspended = isSuspended
    if (isVerified !== undefined) user.isVerified = isVerified

    await user.save()
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route GET /api/admin/outfits
// @desc  Get all outfits (including pending)
// @access Admin
router.get('/outfits', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = {}
    if (status) filter.status = status
    const skip = (Number(page) - 1) * Number(limit)
    const total = await Outfit.countDocuments(filter)
    const outfits = await Outfit.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('lender', 'name email')
    res.json({ outfits, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route PUT /api/admin/outfits/:id/approve
// @desc  Approve or reject a pending outfit listing
// @access Admin
router.put('/outfits/:id/approve', async (req, res) => {
  try {
    const { action } = req.body // 'approve' | 'reject'
    const outfit = await Outfit.findById(req.params.id)
    if (!outfit) return res.status(404).json({ message: 'Outfit not found' })

    outfit.status = action === 'approve' ? 'active' : 'removed'
    outfit.isVerified = action === 'approve'
    await outfit.save()
    res.json(outfit)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route DELETE /api/admin/outfits/:id
// @desc  Delete an outfit listing
// @access Admin
router.delete('/outfits/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findByIdAndDelete(req.params.id)
    if (!outfit) return res.status(404).json({ message: 'Outfit not found' })
    res.json({ message: 'Outfit removed' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route GET /api/admin/bookings
// @desc  Get all bookings
// @access Admin
router.get('/bookings', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = {}
    if (status) filter.status = status
    const skip = (Number(page) - 1) * Number(limit)
    const total = await Booking.countDocuments(filter)
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('outfit', 'title brand')
      .populate('renter', 'name email')
      .populate('lender', 'name email')
    res.json({ bookings, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
