import { useState } from 'react'
import { Link } from 'react-router-dom'

const OCCASIONS = [
  {
    title: 'Wedding',
    count: '142 Outfits',
    desc: 'Sabyasachi, Manish Malhotra & Atelier Sets',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4Z9XUePMDY1Z8p29ZhA3uYNrPbKLdwXbTHycBHO4fSqlLvliGUWUf4g25Q2sB30kdCuqFXBgOM1sb_no-twTqYqwQYAP7YxSkMNXn7xTdP-5kKPT7JM6JGjMXz4QWWu1aLLFjzTlo59Qz6rqpHOO-vCLM6_CnE0wbNEX11cq4YBLUobSupDpODMbNqyQoBnA1eySxLzu0eVUq7TdTsno2zwUhJGJdoTP6Yzo54n_cefVUZG4kn2z',
    param: 'wedding',
  },
  {
    title: 'Farewell',
    count: '88 Outfits',
    desc: 'Pastel Drapes, Tuxedos & Pantsuits',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4DxcRnYOAqyEMx7u6i2h5-RD6UDLdNZqRRPgM70KJgoIl4E3PA_id12QxFwtFfWhA9lI-6SX667FQLUZy-yBA-LToJGxjCSfTs37QKnuV08YdIHHaPuVpP3dgXzsypOwlNIw1ymE0O6V6hZve-S64t3k77yoiqNMbiPPfgQ1YckTtFmd_Ud9fX0Uv-6JOxSdFHtY5q7REKUvs9nKip-TY2q0n1HWlm0jU1GfM5TkcckGjzvTigfrx',
    param: 'farewell',
  },
  {
    title: 'Interview',
    count: '64 Outfits',
    desc: 'Tailored Blazers, Power Suits & Silks',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBivvWUio3XAWqXjGVyw65zTGGKWJh2u6AsIJpt54tuqNMAwj6slDWYPK2InUUMmmYVS-3h5cMiQydnGYWVvJ-nsMzTvX3WBE7dUlNiw54PSjNxMfdKb8ZQrgi83lGcFfhiodWTLHBpY8Mhh11TPSJBtHlfjWyiAuOwXq3FXoJKRJj44GVY-fVfrZ1skE_c9mYEMORSdb8l4_WUbsBu94b7_PFuYrTHSaSW1ht3jaX14tuJGvesW1v1',
    param: 'interview',
  },
  {
    title: 'Party',
    count: '116 Outfits',
    desc: 'Midnight Silks, Sequins & Slips',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADv0KeKlQoHmJIxx2Qu5st6q7zbx6I4VpkRsvqsGfaBrGlplpVwRm43I44CMbnQGTsN_EKiqMzsDlEj_VL1BumKQv_6B_MUOnnXCvBxJW7c6ydn3-3uoD2z2ScsONjiprclNIPxpgsTflgZaKwtAF_KKUB3IUDaSasXwoe3CiFrziUurHx4xbiG7_vbYC2K21l4U2EdO-Fwxg3tErySFEADeCMlioulde04T4AcP8adBEpTzcSVLLX',
    param: 'party',
  },
  {
    title: 'Festive',
    count: '94 Outfits',
    desc: 'Emerald Kurtas, Shararas & Bandhgalas',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_dUKMVYfesqdmkKvSjLw0u-N9zebkBi5umqfmPsoCs9z2e4Cntte5Cz_9SfI5j-217BG5eqX6b_cVkoaaN25UTnOU020KLsO7a1HZgQdCjKfmLFqeZUmjNVuXo-iJ4EkxKnrx5Vn_HUV5XC0fkqr0Q3Q7z3ZSRuBH5pUQP7M03EFvh1d50cxPnwRviwiteVI2y--VouH7WWqQ-mdp6_J7e7_E8bpInpxVNrzoT6V3k3oDHzfaJiH3',
    param: 'festive',
  },
  {
    title: 'Photoshoot',
    count: '52 Outfits',
    desc: 'Avant-Garde Silhouettes & Couture Gowns',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuRTIdBtnnFD9lgN25r4EYWq1xs_fQTqrUtLIGwVzpjDfXDqarBV_o_Tg4DLvGYG10Rlbg56K_UCaDe6SDXDQtc06b1CxRqYgNH5tYttPEFi93hcvVR5qgtpZVQvU2SAyyp6xpj0wxcH0J7i8AjJ2DgdISVwcAaQ3En8RjdRCD2ESujiK_VJilqSpBo3tYW0y73iElAbhS_4RmxSOzIv9hqTINmjEjK0X0FfPDN45Xaiyaf_gJXbFB',
    param: 'photoshoot',
  },
]

