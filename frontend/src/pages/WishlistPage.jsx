import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const WISHLIST_ITEMS = [
  { id: '1', title: 'Emerald Festive Kurta Set', brand: 'Raw Mango', tag: 'Festive', rentalPrice: 699, rating: 4.8, addedDate: 'Nov 2, 2025', eventDate: 'Nov 15, 2025', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBza4R7PX_MJeHd2pC5atxfLB8KqZITdI_od1IewiE_QUgth-HsH3crdlU2DfbHKaaXzI5POCzAx7hfxs6l-xv6aH3_uVdQVbp6UF2BaRgxGWCCvv0DR9-vh1fECofleBlidv5AZoLFT0KNunk18N3ExhPUoGcFq0_46BY0G7wvjFS5T-GpWkQmqm5Wlgc-SFglXh-123Jz7Spe-4l24fZ679EnMRZf6OeJkDsI-Vyc8uOJEH9eo_Rs' },
  { id: '3', title: 'Ivory Anarkali Set', brand: 'Anita Dongre', tag: 'Wedding', rentalPrice: 799, rating: 5.0, addedDate: 'Nov 3, 2025', eventDate: 'Nov 20, 2025', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxIZnY8Z8OqYzMZAb1hr0-GXyDIpC8_K7lnleFMtPg-Wu-lYoAwHUD88XVCbJtqPfhsWI2ETRWvyGB9WSE8uhhgBsK76fd7Ydh3BQfKaOOJMTLc06HNPk5PV4SXioTpLwuxtapQhPIr1E7QuqJ-93aCsrMRt8TnKRV7prMEeAKXGgtsgulMvRoBxytv4YAw4Rw6H0v9EIU4GRfBsR0VYnw-s9pkoJdkWw8JUdoLaPM26Ff5qkGTOzW' },
  { id: '4', title: 'Wine Velvet Tuxedo', brand: 'SS HOMME Bespoke', tag: 'Black Tie', rentalPrice: 899, rating: 4.9, addedDate: 'Nov 5, 2025', eventDate: 'Dec 1, 2025', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqW8lxOocjJjHuEeAIirtUO-CKcp6tQMCBkxZftyxkqgWdO0rPvsxQEkAkRh-9UN_TpUL02v2115ElyoHlOT-TP0U01wtMdbZolVbEH10lF7g8IgofVDLqcWji6gx4THvxLtva7q_s300nCR3eYbRjh_4Nw_yMg8d4-XlgqwuH2X_-vEairvdnDFtMe_NTiAYK2ZV2SLM90CeD0oBU62w8qKq5diSsMbXkMYtUFN0_HdJULA-CAsXA' },
]

const OCCASION_EVENTS = [
  { date: 'Nov 15', event: 'Priya\'s Sangeet', outfit: 'Emerald Festive Kurta Set', status: 'Reserved' },
  { date: 'Nov 20', event: 'Wedding Ceremony', outfit: null, status: 'No Outfit Selected' },
  { date: 'Dec 1', event: 'Office Gala', outfit: 'Wine Velvet Tuxedo', status: 'Wishlist' },
  { date: 'Dec 25', event: 'Christmas Celebration', outfit: null, status: 'Planning' },
]

export default function WishlistPage() {
  const { user } = useAuth()
  const [items, setItems] = useState(WISHLIST_ITEMS)
  const [view, setView] = useState('grid')

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="pt-20 bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Saved Pieces</span>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>Wishlist & Occasion Calendar</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">{items.length} pieces saved to your archive</p>
          </div>
          <div className="flex items-center gap-space-sm">
            <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
              <span className="material-symbols-outlined text-[20px]">view_list</span>
            </button>
            <Link to="/explore" className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Wishlist Items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-[56px] text-on-surface-variant">favorite_border</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface-variant mt-4" style={{fontFamily:'Playfair Display,serif'}}>Your wishlist is empty</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">Save pieces you love while you browse the archive.</p>
                <Link to="/explore" className="mt-6 inline-block bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-md">
                  Explore Archive
                </Link>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
                {items.map(item => (
                  <div key={item.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={item.img} alt={item.title} />
                      <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                        <span className="font-label-sm text-label-sm uppercase tracking-wide text-primary">{item.tag}</span>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-primary transition-colors shadow-sm hover:bg-error-container hover:text-error">
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      </button>
                      {item.eventDate && (
                        <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-md shadow-sm flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px] text-primary">event</span>
                          <span className="font-label-sm text-label-sm text-on-surface">Event: {item.eventDate}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">{item.brand}</p>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div className="font-title-lg text-title-lg text-primary font-bold">₹{item.rentalPrice} <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ day</span></div>
                        <div className="flex gap-2">
                          <Link to={`/outfit/${item.id}`} className="px-3 py-1.5 bg-surface-container text-on-surface rounded font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high transition-colors">View</Link>
                          <Link to={`/checkout/${item.id}`} className="px-3 py-1.5 bg-primary-container text-on-primary rounded font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-colors">Reserve</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-space-md">
                {items.map(item => (
                  <div key={item.id} className="bg-surface-container-lowest rounded-xl shadow-sm flex items-center gap-space-md p-4 hover:shadow-md transition-shadow">
                    <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-title-sm text-title-sm text-on-surface font-semibold truncate">{item.title}</h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{item.brand} · {item.tag}</p>
                          <p className="font-title-md text-title-md text-primary font-bold mt-1">₹{item.rentalPrice}/day</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-full hover:bg-error-container hover:text-error text-on-surface-variant transition-colors shrink-0">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link to={`/outfit/${item.id}`} className="px-4 py-2 bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high transition-colors text-center">View</Link>
                      <Link to={`/checkout/${item.id}`} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary-container transition-colors text-center">Reserve</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Occasion Calendar Sidebar */}
          <div className="space-y-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-space-md">
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Occasion Calendar</h3>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Nov – Dec 2025</span>
              </div>
              <div className="space-y-space-sm">
                {OCCASION_EVENTS.map((event, i) => (
                  <div key={i} className="flex items-start gap-space-sm p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex flex-col items-center justify-center shrink-0">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">{event.date.split(' ')[0]}</span>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold leading-none">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-title-sm text-title-sm text-on-surface font-semibold">{event.event}</p>
                      {event.outfit ? (
                        <p className="font-body-sm text-body-sm text-primary truncate">{event.outfit}</p>
                      ) : (
                        <Link to="/explore" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">add_circle</span>
                          Find an outfit
                        </Link>
                      )}
                      <span className={`font-label-sm text-label-sm uppercase tracking-wider ${event.status === 'Reserved' ? 'text-emerald-700' : event.status === 'Wishlist' ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 border border-dashed border-outline-variant py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Occasion
              </button>
            </div>

            {/* Stats */}
            <div className="bg-surface-container rounded-xl p-5 space-y-3">
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Wishlist Stats</h4>
              <div className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex justify-between"><span>Total saved</span><span className="font-semibold text-on-surface">{WISHLIST_ITEMS.length} pieces</span></div>
                <div className="flex justify-between"><span>Avg rental/day</span><span className="font-semibold text-primary">₹{Math.round(WISHLIST_ITEMS.reduce((s,i)=>s+i.rentalPrice,0)/WISHLIST_ITEMS.length)}</span></div>
                <div className="flex justify-between"><span>Upcoming events</span><span className="font-semibold text-on-surface">4 occasions</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
