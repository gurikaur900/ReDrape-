import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const OUTFITS_DB = {
  '1': {
    id: '1',
    title: 'Emerald Festive Silk Set with Handcrafted Zardozi',
    brand: 'Raw Silk by Raw Mango',
    tags: ['Festive', 'Diwali Edit', 'Engagement', 'Wedding Guest'],
    condition: 'Pristine',
    size: 'M',
    rating: 4.8,
    reviews: 34,
    rentalPrice: 699,
    weekPrice: 3499,
    buyPrice: 18000,
    lender: { name: 'Ananya S.', badge: 'Super Lender', rating: 4.9, rentals: 42 },
    cleanliness: 'Bio-Ozone HydroClean™ Certified',
    cleanDate: 'Oct 24, 2025',
    desc: 'Archival hand-embroidered chanderi kurta with flared brocade trousers and sheer organza dupatta. Intricate handcrafted gold zardozi and antique tilla embroidery. The ensemble exudes regal weight and rich luminous luster.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgM_w2II6QONqT28ZzHTXo7zih6vKubnMJoMC8CKOyLj64XmzIdflWLVBIrpGRtdw_Py9-rUOFFrjU10oDuD_JdRl6gRdC-YLHSMOuI4_ncu6hEt4j6uZQ3gEDYu01kjKHVb-7zZRaxdTYsSzPaxHn09YNVZLLkB8dkAn388INxYWnh5bFkDo-Fo8BJTffIPY0AHlLfRCiiE_bRU00FiNKsRLVlyGLXb5ltDZ9KNyrMq2A24P96gAu',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaQhbV8VBuntoB4d_S6ApTr-3ftUu08p1pahHaaFMjYPdLqOiUw-f8AGXYj-NeNEjUypAPuqLSWuZBvsoMABOI9GUHOkzhfTzPuSGWAekceDncrlwFBpuqifoo0zR1uRRe5OyV5_ksMASpVoMxUUPx1yJxNRTaJcRG9-JDXszyfrJuZmj8Qp7lZjazfURrKYj12-NOgtJvUPkBSfq6CvSzaLLbSQGWevskOwpLQr0gCsDhktESNBMq',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAt8faQ7reCkUB96HnFniVYLwIMAaCnBXUonPWFLeWICSmTuAPwW1nzbWPTxCBpTqODkCq6cP4YbEWKtFCb3iJ8dDFdth9pb5qwGF4cnthEnA-JT3gcH_JWIQgR8WuEsYJ8RkmWX_tNG_3hnwICH4_uxt_T37oVRRDxhkOepjdh9jRoWx1v7EC9dl91zassTLn_lup-ZB0NOxsl8Swo20Jw_NM2tnB6GV9Cy8_zQCM-F6sNarrBZS-X',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVY1V6FY6NOR6mhBycA6HnaesOWIVgaQJFcUjZFT1pZEMv98syXvOkGkMGr9FOGyUbd86Lcnp53tPRZPXZ-A9-othOx84tcpWsvjIlxKY3fU9bpGKFbM2WGaIH2gY8wlt6uggOeBgtJ1VqzrCJs9oKtrsplBZS17EV1AqyXhudePAT8yIqhSyelfadCwhqF1j-pCK_FzAEG0nrydGS4s7cNH54qk3XxBboBxzpqkBUd2ZBosw2O2Bb',
    ],
    thumbnailLabels: ['Front', 'Zari Detail', 'Back View', 'Try-On (18)'],
  },
}

const DEFAULT_OUTFIT = {
  id: 'default',
  title: 'Curated Designer Outfit',
  brand: 'ReDrape Collection',
  tags: ['Festive', 'Wedding'],
  condition: 'Pristine',
  size: 'M',
  rating: 4.8,
  reviews: 24,
  rentalPrice: 799,
  weekPrice: 3999,
  buyPrice: 15000,
  lender: { name: 'Priya S.', badge: 'Trusted Lender', rating: 4.7, rentals: 28 },
  cleanliness: 'Bio-Ozone HydroClean™ Certified',
  cleanDate: 'Oct 20, 2025',
  desc: 'A stunning designer outfit perfect for your special occasions. Hand-crafted with premium fabrics and meticulous attention to detail.',
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBza4R7PX_MJeHd2pC5atxfLB8KqZITdI_od1IewiE_QUgth-HsH3crdlU2DfbHKaaXzI5POCzAx7hfxs6l-xv6aH3_uVdQVbp6UF2BaRgxGWCCvv0DR9-vh1fECofleBlidv5AZoLFT0KNunk18N3ExhPUoGcFq0_46BY0G7wvjFS5T-GpWkQmqm5Wlgc-SFglXh-123Jz7Spe-4l24fZ679EnMRZf6OeJkDsI-Vyc8uOJEH9eo_Rs',
  ],
  thumbnailLabels: ['Front'],
}