const FEATURED_OUTFITS = [
  {
    id: '1',
    title: 'Emerald Festive Kurta Set',
    brand: 'Raw Silk by Raw Mango',
    tag: 'Festive Edit',
    condition: 'Pristine • Size M',
    rating: 4.8,
    reviews: 34,
    rentalPrice: 699,
    buyPrice: 3499,
    availability: 'Next 3 Days Available',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBza4R7PX_MJeHd2pC5atxfLB8KqZITdI_od1IewiE_QUgth-HsH3crdlU2DfbHKaaXzI5POCzAx7hfxs6l-xv6aH3_uVdQVbp6UF2BaRgxGWCCvv0DR9-vh1fECofleBlidv5AZoLFT0KNunk18N3ExhPUoGcFq0_46BY0G7wvjFS5T-GpWkQmqm5Wlgc-SFglXh-123Jz7Spe-4l24fZ679EnMRZf6OeJkDsI-Vyc8uOJEH9eo_Rs',
  },
  {
    id: '2',
    title: 'Midnight Satin Slip',
    brand: 'House of CB Eveningwear',
    tag: 'Cocktail',
    condition: 'Like New • Size S',
    rating: 4.9,
    reviews: 48,
    rentalPrice: 599,
    buyPrice: 2999,
    availability: 'Instant Booking',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPZLEWZIk5W6EOAFo_DAK2j1IpBTB468cG4CMKB6MQgqHQeptw1wI24hVS7q9SmfxT8Ybv5ydki26a9mot6DPYSFvoZu6u9K_8t4Pxz3KrrFLoH_bH1WDmxz1dR8lYajjJhPcJegVD9Rh3JlXN2UzsSNKtfxBTBhrXJLurAF7xiOp_57m-Hds1Ff9k4U7ZK5rM4z8hixCJ-MM8wrWomVtslsIrDABaNNR2ygowvKURQ2-Bk9SU-6rV',
  },
  {
    id: '3',
    title: 'Ivory Anarkali Set',
    brand: 'Anita Dongre Grassroot',
    tag: 'Sangeet Edit',
    condition: 'Pristine • Size L',
    rating: 5.0,
    reviews: 22,
    rentalPrice: 799,
    buyPrice: 4200,
    availability: 'Weekend Ready',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxIZnY8Z8OqYzMZAb1hr0-GXyDIpC8_K7lnleFMtPg-Wu-lYoAwHUD88XVCbJtqPfhsWI2ETRWvyGB9WSE8uhhgBsK76fd7Ydh3BQfKaOOJMTLc06HNPk5PV4SXioTpLwuxtapQhPIr1E7QuqJ-93aCsrMRt8TnKRV7prMEeAKXGgtsgulMvRoBxytv4YAw4Rw6H0v9EIU4GRfBsR0VYnw-s9pkoJdkWw8JUdoLaPM26Ff5qkGTOzW',
  },
  {
    id: '4',
    title: 'Wine Velvet Tuxedo',
    brand: 'SS HOMME Bespoke',
    tag: 'Black Tie',
    condition: 'Dry Clean Certified • Size 40',
    rating: 4.9,
    reviews: 19,
    rentalPrice: 899,
    buyPrice: 5500,
    availability: 'Fast 24h Delivery',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqW8lxOocjJjHuEeAIirtUO-CKcp6tQMCBkxZftyxkqgWdO0rPvsxQEkAkRh-9UN_TpUL02v2115ElyoHlOT-TP0U01wtMdbZolVbEH10lF7g8IgofVDLqcWji6gx4THvxLtva7q_s300nCR3eYbRjh_4Nw_yMg8d4-XlgqwuH2X_-vEairvdnDFtMe_NTiAYK2ZV2SLM90CeD0oBU62w8qKq5diSsMbXkMYtUFN0_HdJULA-CAsXA',
  },
]

