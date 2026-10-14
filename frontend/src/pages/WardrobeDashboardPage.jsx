import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const TABS = ['Overview', 'Active Rentals', 'My Listings', 'Earnings', 'Reviews']

const MY_LISTINGS = [
  { id: '1', title: 'Emerald Festive Kurta Set', tag: 'Festive', rentals: 8, earned: 5600, status: 'Active', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBza4R7PX_MJeHd2pC5atxfLB8KqZITdI_od1IewiE_QUgth-HsH3crdlU2DfbHKaaXzI5POCzAx7hfxs6l-xv6aH3_uVdQVbp6UF2BaRgxGWCCvv0DR9-vh1fECofleBlidv5AZoLFT0KNunk18N3ExhPUoGcFq0_46BY0G7wvjFS5T-GpWkQmqm5Wlgc-SFglXh-123Jz7Spe-4l24fZ679EnMRZf6OeJkDsI-Vyc8uOJEH9eo_Rs' },
  { id: '4', title: 'Wine Velvet Tuxedo', tag: 'Black Tie', rentals: 5, earned: 4000, status: 'Active', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqW8lxOocjJjHuEeAIirtUO-CKcp6tQMCBkxZftyxkqgWdO0rPvsxQEkAkRh-9UN_TpUL02v2115ElyoHlOT-TP0U01wtMdbZolVbEH10lF7g8IgofVDLqcWji6gx4THvxLtva7q_s300nCR3eYbRjh_4Nw_yMg8d4-XlgqwuH2X_-vEairvdnDFtMe_NTiAYK2ZV2SLM90CeD0oBU62w8qKq5diSsMbXkMYtUFN0_HdJULA-CAsXA' },
  { id: '3', title: 'Ivory Anarkali Set', tag: 'Wedding', rentals: 3, earned: 2400, status: 'Pending Review', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxIZnY8Z8OqYzMZAb1hr0-GXyDIpC8_K7lnleFMtPg-Wu-lYoAwHUD88XVCbJtqPfhsWI2ETRWvyGB9WSE8uhhgBsK76fd7Ydh3BQfKaOOJMTLc06HNPk5PV4SXioTpLwuxtapQhPIr1E7QuqJ-93aCsrMRt8TnKRV7prMEeAKXGgtsgulMvRoBxytv4YAw4Rw6H0v9EIU4GRfBsR0VYnw-s9pkoJdkWw8JUdoLaPM26Ff5qkGTOzW' },
]

const ACTIVE_RENTALS = [
  { id: 'b1', outfit: 'Emerald Festive Kurta Set', renter: 'Priya M.', from: 'Nov 2', to: 'Nov 5', status: 'In Transit', amount: 2097 },
  { id: 'b2', outfit: 'Wine Velvet Tuxedo', renter: 'Rahul S.', from: 'Nov 12', to: 'Nov 14', status: 'Confirmed', amount: 1798 },
]

const EARNINGS_DATA = [
  { month: 'Aug', amount: 4200 },
  { month: 'Sep', amount: 6800 },
  { month: 'Oct', amount: 9400 },
  { month: 'Nov', amount: 5600 },
]

export default function WardrobeDashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('Overview')

  const totalEarned = MY_LISTINGS.reduce((sum, l) => sum + l.earned, 0)
  const totalRentals = MY_LISTINGS.reduce((sum, l) => sum + l.rentals, 0)
  const maxEarning = Math.max(...EARNINGS_DATA.map(d => d.amount))

  return (
    <div className="pt-20 bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-xl">
          <div>
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Circular Earnings Dashboard</span>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>My Wardrobe</h1>
          </div>
          <Link to="/list-outfit" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center gap-2 w-fit">
            <span className="material-symbols-outlined text-[18px]">add</span>
            List New Outfit
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
          {[
            { icon: 'currency_rupee', label: 'Total Earned', value: `₹${totalEarned.toLocaleString()}`, color: 'text-emerald-700' },
            { icon: 'checkroom', label: 'Active Listings', value: MY_LISTINGS.filter(l => l.status === 'Active').length, color: 'text-primary' },
            { icon: 'calendar_month', label: 'Total Rentals', value: totalRentals, color: 'text-primary' },
            { icon: 'star', label: 'Avg Rating', value: '4.8 ★', color: 'text-tertiary' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
              <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">{stat.label}</p>
              <p className={`font-headline-sm text-headline-sm font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-2 mb-space-lg border-b border-outline-variant/30">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 font-label-lg text-label-lg uppercase tracking-wider whitespace-nowrap transition-all border-b-2 -mb-px ${activeTab === tab ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Earnings Chart */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-space-md">Monthly Earnings</h3>
              <div className="flex items-end gap-4 h-40">
                {EARNINGS_DATA.map(d => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">₹{(d.amount/1000).toFixed(1)}k</span>
                    <div className="w-full bg-primary/10 rounded-t-lg relative overflow-hidden" style={{ height: `${(d.amount / maxEarning) * 120}px` }}>
                      <div className="absolute inset-0 bg-primary/80 rounded-t-lg"></div>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Quick Actions */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-space-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-space-md">Quick Actions</h3>
              {[
                { icon: 'add_circle', label: 'List a New Outfit', to: '/list-outfit' },
                { icon: 'explore', label: 'Browse Archive', to: '/explore' },
                { icon: 'person', label: 'Edit Profile', to: '/profile' },
                { icon: 'help', label: 'Lender Support', to: '/trust-safety' },
              ].map(a => (
                <Link key={a.label} to={a.to} className="flex items-center gap-space-md p-3 rounded-lg hover:bg-surface-container transition-colors group">
                  <span className="material-symbols-outlined text-primary text-[20px]">{a.icon}</span>
                  <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">{a.label}</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] ml-auto group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'My Listings' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {MY_LISTINGS.map(listing => (
              <div key={listing.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={listing.img} alt={listing.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider ${listing.status === 'Active' ? 'bg-[#eaf3ed] text-[#2c583b]' : 'bg-surface-container text-on-surface-variant'}`}>
                    {listing.status}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface font-semibold">{listing.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{listing.tag}</p>
                  </div>
                  <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                    <span>{listing.rentals} rentals completed</span>
                    <span className="font-title-sm text-title-sm text-emerald-700 font-bold">₹{listing.earned.toLocaleString()} earned</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/outfit/${listing.id}`} className="flex-1 bg-surface-container text-on-surface py-2 rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high transition-all text-center">View</Link>
                    <button className="flex-1 bg-primary-container text-on-primary py-2 rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-all">Edit</button>
                  </div>
                </div>
              </div>
            ))}
            <Link to="/list-outfit" className="border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-10 gap-3 text-on-surface-variant hover:border-primary hover:text-primary transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[40px]">add_circle</span>
              <span className="font-label-lg text-label-lg uppercase tracking-wider">Add New Outfit</span>
            </Link>
          </div>
        )}

        {activeTab === 'Active Rentals' && (
          <div className="space-y-space-md">
            {ACTIVE_RENTALS.map(rental => (
              <div key={rental.id} className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                <div className="space-y-1">
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold">{rental.outfit}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Rented to: {rental.renter} · {rental.from} – {rental.to}</p>
                </div>
                <div className="flex items-center gap-space-md">
                  <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider ${rental.status === 'In Transit' ? 'bg-secondary-container text-on-secondary-container' : 'bg-[#eaf3ed] text-[#2c583b]'}`}>
                    {rental.status}
                  </span>
                  <span className="font-title-sm text-title-sm text-primary font-bold">₹{rental.amount}</span>
                </div>
              </div>
            ))}
            {ACTIVE_RENTALS.length === 0 && (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant">inbox</span>
                <p className="font-headline-sm text-headline-sm text-on-surface-variant mt-4">No active rentals</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Earnings' && (
          <div className="space-y-space-lg">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-4">Earnings Breakdown</h3>
              <div className="space-y-3">
                {MY_LISTINGS.map(l => (
                  <div key={l.id} className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                    <div>
                      <p className="font-title-sm text-title-sm text-on-surface">{l.title}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{l.rentals} rentals × avg ₹{Math.round(l.earned/l.rentals)}/rental</p>
                    </div>
                    <div className="text-right">
                      <p className="font-title-md text-title-md text-emerald-700 font-bold">₹{l.earned.toLocaleString()}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Gross earnings</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="font-title-md text-title-md text-on-surface font-bold">Total (After 20% Platform Fee)</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹{Math.round(totalEarned * 0.8).toLocaleString()}</span>
              </div>
            </div>
            <div className="bg-primary p-6 rounded-xl text-on-primary flex items-center justify-between gap-space-md">
              <div>
                <p className="font-label-md text-label-md uppercase tracking-wider text-primary-fixed-dim">Next Payout</p>
                <p className="font-headline-sm text-headline-sm font-bold">₹{Math.round(totalEarned * 0.08).toLocaleString()}</p>
                <p className="font-body-sm text-body-sm text-primary-fixed-dim">Scheduled: Nov 15, 2025</p>
              </div>
              <button className="bg-surface-container-lowest text-primary px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container transition-all">
                Withdraw Now
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {[
              { renter: 'Priya M.', rating: 5, text: 'The outfit was stunning and arrived perfectly pressed. Exactly as described!', date: 'Oct 28, 2025' },
              { renter: 'Neha K.', rating: 5, text: 'Super lender! Responded quickly and the emerald kurta was absolutely gorgeous.', date: 'Oct 15, 2025' },
              { renter: 'Ananya R.', rating: 4, text: 'Great condition, minor fit issue but overall a beautiful piece.', date: 'Sep 30, 2025' },
            ].map((review, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-0.5 text-tertiary">
                  {Array.from({length: review.rating}).map((_, j) => (
                    <span key={j} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-sm">
                      {review.renter.charAt(0)}
                    </div>
                    <span className="font-title-sm text-title-sm text-on-surface">{review.renter}</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
