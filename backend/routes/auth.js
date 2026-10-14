const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { protect } = require('../middleware/auth')

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'redrape_jwt_secret_2025', {
    expiresIn: '30d',
  })

// @route POST /api/auth/register
// @desc  Register a new user
// @access Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ message: 'An account with this email already exists' })
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === 'lender' ? 'lender' : 'user',
    })

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error during registration' })
  }
})

// @route POST /api/auth/login
// @desc  Login user
// @access Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    if (user.isSuspended) {
      return res.status(403).json({ message: 'Account suspended. Contact support@redrape.in' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        avatar: user.avatar,
        phone: user.phone,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error during login' })
  }
})

// @route GET /api/auth/me
// @desc  Get current logged in user
// @access Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route PUT /api/auth/profile
// @desc  Update user profile
// @access Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, bio, address, city, fitPassport } = req.body

    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    if (name) user.name = name
    if (phone) user.phone = phone
    if (bio) user.bio = bio
    if (address) user.address = address
    if (city) user.city = city
    if (fitPassport) user.fitPassport = { ...user.fitPassport, ...fitPassport }

    await user.save()
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// @route PUT /api/auth/change-password
// @desc  Change password
// @access Private
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id)

    const isMatch = await user.matchPassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()
    res.json({ message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
