const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'redrape_jwt_secret_2025')
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' })
    }

    if (req.user.isSuspended) {
      return res.status(403).json({ message: 'Account suspended. Contact support.' })
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid or expired' })
  }
}

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next()
  }
  return res.status(403).json({ message: 'Access denied: Admin only' })
}

const lenderOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'lender' || req.user.role === 'admin')) {
    return next()
  }
  return res.status(403).json({ message: 'Access denied: Lender role required' })
}

module.exports = { protect, adminOnly, lenderOnly }
