const mongoose = require('mongoose')

const outfitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    occasions: [{ type: String }],
    size: { type: String, required: true },
    condition: { type: String, required: true },
    rentalPrice: { type: Number, required: true, min: 0 },
    buyPrice: { type: Number, default: 0 },
    deposit: { type: Number, default: 0 },
    images: [{ type: String }],
    lender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Availability
    availableDates: {
      from: { type: Date },
      to: { type: Date },
    },
    bookedDates: [{ from: Date, to: Date }],
    // Stats
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    totalRentals: { type: Number, default: 0 },
    // Verification / Status
    isAvailable: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'active', 'paused', 'removed'], default: 'pending' },
    // Cleaning
    lastCleanedAt: { type: Date, default: Date.now },
    cleaningCertificate: { type: String, default: '' },
    // Pickup
    pickupAddress: { type: String, default: '' },
  },
  { timestamps: true }
)

// Virtual populate reviews
outfitSchema.index({ occasions: 1 })
outfitSchema.index({ size: 1 })
outfitSchema.index({ rentalPrice: 1 })
outfitSchema.index({ lender: 1 })

module.exports = mongoose.model('Outfit', outfitSchema)
