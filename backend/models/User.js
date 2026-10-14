const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'lender', 'admin'], default: 'user' },
    phone: { type: String, default: '' },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    // Fit Passport
    fitPassport: {
      bust: String,
      waist: String,
      hips: String,
      height: String,
      preferredSizes: [String],
      stylePersonality: [String],
    },
    // Stats
    totalRentals: { type: Number, default: 0 },
    totalListings: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Hash password before saving (Mongoose 9: no next() needed for async hooks)
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Don't send password in JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('User', userSchema)