export default function OutfitDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const outfit = OUTFITS_DB[id] || DEFAULT_OUTFIT
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(outfit.size)
  const [wishlist, setWishlist] = useState(false)
  const [rentalDays, setRentalDays] = useState(3)
  const [startDate, setStartDate] = useState('')

  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  return (
    <div className="pt-20 bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-md w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-space-xs text-on-surface-variant mb-space-lg font-label-md text-label-md uppercase tracking-wider">
          <Link to="/explore" className="hover:text-primary transition-colors">Archive</Link>
          <span>/</span>
          <Link to={`/explore?occasion=${outfit.tags[0]}`} className="hover:text-primary transition-colors">{outfit.tags[0] || 'Festive'}</Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">{outfit.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left: Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container shadow-md group">
              <img
                src={outfit.images[currentImage]}
                alt={outfit.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md rounded-full font-label-sm text-label-sm uppercase tracking-widest text-primary flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Curated Archive Edition
                </span>
                <span className="px-3 py-1 bg-surface-container-lowest/95 backdrop-blur-md rounded-full font-label-sm text-label-sm tracking-wide text-on-surface flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-sm text-[#3B5E49]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  Pristine Grade A
                </span>
              </div>
              <button
                onClick={() => setWishlist(!wishlist)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface hover:text-primary transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-lg" style={wishlist ? { fontVariationSettings: "'FILL' 1", color: '#500519' } : {}}>favorite</span>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-space-sm">
              {outfit.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative aspect-square rounded-lg overflow-hidden shadow-sm focus:outline-none transition-all ${currentImage === i ? 'ring-2 ring-primary' : ''}`}
                >
                  <img src={img} alt={outfit.thumbnailLabels[i]} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-inverse-surface/80 text-inverse-on-surface text-[9px] font-label-sm uppercase rounded">
                    {outfit.thumbnailLabels[i]}
                  </span>
                </button>
              ))}
            </div>

            {/* Hygiene Certificate */}
            <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">sanitizer</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-title-sm text-title-sm text-on-surface">{outfit.cleanliness}</h4>
                    <span className="px-2 py-0.5 bg-[#eaf3ed] text-[#2c583b] rounded-full text-[10px] font-label-sm font-semibold tracking-wide">Pristine Seal #8942</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Steam sterilized & hand-inspected in Bangalore atelier on {outfit.cleanDate}.</p>
                </div>
              </div>
              <button className="text-primary font-label-md text-label-md hover:underline uppercase tracking-wider shrink-0 flex items-center gap-1">
                Audit Sheet <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Right: Booking */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Header */}
            <div className="space-y-space-xs">
              <div className="flex flex-wrap gap-1.5 pb-1">
                {outfit.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide">{tag}</span>
                ))}
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight" style={{fontFamily:'Playfair Display,serif'}}>{outfit.title}</h1>

              {/* Lender */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">
                    {outfit.lender.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-sm text-title-sm text-on-surface">Archived by {outfit.lender.name}</span>
                      <span className="px-1.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-label-sm uppercase">{outfit.lender.badge}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{outfit.lender.rentals} rentals · {outfit.lender.rating}★ avg</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-tertiary">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">{outfit.rating}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">({outfit.reviews})</span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-md space-y-4">
              <div className="flex items-baseline gap-space-sm">
                <span className="font-display-md text-headline-lg text-primary font-bold" style={{fontFamily:'Playfair Display,serif'}}>₹{outfit.rentalPrice}</span>
                <span className="font-body-md text-body-md text-on-surface-variant">/ day</span>
                <span className="ml-auto font-body-sm text-body-sm text-on-surface-variant line-through">Buy ₹{outfit.buyPrice.toLocaleString()}</span>
              </div>

              {/* Size Selector */}
              <div>
                <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold mb-2">Select Size</p>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 rounded-lg font-label-md text-label-md transition-all ${selectedSize === s ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selector */}
              <div>
                <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold mb-2">Event Date</p>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Duration */}
              <div>
                <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold mb-2">Rental Duration: {rentalDays} days</p>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5, 7].map(d => (
                    <button
                      key={d}
                      onClick={() => setRentalDays(d)}
                      className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all ${rentalDays === d ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t border-outline-variant/30 pt-4 space-y-2">
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>₹{outfit.rentalPrice} × {rentalDays} days</span>
                  <span>₹{outfit.rentalPrice * rentalDays}</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Dry cleaning & delivery</span>
                  <span className="text-emerald-700 font-semibold">Included</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Refundable security deposit</span>
                  <span>₹{Math.round(outfit.buyPrice * 0.1)}</span>
                </div>
                <div className="flex justify-between font-title-md text-title-md text-on-surface font-bold pt-2 border-t border-outline-variant/30">
                  <span>Total</span>
                  <span className="text-primary">₹{outfit.rentalPrice * rentalDays + Math.round(outfit.buyPrice * 0.1)}</span>
                </div>
              </div>

              <Link
                to={`/checkout/${outfit.id}`}
                className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                Reserve Now
              </Link>

              <div className="flex items-center justify-center gap-space-md text-on-surface-variant font-label-sm text-label-sm">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Secure Checkout
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">undo</span>
                  Free Cancellation
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface-container-low rounded-xl p-5 space-y-3">
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">About This Piece</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{outfit.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
