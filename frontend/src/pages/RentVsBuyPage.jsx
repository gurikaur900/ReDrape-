import { useState } from 'react'

export default function RentVsBuyPage() {
  const [retailPrice, setRetailPrice] = useState(5000)
  const [rentalDays, setRentalDays] = useState(3)
  const [rentalPrice, setRentalPrice] = useState(699)
  const [cleaningCost, setCleaningCost] = useState(450)
  const [storageCost, setStorageCost] = useState(200)
  const [wearCount, setWearCount] = useState(1)

  const buyCost = Number(retailPrice) + Number(cleaningCost) * Number(wearCount) + Number(storageCost)
  const rentCost = Number(rentalPrice) * Number(rentalDays)
  const savings = buyCost - rentCost
  const savingsPercent = Math.round((savings / buyCost) * 100)
  const co2Saved = (Number(retailPrice) / 1000 * 3.2).toFixed(1)
  const waterSaved = (Number(retailPrice) / 100 * 140).toLocaleString()

  return (
    <div className="pt-20 bg-surface min-h-screen">
      {/* Hero */}
      <section className="w-full bg-surface-container-low py-space-2xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="text-center max-w-2xl mx-auto space-y-space-md">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Financial Intelligence</span>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight" style={{fontFamily:'Playfair Display,serif'}}>Rent vs Buy Calculator</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              85% of special-occasion outfits are worn exactly once. Discover how much you could save — and what it means for the planet.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-space-md">
            <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm space-y-space-lg">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Configure Your Comparison</span>
                <h2 className="font-headline-sm text-headline-sm text-primary mt-1" style={{fontFamily:'Playfair Display,serif'}}>Enter Outfit Details</h2>
              </div>

              <div className="space-y-space-md">
                {/* Retail Price */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Retail Purchase Price</label>
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">₹{Number(retailPrice).toLocaleString()}</span>
                  </div>
                  <input type="range" min="1000" max="50000" step="500" value={retailPrice} onChange={e => setRetailPrice(e.target.value)}
                    className="w-full accent-primary" />
                  <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mt-1">
                    <span>₹1,000</span><span>₹50,000</span>
                  </div>
                </div>

                {/* Dry Cleaning Cost */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Dry Cleaning Cost</label>
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">₹{cleaningCost}</span>
                  </div>
                  <input type="range" min="0" max="2000" step="50" value={cleaningCost} onChange={e => setCleaningCost(e.target.value)}
                    className="w-full accent-primary" />
                </div>

                {/* Times Worn */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Times You'd Wear It</label>
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">{wearCount}×</span>
                  </div>
                  <input type="range" min="1" max="10" step="1" value={wearCount} onChange={e => setWearCount(e.target.value)}
                    className="w-full accent-primary" />
                  <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mt-1">
                    <span>Once</span><span>10 times</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-outline-variant/30 pt-space-md">
                  <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">ReDrape Rental</span>
                </div>

                {/* Rental Price */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Rental Price Per Day</label>
                    <span className="font-title-sm text-title-sm text-primary font-bold">₹{rentalPrice}</span>
                  </div>
                  <input type="range" min="199" max="5000" step="100" value={rentalPrice} onChange={e => setRentalPrice(e.target.value)}
                    className="w-full accent-primary" />
                </div>

                {/* Rental Days */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Number of Rental Days</label>
                    <span className="font-title-sm text-title-sm text-primary font-bold">{rentalDays} days</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 7].map(d => (
                      <button key={d} onClick={() => setRentalDays(d)}
                        className={`flex-1 py-2 rounded-lg font-label-sm text-label-sm transition-all ${rentalDays === d ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-space-md">
            {/* Main Comparison */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-md space-y-space-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-on-surface" style={{fontFamily:'Playfair Display,serif'}}>Cost Comparison</h3>
                {savings > 0 && (
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider rounded-full font-semibold">
                    {savingsPercent}% Savings
                  </span>
                )}
              </div>

              {/* Bar Chart */}
              <div className="space-y-5">
                {/* Buy Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-on-surface-variant font-medium">Standard Retail Purchase</span>
                    <span className="font-title-lg text-title-lg text-on-surface font-bold">₹{buyCost.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-outline rounded-full w-full transition-all duration-700"></div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Includes ₹{Number(cleaningCost) * Number(wearCount)} cleaning + ₹{storageCost} storage p.a.
                  </p>
                </div>

                {/* Rent Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-primary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">eco</span>
                      ReDrape Circular Rental
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">₹{rentCost.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700"
                      style={{ width: `${Math.min((rentCost / buyCost) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="font-body-sm text-body-sm text-primary font-medium">
                    Includes doorstep delivery, eco-cleaning & insurance
                  </p>
                </div>
              </div>

              {/* Savings Box */}
              <div className="bg-surface-container-low rounded-xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                <div className="text-center space-y-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">You Save</span>
                  <div className={`font-headline-lg text-headline-lg font-bold ${savings > 0 ? 'text-emerald-800' : 'text-error'}`}>
                    ₹{Math.abs(savings).toLocaleString()}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{savings > 0 ? 'Direct pocket savings' : 'Rental costs more'}</p>
                </div>
                <div className="text-center space-y-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">CO₂ Saved</span>
                  <div className="font-headline-lg text-headline-lg font-bold text-primary">{co2Saved}kg</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Carbon footprint averted</p>
                </div>
                <div className="text-center space-y-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Water Saved</span>
                  <div className="font-headline-lg text-headline-lg font-bold text-primary">{waterSaved}L</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Litres of water preserved</p>
                </div>
              </div>
            </div>

            {/* Impact Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="bg-primary p-6 rounded-xl text-on-primary space-y-3">
                <span className="material-symbols-outlined text-[28px]">eco</span>
                <h4 className="font-title-lg text-title-lg font-bold">Environmental Impact</h4>
                <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                  Renting this outfit avoids {co2Saved}kg of CO₂ and {waterSaved} litres of water compared to buying new. That's equivalent to {Math.ceil(Number(co2Saved) / 0.12)} km not driven.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-3">
                <span className="material-symbols-outlined text-[28px] text-primary">account_balance</span>
                <h4 className="font-title-lg text-title-lg text-on-surface font-bold">5-Year Projection</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  If you rent for 5 occasions per year instead of buying, you could save <strong className="text-primary">₹{(savings * 5).toLocaleString()}</strong> and divert <strong className="text-primary">{(Number(co2Saved) * 5).toFixed(1)}kg</strong> of CO₂.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div>
                <h4 className="font-title-md text-title-md text-on-surface font-bold">Ready to save ₹{savings > 0 ? savings.toLocaleString() : '—'}?</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Browse curated outfits for your next occasion.</p>
              </div>
              <a href="/explore" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-sm whitespace-nowrap">
                Find Your Look
              </a>
            </div>
          </div>
        </div>

        {/* Facts Section */}
        <div className="mt-space-2xl grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            { icon: 'recycling', title: '85%', sub: 'of occasion outfits worn once', desc: 'Most special-event garments spend over 90% of their life unused inside a wardrobe.' },
            { icon: 'water_drop', title: '7,000L', sub: 'water per garment manufacturing', desc: 'A single formal outfit requires thousands of litres of water to produce from raw fiber.' },
            { icon: 'forest', title: '42kg', sub: 'CO₂ saved per rental cycle', desc: 'ReDrape\'s circular model eliminates the environmental cost of new textile production.' },
          ].map(fact => (
            <div key={fact.title} className="bg-surface-container-low rounded-xl p-6 space-y-3 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <span className="material-symbols-outlined text-[28px]">{fact.icon}</span>
              </div>
              <div className="font-display-md text-headline-lg text-primary font-bold" style={{fontFamily:'Playfair Display,serif'}}>{fact.title}</div>
              <div className="font-title-sm text-title-sm text-on-surface font-semibold">{fact.sub}</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{fact.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
