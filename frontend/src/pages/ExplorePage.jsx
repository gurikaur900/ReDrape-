import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const ALL_OUTFITS = [
  { id: '1', title: 'Emerald Festive Kurta Set', brand: 'Raw Silk by Raw Mango', tag: 'Festive', condition: 'Pristine', size: 'M', rating: 4.8, reviews: 34, rentalPrice: 699, buyPrice: 3499, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBza4R7PX_MJeHd2pC5atxfLB8KqZITdI_od1IewiE_QUgth-HsH3crdlU2DfbHKaaXzI5POCzAx7hfxs6l-xv6aH3_uVdQVbp6UF2BaRgxGWCCvv0DR9-vh1fECofleBlidv5AZoLFT0KNunk18N3ExhPUoGcFq0_46BY0G7wvjFS5T-GpWkQmqm5Wlgc-SFglXh-123Jz7Spe-4l24fZ679EnMRZf6OeJkDsI-Vyc8uOJEH9eo_Rs' },
  { id: '2', title: 'Midnight Satin Slip', brand: 'House of CB', tag: 'Cocktail', condition: 'Like New', size: 'S', rating: 4.9, reviews: 48, rentalPrice: 599, buyPrice: 2999, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPZLEWZIk5W6EOAFo_DAK2j1IpBTB468cG4CMKB6MQgqHQeptw1wI24hVS7q9SmfxT8Ybv5ydki26a9mot6DPYSFvoZu6u9K_8t4Pxz3KrrFLoH_bH1WDmxz1dR8lYajjJhPcJegVD9Rh3JlXN2UzsSNKtfxBTBhrXJLurAF7xiOp_57m-Hds1Ff9k4U7ZK5rM4z8hixCJ-MM8wrWomVtslsIrDABaNNR2ygowvKURQ2-Bk9SU-6rV' },
  { id: '3', title: 'Ivory Anarkali Set', brand: 'Anita Dongre Grassroot', tag: 'Wedding', condition: 'Pristine', size: 'L', rating: 5.0, reviews: 22, rentalPrice: 799, buyPrice: 4200, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxIZnY8Z8OqYzMZAb1hr0-GXyDIpC8_K7lnleFMtPg-Wu-lYoAwHUD88XVCbJtqPfhsWI2ETRWvyGB9WSE8uhhgBsK76fd7Ydh3BQfKaOOJMTLc06HNPk5PV4SXioTpLwuxtapQhPIr1E7QuqJ-93aCsrMRt8TnKRV7prMEeAKXGgtsgulMvRoBxytv4YAw4Rw6H0v9EIU4GRfBsR0VYnw-s9pkoJdkWw8JUdoLaPM26Ff5qkGTOzW' },
  { id: '4', title: 'Wine Velvet Tuxedo', brand: 'SS HOMME Bespoke', tag: 'Black Tie', condition: 'Dry Clean Certified', size: '40', rating: 4.9, reviews: 19, rentalPrice: 899, buyPrice: 5500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqW8lxOocjJjHuEeAIirtUO-CKcp6tQMCBkxZftyxkqgWdO0rPvsxQEkAkRh-9UN_TpUL02v2115ElyoHlOT-TP0U01wtMdbZolVbEH10lF7g8IgofVDLqcWji6gx4THvxLtva7q_s300nCR3eYbRjh_4Nw_yMg8d4-XlgqwuH2X_-vEairvdnDFtMe_NTiAYK2ZV2SLM90CeD0oBU62w8qKq5diSsMbXkMYtUFN0_HdJULA-CAsXA' },
  { id: '5', title: 'Rose Gold Lehenga Set', brand: 'Manish Malhotra', tag: 'Wedding', condition: 'Pristine', size: 'M', rating: 4.7, reviews: 61, rentalPrice: 1499, buyPrice: 12000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4Z9XUePMDY1Z8p29ZhA3uYNrPbKLdwXbTHycBHO4fSqlLvliGUWUf4g25Q2sB30kdCuqFXBgOM1sb_no-twTqYqwQYAP7YxSkMNXn7xTdP-5kKPT7JM6JGjMXz4QWWu1aLLFjzTlo59Qz6rqpHOO-vCLM6_CnE0wbNEX11cq4YBLUobSupDpODMbNqyQoBnA1eySxLzu0eVUq7TdTsno2zwUhJGJdoTP6Yzo54n_cefVUZG4kn2z' },
  { id: '6', title: 'Pastel Organza Saree', brand: 'Sabyasachi Mukherjee', tag: 'Farewell', condition: 'Like New', size: 'Free', rating: 4.8, reviews: 33, rentalPrice: 899, buyPrice: 7000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4DxcRnYOAqyEMx7u6i2h5-RD6UDLdNZqRRPgM70KJgoIl4E3PA_id12QxFwtFfWhA9lI-6SX667FQLUZy-yBA-LToJGxjCSfTs37QKnuV08YdIHHaPuVpP3dgXzsypOwlNIw1ymE0O6V6hZve-S64t3k77yoiqNMbiPPfgQ1YckTtFmd_Ud9fX0Uv-6JOxSdFHtY5q7REKUvs9nKip-TY2q0n1HWlm0jU1GfM5TkcckGjzvTigfrx' },
  { id: '7', title: 'Power Blazer Set', brand: 'Tarun Tahiliani', tag: 'Interview', condition: 'Pristine', size: 'S', rating: 4.6, reviews: 15, rentalPrice: 599, buyPrice: 4500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBivvWUio3XAWqXjGVyw65zTGGKWJh2u6AsIJpt54tuqNMAwj6slDWYPK2InUUMmmYVS-3h5cMiQydnGYWVvJ-nsMzTvX3WBE7dUlNiw54PSjNxMfdKb8ZQrgi83lGcFfhiodWTLHBpY8Mhh11TPSJBtHlfjWyiAuOwXq3FXoJKRJj44GVY-fVfrZ1skE_c9mYEMORSdb8l4_WUbsBu94b7_PFuYrTHSaSW1ht3jaX14tuJGvesW1v1' },
  { id: '8', title: 'Champagne Metallic Gown', brand: 'Bibhu Mohapatra', tag: 'Party', condition: 'Like New', size: 'XS', rating: 4.9, reviews: 27, rentalPrice: 999, buyPrice: 8000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADv0KeKlQoHmJIxx2Qu5st6q7zbx6I4VpkRsvqsGfaBrGlplpVwRm43I44CMbnQGTsN_EKiqMzsDlEj_VL1BumKQv_6B_MUOnnXCvBxJW7c6ydn3-3uoD2z2ScsONjiprclNIPxpgsTflgZaKwtAF_KKUB3IUDaSasXwoe3CiFrziUurHx4xbiG7_vbYC2K21l4U2EdO-Fwxg3tErySFEADeCMlioulde04T4AcP8adBEpTzcSVLLX' },
]

const OCCASIONS = ['All', 'Wedding', 'Farewell', 'Interview', 'Party', 'Festive', 'Cocktail', 'Black Tie', 'Photoshoot']
const SIZES = ['All Sizes', 'XS', 'S', 'M', 'L', 'XL', 'Free']
const SORT_OPTIONS = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Newest']

export default function ExplorePage() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [occasion, setOccasion] = useState(searchParams.get('occasion') || 'All')
  const [size, setSize] = useState('All Sizes')
  const [sort, setSort] = useState('Relevance')
  const [wishlist, setWishlist] = useState(new Set())
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = ALL_OUTFITS
    .filter(o => occasion === 'All' || o.tag.toLowerCase().includes(occasion.toLowerCase()))
    .filter(o => size === 'All Sizes' || o.size === size)
    .filter(o => o.rentalPrice >= priceRange[0] && o.rentalPrice <= priceRange[1])
    .filter(o => !search || o.title.toLowerCase().includes(search.toLowerCase()) || o.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.rentalPrice - b.rentalPrice
      if (sort === 'Price: High to Low') return b.rentalPrice - a.rentalPrice
      if (sort === 'Rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="pt-20 bg-surface min-h-screen">
      {/* Announcement Bar */}
      <div className="w-full bg-secondary-fixed py-1.5 px-margin-mobile md:px-margin text-center">
        <p className="font-label-sm text-label-sm text-on-primary-fixed uppercase tracking-widest">
          Give every outfit another occasion <span className="mx-2 opacity-50">•</span> Rent, exchange & resell verified designer occasionwear <span className="mx-2 opacity-50">•</span> Free express dry-cleaning included on all rentals
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-xl">
        {/* Header */}
        <div className="mb-space-xl">
          <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">The Archive</span>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>Explore Outfits</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{filtered.length} outfits available for your next occasion</p>
        </div>

        <div className="flex gap-gutter">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-space-lg">
            {/* Search */}
            <div>
              <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold block mb-2">Search</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
                <input
                  type="text"
                  placeholder="Designer, occasion..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none"
                />
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold block mb-2">Occasion</label>
              <div className="space-y-1">
                {OCCASIONS.map(occ => (
                  <button
                    key={occ}
                    onClick={() => setOccasion(occ)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-body-sm text-body-sm transition-colors ${occasion === occ ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold block mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-colors ${size === s ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold block mb-2">
                Rental Price: ₹{priceRange[0]} – ₹{priceRange[1]}/day
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-primary"
              />
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            {/* Mobile Filters + Sort */}
            <div className="flex items-center justify-between mb-space-md gap-space-md">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Filters
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden sm:block">Sort:</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="px-3 py-2 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none"
                >
                  {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Outfit Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant">search_off</span>
                <p className="font-headline-sm text-headline-sm text-on-surface-variant mt-4">No outfits found</p>
                <button onClick={() => { setOccasion('All'); setSearch(''); setSize('All Sizes') }} className="mt-4 text-primary font-label-md text-label-md underline">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
                {filtered.map(outfit => (
                  <div key={outfit.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-high">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={outfit.img} alt={outfit.title} />
                      <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                        <span className="font-label-sm text-label-sm uppercase tracking-wide text-primary">{outfit.tag}</span>
                      </div>
                      <button
                        onClick={() => toggleWishlist(outfit.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]" style={wishlist.has(outfit.id) ? { fontVariationSettings: "'FILL' 1", color: '#500519' } : {}}>favorite</span>
                      </button>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-1">
                          <span>{outfit.condition} • Size {outfit.size}</span>
                          <span className="flex items-center gap-0.5 text-tertiary font-bold">
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            {outfit.rating} ({outfit.reviews})
                          </span>
                        </div>
                        <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">{outfit.title}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">{outfit.brand}</p>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="font-title-lg text-title-lg text-primary font-bold">₹{outfit.rentalPrice} <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ day</span></div>
                          <div className="font-body-sm text-body-sm text-on-surface-variant line-through">Buy ₹{outfit.buyPrice.toLocaleString()}</div>
                        </div>
                        <Link to={`/outfit/${outfit.id}`} className="bg-primary-container text-on-primary px-3 py-1.5 rounded font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-colors">View</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
