import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const STEPS = [
  { num: '1', label: 'Occasion & Dates' },
  { num: '2', label: 'Size & Fit' },
  { num: '3', label: 'Delivery & Care' },
  { num: '4', label: 'Review & Deposit' },
  { num: '5', label: 'Confirmation' },
]

export default function BookingCheckoutPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(4)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [upiId, setUpiId] = useState('')
  const [address, setAddress] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const outfit = {
    title: 'Emerald Festive Silk Set (Size M)',
    desc: 'Archival hand-embroidered chanderi kurta with flared brocade trousers',
    id: id || '1',
    rentalDays: 3,
    rentalPrice: 699,
    deposit: 1800,
    delivery: 0,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBza4R7PX_MJeHd2pC5atxfLB8KqZITdI_od1IewiE_QUgth-HsH3crdlU2DfbHKaaXzI5POCzAx7hfxs6l-xv6aH3_uVdQVbp6UF2BaRgxGWCCvv0DR9-vh1fECofleBlidv5AZoLFT0KNunk18N3ExhPUoGcFq0_46BY0G7wvjFS5T-GpWkQmqm5Wlgc-SFglXh-123Jz7Spe-4l24fZ679EnMRZf6OeJkDsI-Vyc8uOJEH9eo_Rs',
    eventDate: 'Nov 02, 2025',
    returnDate: 'Nov 05, 2025',
    lender: 'Ananya S.',
  }

  const rentalTotal = outfit.rentalPrice * outfit.rentalDays
  const grandTotal = rentalTotal + outfit.deposit

  const handleConfirm = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className="pt-20 bg-surface min-h-screen flex items-center justify-center px-margin-mobile">
        <div className="max-w-lg w-full bg-surface-container-lowest rounded-2xl p-10 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#eaf3ed] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[40px] text-[#2c583b]">check_circle</span>
          </div>
          <div>
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Booking Confirmed</span>
            <h2 className="font-headline-md text-headline-md text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>Your look is reserved!</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            <strong>{outfit.title}</strong> has been reserved for <strong>{outfit.eventDate}</strong>. Your outfit will arrive 24–48 hours before the event, freshly cleaned and sealed.
          </p>
          <div className="bg-surface-container-low rounded-xl p-4 text-left space-y-2">
            <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
              <span>Booking ID</span>
              <span className="font-semibold text-on-surface">#RD-{Math.floor(Math.random()*90000+10000)}</span>
            </div>
            <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
              <span>Event Date</span>
              <span className="font-semibold text-on-surface">{outfit.eventDate}</span>
            </div>
            <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
              <span>Return By</span>
              <span className="font-semibold text-on-surface">{outfit.returnDate}</span>
            </div>
            <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
              <span>Amount Paid</span>
              <span className="font-semibold text-primary">₹{grandTotal}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/my-wardrobe" className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all text-center">
              My Bookings
            </Link>
            <Link to="/explore" className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container-high transition-all text-center">
              Explore More
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 bg-surface min-h-screen">
      {/* Progress Header */}
      <section className="w-full bg-surface-container-low py-space-lg shadow-sm">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Checkout Concierge</span>
              <h1 className="font-headline-md text-headline-md text-on-surface mt-0.5" style={{fontFamily:'Playfair Display,serif'}}>Occasion Reservation</h1>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-tertiary-container text-[18px]">verified_user</span>
              <span>Encrypted 256-bit Couture Escrow Protection</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-space-lg">
            <div className="relative flex items-center justify-between max-w-4xl">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-surface-container-highest -z-0"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary-container transition-all duration-500 -z-0" style={{ width: `${((currentStep - 1) / 4) * 100}%` }}></div>
              {STEPS.map((step, i) => {
                const num = i + 1
                const done = num < currentStep
                const active = num === currentStep
                return (
                  <div key={step.num} className="relative z-10 flex flex-col items-center">
                    <div className={`flex items-center justify-center font-label-sm text-label-sm shadow-sm transition-all ${
                      active
                        ? 'w-9 h-9 rounded-full bg-primary-container text-on-primary ring-4 ring-primary-fixed'
                        : done
                        ? 'w-8 h-8 rounded-full bg-primary text-on-primary'
                        : 'w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant opacity-60'
                    }`}>
                      {done ? <span className="material-symbols-outlined text-[16px]">check</span> : <span>{step.num}</span>}
                    </div>
                    <span className={`font-label-md text-label-md mt-2 hidden sm:inline ${active ? 'text-primary font-bold' : done ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>
                      {step.num}. {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1440px] mx-auto w-full px-margin-mobile md:px-margin py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left: Form */}
          <div className="lg:col-span-7 space-y-space-lg">
            {/* Outfit Summary */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Active Selection</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface" style={{fontFamily:'Playfair Display,serif'}}>{outfit.title}</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{outfit.desc}</p>
                </div>
                <span className="px-3 py-1 bg-surface-container text-on-surface font-label-sm text-label-sm rounded-full">ID: #ED-9042</span>
              </div>
              <div className="flex flex-wrap gap-space-md text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
                  Event: {outfit.eventDate}
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">undo</span>
                  Return: {outfit.returnDate}
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                  Lender: {outfit.lender}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
              <h3 className="font-headline-sm text-headline-sm text-on-surface" style={{fontFamily:'Playfair Display,serif'}}>Delivery Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Full Name</label>
                  <input type="text" defaultValue={user?.name || ''} className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your name" />
                </div>
                <div>
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Phone Number</label>
                  <input type="tel" className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div>
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Delivery Address</label>
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Flat/House No., Street, Area, City, PIN Code"
                />
              </div>
              <div className="flex items-center gap-2 p-3 bg-surface-container rounded-lg">
                <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Express white-glove delivery included. Arrives Oct 31, 2025 (2 days before event).</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
              <h3 className="font-headline-sm text-headline-sm text-on-surface" style={{fontFamily:'Playfair Display,serif'}}>Payment Method</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                {['upi', 'card', 'netbanking'].map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === method ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/40'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-[20px] text-primary">
                        {method === 'upi' ? 'smartphone' : method === 'card' ? 'credit_card' : 'account_balance'}
                      </span>
                      <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                        {method === 'upi' ? 'UPI' : method === 'card' ? 'Card' : 'Net Banking'}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {method === 'upi' ? 'Instant. Zero fees.' : method === 'card' ? 'Visa, Mastercard, Amex' : 'All major banks'}
                    </p>
                  </button>
                ))}
              </div>
              {paymentMethod === 'upi' && (
                <div>
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="yourname@upi"
                  />
                </div>
              )}
              {paymentMethod === 'card' && (
                <div className="space-y-space-sm">
                  <div>
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Card Number</label>
                    <input type="text" className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-space-sm">
                    <div>
                      <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Expiry</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">CVV</label>
                      <input type="password" maxLength={4} className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="***" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 space-y-space-md sticky top-24">
            {/* Outfit Image + Summary */}
            <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src={outfit.img} alt={outfit.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="font-headline-sm text-headline-sm text-surface-container-lowest" style={{fontFamily:'Playfair Display,serif'}}>Order Summary</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>₹{outfit.rentalPrice}/day × {outfit.rentalDays} days</span>
                  <span>₹{rentalTotal}</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">local_laundry_service</span> Dry cleaning & delivery</span>
                  <span className="text-emerald-700 font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">shield</span> Refundable deposit</span>
                  <span>₹{outfit.deposit}</span>
                </div>
                <div className="border-t border-outline-variant/30 pt-3 flex justify-between font-title-lg text-title-lg text-on-surface font-bold">
                  <span>Total Payable</span>
                  <span className="text-primary">₹{grandTotal}</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Deposit of ₹{outfit.deposit} refunded within 48hrs of return.</p>
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-5 space-y-3">
              {[
                { icon: 'verified_user', text: '100% Authenticity Guarantee' },
                { icon: 'local_laundry_service', text: 'Hospital-Grade Eco Cleaning' },
                { icon: 'undo', text: 'Free cancellation up to 48hrs before event' },
                { icon: 'local_shipping', text: 'Free prepaid return courier bag included' },
              ].map(g => (
                <div key={g.text} className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-primary text-[18px]">{g.icon}</span>
                  {g.text}
                </div>
              ))}
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">autorenew</span>
                  Processing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  Confirm & Pay ₹{grandTotal}
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
