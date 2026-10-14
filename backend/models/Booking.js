const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    outfit: { type: mongoose.Schema.Types.ObjectId, ref: 'Outfit', required: true },
    renter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Dates
    eventDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    rentalDays: { type: Number, required: true },
    // Pricing
    rentalTotal: { type: Number, required: true },
    deposit: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    // Delivery
    deliveryAddress: { type: String, required: true },
    deliveryPhone: { type: String, default: '' },
    deliveryName: { type: String, default: '' },
    // Payment
    paymentMethod: { type: String, enum: ['upi', 'card', 'netbanking'], default: 'upi' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded', 'failed'], default: 'pending' },
    // Status
    status: {
      type: String,
      enum: ['confirmed', 'in-transit', 'delivered', 'returned', 'cancelled'],
      default: 'confirmed',
    },
    // Cancellation
    cancelledAt: { type: Date },
    cancelReason: { type: String },
    // Deposit refund
    depositRefunded: { type: Boolean, default: false },
  },
  { timestamps: true }
)

bookingSchema.index({ renter: 1 })
bookingSchema.index({ lender: 1 })
bookingSchema.index({ outfit: 1 })
bookingSchema.index({ status: 1 })

module.exports = mongoose.model('Booking', bookingSchema)
