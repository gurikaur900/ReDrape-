const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Outfit = require('../models/Outfit')
const { protect } = require('../middleware/auth')

// Configure multer for image uploads
const uploadDir = path.join(__dirname, '../uploads/outfits')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, 'outfit-' + unique + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true)
  else cb(new Error('Only image files are allowed'), false)
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })

// @route GET /api/outfits
// @desc  Get all active outfits with filters
// @access Public
router.get('/', async (req, res) => {
  try {
    const { occasion, size, minPrice, maxPrice, sort, search, limit = 20, page = 1 } = req.query

    const filter = { status: 'active', isAvailable: true }

    if (occasion && occasion !== 'All') {
      filter.occasions = { $regex: occasion, $options: 'i' }
    }
    if (size && size !== 'All Sizes') {
      filter.size = size
    }
    if (minPrice || maxPrice) {
      filter.rentalPrice = {}
      if (minPrice) filter.rentalPrice.$gte = Number(minPrice)
      if (maxPrice) filter.rentalPrice.$lte = Number(maxPrice)
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { occasions: { $regex: search, $options: 'i' } },
      ]
    }

    let sortOption = { createdAt: -1 }
    if (sort === 'Price: Low to High') sortOption = { rentalPrice: 1 }
    else if (sort === 'Price: High to Low') sortOption = { rentalPrice: -1 }
    else if (sort === 'Rating') sortOption = { rating: -1 }

    const skip = (Number(page) - 1) * Number(limit)
    const total = await Outfit.countDocuments(filter)
    const outfits = await Outfit.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate('lender', 'name rating isVerified')

    res.json({
      outfits,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching outfits' })
  }
})

// @route GET /api/outfits/:id
// @desc  Get single outfit by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id).populate('lender', 'name rating totalRentals isVerified createdAt')
    if (!outfit) return res.status(404).json({ message: 'Outfit not found' })
    res.json(outfit)
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Outfit not found' })
    res.status(500).json({ message: 'Server error' })
  }
})

// @route POST /api/outfits
// @desc  Create a new outfit listing
// @access Private
router.post('/', protect, upload.array('images', 6), async (req, res) => {
  try {
    const {
      title, brand, description, occasions, size, condition,
      rentalPrice, buyPrice, deposit, pickupAddress,
    } = req.body

    if (!title || !brand || !description || !size || !condition || !rentalPrice) {
      return res.status(400).json({ message: 'Please fill all required fields' })
    }

    const images = req.files ? req.files.map(f => `/uploads/outfits/${f.filename}`) : []

    const outfit = await Outfit.create({
      title,
      brand,
      description,
      occasions: Array.isArray(occasions) ? occasions : occasions ? [occasions] : [],
      size,
      condition,
      rentalPrice: Number(rentalPrice),
      buyPrice: buyPrice ? Number(buyPrice) : 0,
      deposit: deposit ? Number(deposit) : Math.round(Number(rentalPrice) * 3),
      images,
      lender: req.user._id,
      pickupAddress: pickupAddress || '',
      status: 'pending',
    })

    // Update user listing count
    const User = require('../models/User')
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalListings: 1 }, role: 'lender' })

    res.status(201).json(outfit)
  } catch (err) {
    console.error('Create outfit error:', err)
    res.status(500).json({ message: 'Server error creating outfit' })
  }
})

// @route PUT /api/outfits/:id
// @desc  Update an outfit listing
// @access Private (lender who owns it or admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id)
    if (!outfit) return res.status(404).json({ message: 'Outfit not found' })

    if (outfit.lender.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this listing' })
    }

    const updatable = ['title', 'brand', 'description', 'occasions', 'size', 'condition', 'rentalPrice', 'buyPrice', 'deposit', 'pickupAddress', 'isAvailable']
    updatable.forEach((field) => {
      if (req.body[field] !== undefined) outfit[field] = req.body[field]
    })

    const updated = await outfit.save()
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route DELETE /api/outfits/:id
// @desc  Delete/remove an outfit listing
// @access Private (lender who owns it or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id)
    if (!outfit) return res.status(404).json({ message: 'Outfit not found' })

    if (outfit.lender.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await outfit.deleteOne()
    res.json({ message: 'Outfit listing removed' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