const HOW_IT_WORKS = [
  { icon: 'calendar_month', step: 'Step 1', title: 'Choose Occasion', desc: 'Pick your event type, select your required calendar dates, and indicate custom sizing nuances.' },
  { icon: 'checkroom', step: 'Step 2', title: 'Find Your Look', desc: 'Filter through authentic designer archives, read lender reviews, or take the style finder quiz.' },
  { icon: 'celebration', step: 'Step 3', title: 'Wear & Celebrate', desc: 'Arrives fresh, pressed, and certified sanitized right to your doorstep 24-48 hours before event time.' },
  { icon: 'autorenew', step: 'Step 4', title: 'Return or Swap', desc: 'Slip it into the prepaid courier bag. No need to wash or dry clean — our atelier takes care of everything.' },
]

const TESTIMONIALS = [
  { initials: 'AK', name: 'Ananya Kapoor', location: 'Rented in Mumbai • Oct 2024', quote: '"Rented the Anita Dongre Anarkali for my best friend\'s Sangeet in Udaipur. The fit was impeccable, smelled like freshly laundered luxury, and saved me over ₹30,000."' },
  { initials: 'RM', name: 'Rohan Mehra', location: 'Lender in Bangalore • Dec 2024', quote: '"I consigned 4 sherwanis and 2 tuxedos from my wedding that were gathering dust. ReDrape sent me ₹24,500 over the festive season alone while taking pristine care of the pieces."' },
  { initials: 'VS', name: 'Vikramaditya S.', location: 'Rented in New Delhi • Jan 2025', quote: '"The Quiz matched me with the exact velvet tuxedo I needed for the Filmfare gala. Dropped at my hotel room on Friday and picked up by courier on Sunday morning without lifting a finger."' },
]

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All Collections')
  const [wishlistItems, setWishlistItems] = useState(new Set())

  const toggleWishlist = (id) => {
    setWishlistItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="pt-20 bg-surface">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-surface-container-low py-space-xl md:py-space-2xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Left: Copy */}
            <div className="lg:col-span-6 space-y-space-md z-10">
              <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm text-secondary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Circular Luxury Occasionwear</span>
              </div>
              <h1 className="font-display-lg text-display-md-mobile lg:text-display-lg text-primary tracking-tight leading-none" style={{fontFamily: 'Playfair Display, serif'}}>
                Your next look <br className="hidden sm:inline" />
                doesn't have to be <br />
                <span className="italic font-normal text-on-surface">your next purchase.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                Discover occasion-ready designer outfits to rent, exchange, or buy — and give the precious couture already nestled in your wardrobe an endless second occasion.
              </p>
              <div className="pt-space-sm flex flex-wrap items-center gap-space-md">
                <Link to="/find-my-look" className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-md hover:shadow-lg flex items-center gap-space-xs group">
                  <span>Find My Look</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <Link to="/list-outfit" className="bg-surface-container-lowest text-on-surface px-8 py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container hover:text-primary transition-all shadow-sm flex items-center gap-space-xs">
                  <span>List Your Outfit</span>
                </Link>
              </div>
              {/* Trust Badges */}
              <div className="pt-space-md flex flex-wrap items-center gap-space-lg text-on-surface-variant">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                  <span className="font-label-md text-label-md tracking-normal">100% Designer Authenticated</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">local_laundry_service</span>
                  <span className="font-label-md text-label-md tracking-normal">Hospital-Grade Eco Clean</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Collage */}
            <div className="lg:col-span-6 relative mt-space-lg lg:mt-0">
              <div className="relative w-full h-[520px] md:h-[620px] flex items-center justify-center">
                <div className="absolute -right-8 top-12 w-72 h-72 rounded-full bg-secondary-container/30 blur-3xl pointer-events-none"></div>
                <div className="absolute -left-6 bottom-10 w-60 h-60 rounded-full bg-tertiary-container/20 blur-2xl pointer-events-none"></div>
                {/* Primary Portrait */}
                <div className="absolute right-4 md:right-10 top-0 w-64 md:w-80 h-[450px] md:h-[530px] rounded-xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500 bg-surface-container-highest">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZMISZwtZEHJs8fIW06hCG4hxZHyyTaHd24AVL1apYIIVjGSAv_h8_paOGm1IIcU-r-jTktpzcyEidKOj4yF09NYFeeR074MnlYfsORZSsANaoieN34knUXkw17wjOJQHgqquifUM9kiJP1shDNIFLBGH7iYchCPaknYuyCS4edw0hiqMBIMB4sp4CJ8FrlwDaaCcreNWAwnFNgHQ0JkwaoPgIwDwSjQNyt037CzTpKYguQU7aVo-Q"
                    alt="Bridal editorial lehenga"
                  />
                  <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Weddings • Red Haute</span>
                  </div>
                </div>
                {/* Secondary Portrait */}
                <div className="absolute left-2 md:left-6 bottom-4 md:bottom-8 w-52 md:w-64 h-[320px] md:h-[390px] rounded-xl overflow-hidden shadow-xl -rotate-2 hover:rotate-0 transition-transform duration-500 bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRAfXxS73JrIWjG952hSKc1LgLh1-ix7zCh-HYDKu4hT-S7TM25cPx8QV0_CaQpfc6yBIkfYmC7ESKDtaOdthDjWTabo4gJmUnU57X9wGksrWgxl_jOWUAE0hhPDjU_s9XyVgwux9szBNLWTMAsv5aCCdOj0CvdhHfSOG8xus8ijplop88cGPtX5BJJFs9oFOhwAu5YNmUG0DNnHR8yP5WtIuCP4xMmlrQ14hu8vf9iAW96q3zbl9r"
                    alt="Midnight emerald gown"
                  />
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="font-label-sm text-label-sm tracking-wide text-on-surface">Black Tie Gala</span>
                  </div>
                </div>
                {/* Floating Badge: Price */}
                <div className="absolute top-16 left-6 md:left-14 bg-surface-container-lowest p-3 rounded-xl shadow-lg flex items-center gap-space-xs z-20 animate-bounce">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">currency_rupee</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Rental From</p>
                    <p className="font-title-sm text-title-sm text-primary font-bold">₹699 / day</p>
                  </div>
                </div>
                {/* Floating Badge: Verified Cleaned */}
                <div className="absolute bottom-16 right-2 md:right-8 bg-surface-container-lowest p-3 rounded-xl shadow-lg flex items-center gap-space-xs z-20">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">sanitizer</span>
                  </div>
                  <div>
                    <p className="font-title-sm text-title-sm text-on-surface font-semibold">Verified Cleaned</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Pristine condition guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: OCCASIONS */}
      <section className="w-full py-space-2xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Archival Taxonomy</span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>What are you dressing for?</h2>
            </div>
            <Link to="/explore" className="inline-flex items-center gap-1 font-label-lg text-label-lg uppercase tracking-wider text-primary hover:text-primary-container transition-colors group">
              <span>Explore All 24+ Occasions</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-gutter">
            {OCCASIONS.map((occ) => (
              <Link
                key={occ.title}
                to={`/explore?occasion=${occ.param}`}
                className="group relative h-96 rounded-xl overflow-hidden shadow-md flex flex-col justify-end p-5 bg-surface-container-high transform hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${occ.img}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/40 to-transparent"></div>
                <div className="relative z-10 space-y-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-container">{occ.count}</span>
                  <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest" style={{fontFamily:'Playfair Display,serif'}}>{occ.title}</h3>
                  <p className="font-body-sm text-body-sm text-surface-container-high line-clamp-1">{occ.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: CURATED LOOKS */}
      <section className="w-full py-space-2xl bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Immediate Dispatch • Hand-Inspected</span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>Curated Looks for Your Next Occasion</h2>
            </div>
            <div className="flex items-center gap-space-xs overflow-x-auto pb-2 md:pb-0">
              {['All Collections', 'Ethnic Couture', 'Cocktail & Evening', 'Tuxedos & Suits'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full font-label-md text-label-md transition-colors shadow-sm whitespace-nowrap ${
                    activeFilter === f
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {FEATURED_OUTFITS.map((outfit) => (
              <div key={outfit.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-high">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={outfit.img} alt={outfit.title} />
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                    <span className="font-label-sm text-label-sm uppercase tracking-wide text-primary">{outfit.tag}</span>
                  </div>
                  <button
                    aria-label="Add to Wishlist"
                    onClick={() => toggleWishlist(outfit.id)}
                    className="wishlist-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shadow-sm"
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={wishlistItems.has(outfit.id) ? { fontVariationSettings: "'FILL' 1", color: '#500519' } : {}}
                    >favorite</span>
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-md shadow-sm">
                    <span className="font-label-sm text-label-sm text-on-surface">Dates: {outfit.availability}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-1">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                        {outfit.condition}
                      </span>
                      <span className="flex items-center gap-0.5 text-tertiary font-bold">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {outfit.rating} ({outfit.reviews})
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">{outfit.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{outfit.brand}</p>
                  </div>
                  <div className="pt-2 flex items-baseline justify-between">
                    <div>
                      <div className="font-title-lg text-title-lg text-primary font-bold">₹{outfit.rentalPrice} <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ day</span></div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant line-through">Buy ₹{outfit.buyPrice.toLocaleString()}</div>
                    </div>
                    <Link to={`/outfit/${outfit.id}`} className="bg-primary-container text-on-primary px-3 py-1.5 rounded font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-colors">Rent Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: RENT OR BUY CALCULATOR */}
      <section className="w-full py-space-2xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="bg-surface-container rounded-2xl p-6 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              <div className="lg:col-span-5 space-y-space-md">
                <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">The Conscious Math</span>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight leading-tight" style={{fontFamily:'Playfair Display,serif'}}>
                  Rent or Buy? <br />The Real Cost of Occasionwear.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  85% of special event outfits are worn only once before spending years forgotten inside a wardrobe. Why pay retail when you can access pristine designer couture for a fraction of the cost?
                </p>
                <div className="space-y-space-sm pt-2">
                  {['Zero dry cleaning, steaming, or storage hassles', 'Wear different luxury ensembles for each milestone', 'Over 42kg CO2 and 7,000L water saved per rental cycle'].map((item) => (
                    <div key={item} className="flex items-center gap-space-xs text-on-surface">
                      <span className="material-symbols-outlined text-emerald-700 text-[20px]">check_circle</span>
                      <span className="font-body-md text-body-md">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-space-sm">
                  <Link to="/rent-vs-buy" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-sm inline-block">
                    Compare an Outfit
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-md space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-title-lg text-title-lg text-on-surface font-bold">Designer Cocktail Gown</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Single Milestone Event Comparison (48 Hours)</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">83% Cost Reduction</span>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center font-label-md text-label-md">
                        <span className="text-on-surface-variant font-medium">Standard Retail Purchase</span>
                        <span className="font-title-md text-title-md text-on-surface font-bold">₹3,499</span>
                      </div>
                      <div className="w-full h-4 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-outline rounded-full w-full"></div>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Plus ₹450 dry cleaning & closet clutter</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center font-label-md text-label-md">
                        <span className="text-primary font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-primary">eco</span>
                          ReDrape Circular Rental
                        </span>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">₹599</span>
                      </div>
                      <div className="w-full h-4 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: '17%' }}></div>
                      </div>
                      <p className="font-body-sm text-body-sm text-primary font-medium">Includes doorstep insurance & contactless pickup</p>
                    </div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-space-md">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Direct Pocket Savings</span>
                      <div className="font-headline-lg text-headline-lg text-emerald-800 font-bold">₹2,900</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Money retained in your wallet for the celebration.</p>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm text-center sm:text-right space-y-1 min-w-[180px]">
                      <span className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant">Impact Created</span>
                      <div className="font-title-lg text-title-lg text-primary font-bold">3.2kg Saved</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Textile waste diverted from landfill</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: LENDER EARN */}
      <section className="w-full py-space-2xl bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-space-xl">
          <div className="max-w-2xl">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Lender & Consignment Studio</span>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>Your wardrobe can earn too.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              Turn occasionwear sitting idle in your closet into passive recurring revenue with end-to-end dry cleaning, delivery, and damage insurance managed by ReDrape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {[
              { num: '01', title: 'Unused Outfit', desc: 'Photograph your designer lehenga, tux, or evening gown that has been worn only once.', tag: 'Takes < 2 minutes' },
              { num: '02', title: 'List on ReDrape', desc: 'Set your available calendar, daily rental fee, or opt for consignment curation in our atelier.', tag: 'Complete Pricing Control' },
              { num: '03', title: 'Verified & Rented', desc: 'We inspect condition, provide safe courier handoff, and insure garment against tears or spills.', tag: '₹10,000 Transit Cover' },
              { num: '04', title: 'Earn up to ₹15,000/mo', desc: 'Direct instant bank payouts after every completed rental cycle with pristine returned care.', tag: 'Instant Bank Transfer', highlight: true },
            ].map((step) => (
              <div key={step.num} className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative space-y-3 ${step.highlight ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-headline-sm ${step.highlight ? 'bg-primary-container text-on-primary' : 'bg-surface-container-high text-primary'}`}>{step.num}</div>
                <h3 className={`font-title-md text-title-md font-bold ${step.highlight ? 'text-on-primary' : 'text-on-surface'}`}>{step.title}</h3>
                <p className={`font-body-sm text-body-sm leading-relaxed ${step.highlight ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>{step.desc}</p>
                <div className={`pt-2 font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1 ${step.highlight ? 'text-tertiary-fixed' : 'text-primary'}`}>
                  <span>{step.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">payments</span>
              </div>
              <div>
                <h4 className="font-title-md text-title-md text-on-surface font-bold">Have 2 or more designer garments?</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Our concierge handles doorstep pickup, photography, and vault storage at zero upfront cost.</p>
              </div>
            </div>
            <Link to="/list-outfit" className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap">
              List Your Outfit
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section className="w-full py-space-2xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-space-xl">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">The Seamless Lifecycle</span>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight" style={{fontFamily:'Playfair Display,serif'}}>How ReDrape Works</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Four simple steps to effortless luxury circular wear.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="text-center space-y-3 p-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-surface-container-high flex items-center justify-center text-primary shadow-inner">
                  <span className="material-symbols-outlined text-[28px]">{s.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">{s.step}</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface" style={{fontFamily:'Playfair Display,serif'}}>{s.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: TRUST + TESTIMONIALS */}
      <section className="w-full py-space-2xl bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { icon: 'verified_user', title: 'Verified Lenders & Authenticity', desc: 'Every garment undergoes a multi-point authenticity check before listing. Real IDs and phone verification for all peers.' },
              { icon: 'wash', title: '5-Point Sanitization Protocol', desc: 'Eco-certified hospital-grade ozone cleaning between every booking. Arrives hermetically sealed and fragrant.' },
              { icon: 'shield', title: 'Complimentary Damage Insurance', desc: 'Minor spills and zipper snags happen. Our built-in protection ensures zero stress for borrowers and lenders alike.' },
            ].map((p) => (
              <div key={p.title} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-3 flex items-start gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[24px]">{p.icon}</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface font-bold">{p.title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="pt-space-md">
            <div className="flex items-center justify-between mb-space-md">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Community Testimonials</span>
                <h3 className="font-headline-md text-headline-md text-primary tracking-tight" style={{fontFamily:'Playfair Display,serif'}}>Voices of the Archive</h3>
              </div>
              <div className="flex items-center gap-space-xs text-tertiary">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-title-sm text-title-sm font-bold text-on-surface">4.92 / 5</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">(1,420+ Happy Celebrations)</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4">
                  <div className="flex items-center gap-0.5 text-tertiary">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">{t.quote}</p>
                  <div className="flex items-center gap-space-xs">
                    <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-sm">{t.initials}</div>
                    <div>
                      <p className="font-title-sm text-title-sm text-on-surface font-semibold">{t.name}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL BANNER */}
      <section className="w-full py-space-2xl bg-primary text-on-primary relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-primary-container/60 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-space-md">
            <span className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed-dim font-semibold">Begin Your Circular Journey</span>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-primary tracking-tight leading-tight" style={{fontFamily:'Playfair Display,serif'}}>
              Give your wardrobe a second life.
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim leading-relaxed max-w-xl mx-auto">
              Rent breathtaking designer couture for your upcoming milestones or let your cherished pieces find their next celebration.
            </p>
            <div className="pt-space-sm flex flex-wrap items-center justify-center gap-space-md">
              <Link to="/explore" className="bg-surface-container-lowest text-primary px-8 py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container transition-colors shadow-lg">
                Explore ReDrape
              </Link>
              <Link to="/list-outfit" className="bg-primary-container text-on-primary px-8 py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container-high hover:text-primary transition-colors shadow-md">
                Start Lending
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
