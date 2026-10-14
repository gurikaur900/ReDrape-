import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const STEP_FIELDS = [
  { label: 'Outfit Photos', sublabel: 'Upload front, back, and detail shots', icon: 'photo_camera', required: true },
  { label: 'Designer & Brand', sublabel: 'e.g. Sabyasachi, Manish Malhotra, Raw Mango', icon: 'star', required: true },
  { label: 'Occasion Tags', sublabel: 'Wedding, Festive, Cocktail, etc.', icon: 'local_offer', required: true },
  { label: 'Pricing & Calendar', sublabel: 'Set daily rental fee and availability dates', icon: 'currency_rupee', required: true },
]

export default function ListOutfitPage() {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '',
    brand: '',
    size: '',
    condition: '',
    occasions: [],
    rentalPrice: '',
    buyPrice: '',
    description: '',
    pickupAddress: '',
    images: [],
  })

  const occasions = ['Wedding', 'Sangeet', 'Farewell', 'Interview', 'Party', 'Festive', 'Black Tie', 'Cocktail', 'Photoshoot', 'Engagement']
  const conditions = ['Pristine (unworn)', 'Like New (worn once)', 'Excellent (2-3 wears)', 'Good (well-maintained)']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', 'Custom']

  const toggleOccasion = (occ) => {
    setForm(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occ)
        ? prev.occasions.filter(o => o !== occ)
        : [...prev.occasions, occ],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-20 bg-surface min-h-screen flex items-center justify-center px-margin-mobile">
        <div className="max-w-lg w-full bg-surface-container-lowest rounded-2xl p-10 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[40px] text-primary">inventory</span>
          </div>
          <div>
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Listing Received</span>
            <h2 className="font-headline-md text-headline-md text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>Your outfit is under review!</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Our atelier team will review and authenticate <strong>{form.title || 'your outfit'}</strong> within 24–48 hours. Once approved, it'll go live in the ReDrape archive.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/my-wardrobe" className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all text-center">
              My Wardrobe
            </Link>
            <button onClick={() => { setSubmitted(false); setStep(1); setForm({ title:'',brand:'',size:'',condition:'',occasions:[],rentalPrice:'',buyPrice:'',description:'',pickupAddress:'',images:[] }) }} className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container-high transition-all">
              List Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 bg-surface min-h-screen">
      {/* Hero Banner */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div className="space-y-space-md">
              <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Wardrobe Monetization</span>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight" style={{fontFamily:'Playfair Display,serif'}}>List Your Outfit. Earn While It Rests.</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Your special-occasion designer pieces deserve more than a closet shelf. Earn up to ₹15,000/month while ReDrape handles all logistics, cleaning, and insurance.
              </p>
              <div className="flex flex-wrap gap-space-md">
                {[
                  { icon: 'currency_rupee', text: 'Instant bank payouts' },
                  { icon: 'shield', text: '₹10,000 damage cover' },
                  { icon: 'local_laundry_service', text: 'We handle dry cleaning' },
                  { icon: 'local_shipping', text: 'Free pickup & return' },
                ].map(b => (
                  <div key={b.text} className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-[18px]">{b.icon}</span>
                    {b.text}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container rounded-2xl p-6 space-y-4">
              <h3 className="font-headline-sm text-headline-sm text-primary" style={{fontFamily:'Playfair Display,serif'}}>Estimated Earnings</h3>
              <div className="space-y-3">
                {[
                  { label: 'Lehenga Set (₹1,499/day)', monthly: '₹12,000–18,000' },
                  { label: 'Designer Saree (₹899/day)', monthly: '₹8,000–12,000' },
                  { label: 'Tuxedo / Sherwani (₹999/day)', monthly: '₹9,000–14,000' },
                ].map(e => (
                  <div key={e.label} className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{e.label}</span>
                    <span className="font-title-sm text-title-sm text-primary font-bold">{e.monthly}/mo</span>
                  </div>
                ))}
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Based on 12–18 rental days/month average. Actual earnings may vary.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-xl">
        <div className="max-w-3xl mx-auto">
          {/* Step Indicators */}
          <div className="flex items-center gap-space-sm mb-space-xl overflow-x-auto pb-2">
            {STEP_FIELDS.map((s, i) => (
              <div key={i} className={`flex items-center gap-2 shrink-0 ${i < step - 1 ? 'opacity-100' : i === step - 1 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm ${i < step - 1 ? 'bg-primary text-on-primary' : i === step - 1 ? 'bg-primary-container text-on-primary ring-2 ring-primary-fixed' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  {i < step - 1 ? <span className="material-symbols-outlined text-[14px]">check</span> : <span>{i + 1}</span>}
                </div>
                <span className="font-label-md text-label-md text-on-surface hidden sm:block">{s.label}</span>
                {i < 3 && <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-space-lg">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm space-y-space-md">
                <h2 className="font-headline-sm text-headline-sm text-primary" style={{fontFamily:'Playfair Display,serif'}}>Tell us about your outfit</h2>
                <div>
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Outfit Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Rose Gold Lehenga Set, Wine Velvet Tuxedo" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Designer / Brand *</label>
                    <input type="text" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Sabyasachi, Raw Mango..." required />
                  </div>
                  <div>
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Size *</label>
                    <select value={form.size} onChange={e => setForm({...form, size: e.target.value})} className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" required>
                      <option value="">Select Size</option>
                      {sizes.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Condition *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                    {conditions.map(c => (
                      <button key={c} type="button" onClick={() => setForm({...form, condition: c})}
                        className={`p-3 rounded-lg border-2 text-left font-body-sm text-body-sm transition-all ${form.condition === c ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/40'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Fabric, embroidery details, styling notes..." />
                </div>
              </div>
            )}

            {/* Step 2: Occasions */}
            {step === 2 && (
              <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm space-y-space-md">
                <h2 className="font-headline-sm text-headline-sm text-primary" style={{fontFamily:'Playfair Display,serif'}}>Which occasions is it perfect for?</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Select all that apply — this helps renters find your outfit faster.</p>
                <div className="flex flex-wrap gap-space-sm">
                  {occasions.map(occ => (
                    <button key={occ} type="button" onClick={() => toggleOccasion(occ)}
                      className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all ${form.occasions.includes(occ) ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                      {occ}
                    </button>
                  ))}
                </div>
                {form.occasions.length > 0 && (
                  <p className="font-body-sm text-body-sm text-primary">✓ Selected: {form.occasions.join(', ')}</p>
                )}
              </div>
            )}

            {/* Step 3: Photos */}
            {step === 3 && (
              <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm space-y-space-md">
                <h2 className="font-headline-sm text-headline-sm text-primary" style={{fontFamily:'Playfair Display,serif'}}>Upload your outfit photos</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">High-quality photos attract 3× more renters. Include front, back, and fabric close-ups.</p>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-10 text-center hover:border-primary transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant">cloud_upload</span>
                  <p className="font-title-sm text-title-sm text-on-surface mt-2">Drop photos here or click to upload</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">JPG, PNG up to 10MB each. Min 4 photos recommended.</p>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={e => setForm({...form, images: [...e.target.files]})} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Front View', 'Back View', 'Fabric Detail', 'Full Length', 'Accessories', 'Styling Reference'].map(label => (
                    <div key={label} className="aspect-square rounded-lg bg-surface-container-low flex flex-col items-center justify-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Pricing */}
            {step === 4 && (
              <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm space-y-space-md">
                <h2 className="font-headline-sm text-headline-sm text-primary" style={{fontFamily:'Playfair Display,serif'}}>Set your pricing & availability</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Daily Rental Price (₹) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md">₹</span>
                      <input type="number" value={form.rentalPrice} onChange={e => setForm({...form, rentalPrice: e.target.value})} className="w-full pl-7 pr-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="699" required />
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Recommended: ₹{form.brand ? '599–1,999' : '599–1,999'}/day for this category</p>
                  </div>
                  <div>
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Buy Price (₹) (optional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md">₹</span>
                      <input type="number" value={form.buyPrice} onChange={e => setForm({...form, buyPrice: e.target.value})} className="w-full pl-7 pr-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="18000" />
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Enable "buy it now" option for interested renters</p>
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Pickup Address *</label>
                  <textarea value={form.pickupAddress} onChange={e => setForm({...form, pickupAddress: e.target.value})} rows={2} className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Where can our courier partner collect the outfit from?" required />
                </div>
                <div className="bg-surface-container rounded-xl p-4 space-y-2">
                  <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Estimated Monthly Earnings</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      ₹{form.rentalPrice ? (form.rentalPrice * 15).toLocaleString() : '0'}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">/ month (at ~15 rental days)</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">ReDrape takes a 20% platform fee. You keep 80% of each rental.</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => step > 1 && setStep(step - 1)}
                disabled={step === 1}
                className="flex items-center gap-2 px-6 py-3 bg-surface-container text-on-surface rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container-high transition-all disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-md"
                >
                  Continue
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Submit Listing
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
