const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const Outfit = require('../models/Outfit')
const { protect } = require('../middleware/auth')

// @route POST /api/bookings
// @desc  Create a new booking
// @access Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      outfitId,
      eventDate,
      returnDate,
      rentalDays,
      deliveryAddress,
      deliveryPhone,
      deliveryName,
      paymentMethod,
    } = req.body

    if (!outfitId || !eventDate || !returnDate || !rentalDays || !deliveryAddress) {
      return res.status(400).json({ message: 'Please provide all required booking details' })
    }

    const outfit = await Outfit.findById(outfitId)
    if (!outfit) return res.status(404).json({ message: 'Outfit not found' })
    if (!outfit.isAvailable) return res.status(400).json({ message: 'Outfit is not available for this period' })
    if (outfit.lender.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot rent your own outfit' })
    }

    const rentalTotal = outfit.rentalPrice * Number(rentalDays)
    const deposit = outfit.deposit || Math.round(outfit.rentalPrice * 3)
    const grandTotal = rentalTotal + deposit

    const booking = await Booking.create({
      outfit: outfitId,
      renter: req.user._id,
      lender: outfit.lender,
      eventDate: new Date(eventDate),
      returnDate: new Date(returnDate),
      rentalDays: Number(rentalDays),
      rentalTotal,
      deposit,
      grandTotal,
      deliveryAddress,
      deliveryPhone: deliveryPhone || '',
      deliveryName: deliveryName || req.user.name,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: 'paid', // Simulated payment
      status: 'confirmed',
    })

    // Block dates on outfit
    await Outfit.findByIdAndUpdate(outfitId, {
      $push: { bookedDates: { from: new Date(eventDate), to: new Date(returnDate) } },
    })

    // Update renter's rental count
    const User = require('../models/User')
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalRentals: 1 } })

    const populated = await Booking.findById(booking._id)
      .populate('outfit', 'title brand images rentalPrice')
      .populate('lender', 'name')

    res.status(201).json(populated)
  } catch (err) {
    console.error('Create booking error:', err)
    res.status(500).json({ message: 'Server error creating booking' })
  }
})

// @route GET /api/bookings/my
// @desc  Get current user's bookings (as renter)
// @access Private
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ renter: req.user._id })
      .sort({ createdAt: -1 })
      .populate('outfit', 'title brand images rentalPrice occasions')
      .populate('lender', 'name rating')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route GET /api/bookings/lending
// @desc  Get bookings for outfits the user is lending
// @access Private
router.get('/lending', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ lender: req.user._id })
      .sort({ createdAt: -1 })
      .populate('outfit', 'title brand images')
      .populate('renter', 'name email phone')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route GET /api/bookings/:id
// @desc  Get booking by ID
// @access Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('outfit', 'title brand images rentalPrice condition')
      .populate('renter', 'name email phone')
      .populate('lender', 'name email phone')

    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    if (
      booking.renter._id.toString() !== req.user._id.toString() &&
      booking.lender._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to view this booking' })
    }

    res.json(booking)
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Booking not found' })
    res.status(500).json({ message: 'Server error' })
  }
})

// @route PUT /api/bookings/:id/cancel
// @desc  Cancel a booking
// @access Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    if (booking.renter.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }

    if (['returned', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ message: 'Booking cannot be cancelled in its current state' })
    }

    booking.status = 'cancelled'
    booking.cancelledAt = new Date()
    booking.cancelReason = req.body.reason || 'Cancelled by renter'
    await booking.save()

    res.json({ message: 'Booking cancelled successfully', booking })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route PUT /api/bookings/:id/status
// @desc  Update booking status (lender/admin)
// @access Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body
    const booking = await Booking.findById(req.params.id)
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    if (booking.lender.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const validStatuses = ['confirmed', 'in-transit', 'delivered', 'returned']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    booking.status = status
    await booking.save()
    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
