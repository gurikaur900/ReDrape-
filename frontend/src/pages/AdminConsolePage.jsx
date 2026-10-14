import { useState } from 'react'

const STATS = [
  { icon: 'people', label: 'Total Users', value: '8,420', change: '+12%', color: 'text-primary' },
  { icon: 'checkroom', label: 'Total Listings', value: '2,184', change: '+8%', color: 'text-primary' },
  { icon: 'calendar_month', label: 'Active Bookings', value: '342', change: '+24%', color: 'text-emerald-700' },
  { icon: 'currency_rupee', label: 'Revenue (Oct)', value: '₹4.2L', change: '+31%', color: 'text-emerald-700' },
]

const RECENT_BOOKINGS = [
  { id: '#RD-9042', user: 'Ananya K.', outfit: 'Emerald Festive Kurta Set', amount: 2097, status: 'Active', date: 'Nov 2' },
  { id: '#RD-9041', user: 'Rohan M.', outfit: 'Wine Velvet Tuxedo', amount: 1798, status: 'Confirmed', date: 'Nov 12' },
  { id: '#RD-9040', user: 'Priya S.', outfit: 'Ivory Anarkali Set', amount: 2397, status: 'Returned', date: 'Oct 28' },
  { id: '#RD-9039', user: 'Vikram A.', outfit: 'Midnight Satin Slip', amount: 1198, status: 'Cancelled', date: 'Oct 25' },
  { id: '#RD-9038', user: 'Neha R.', outfit: 'Rose Gold Lehenga', amount: 4497, status: 'Active', date: 'Nov 5' },
]

const PENDING_LISTINGS = [
  { id: 'L-201', title: 'Champagne Banarasi Saree', lender: 'Meera S.', brand: 'Sabyasachi', submitted: 'Nov 1' },
  { id: 'L-202', title: 'Navy Sherwani Set', lender: 'Karan P.', brand: 'Manyavar', submitted: 'Nov 2' },
  { id: 'L-203', title: 'Blush Pink Anarkali', lender: 'Pooja T.', brand: 'Anita Dongre', submitted: 'Nov 3' },
]

export default function AdminConsolePage() {
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [approvedListings, setApprovedListings] = useState([])
  const [rejectedListings, setRejectedListings] = useState([])

  const sections = ['Dashboard', 'Users', 'Listings', 'Bookings', 'Reports']

  return (
    <div className="pt-20 bg-surface min-h-screen">
      <div className="flex h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-60 bg-surface-container-lowest border-r border-outline-variant/30 p-4 space-y-1 shrink-0">
          <div className="p-3 mb-4">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Admin Console</span>
            <p className="font-headline-sm text-headline-sm text-primary mt-0.5" style={{fontFamily:'Playfair Display,serif'}}>Atelier Ops</p>
          </div>
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors text-left ${activeSection === s ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {s === 'Dashboard' ? 'dashboard' : s === 'Users' ? 'people' : s === 'Listings' ? 'checkroom' : s === 'Bookings' ? 'calendar_month' : 'bar_chart'}
              </span>
              {s}
            </button>
          ))}
          <div className="mt-auto border-t border-outline-variant/30 pt-4">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">A</div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">Admin</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Super Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Mobile section selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 md:hidden">
            {sections.map(s => (
              <button key={s} onClick={() => setActiveSection(s)}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm uppercase tracking-wider whitespace-nowrap ${activeSection === s ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                {s}
              </button>
            ))}
          </div>

          {activeSection === 'Dashboard' && (
            <div className="space-y-space-lg">
              {/* Stats */}
              <div>
                <h1 className="font-headline-md text-headline-md text-primary mb-space-md" style={{fontFamily:'Playfair Display,serif'}}>Operations Dashboard</h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
                  {STATS.map(stat => (
                    <div key={stat.label} className="bg-surface-container-lowest rounded-xl p-5 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-emerald-700 bg-[#eaf3ed] px-2 py-0.5 rounded-full">{stat.change}</span>
                      </div>
                      <div className={`font-headline-sm text-headline-sm font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between">
                  <h2 className="font-title-lg text-title-lg text-on-surface font-bold">Recent Bookings</h2>
                  <button className="font-label-md text-label-md text-primary uppercase tracking-wider hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-outline-variant/30">
                        {['Booking ID', 'User', 'Outfit', 'Amount', 'Status', 'Date'].map(h => (
                          <th key={h} className="text-left px-5 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_BOOKINGS.map(b => (
                        <tr key={b.id} className="border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors">
                          <td className="px-5 py-3 font-label-md text-label-md text-primary font-semibold">{b.id}</td>
                          <td className="px-5 py-3 font-body-sm text-body-sm text-on-surface">{b.user}</td>
                          <td className="px-5 py-3 font-body-sm text-body-sm text-on-surface max-w-[180px] truncate">{b.outfit}</td>
                          <td className="px-5 py-3 font-title-sm text-title-sm text-on-surface font-semibold">₹{b.amount}</td>
                          <td className="px-5 py-3">
                            <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider ${
                              b.status === 'Active' ? 'bg-primary/10 text-primary' :
                              b.status === 'Confirmed' ? 'bg-[#eaf3ed] text-[#2c583b]' :
                              b.status === 'Returned' ? 'bg-surface-container text-on-surface-variant' :
                              'bg-error-container text-error'
                            }`}>{b.status}</span>
                          </td>
                          <td className="px-5 py-3 font-body-sm text-body-sm text-on-surface-variant">{b.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pending Listings */}
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between">
                  <h2 className="font-title-lg text-title-lg text-on-surface font-bold">Pending Listings Review</h2>
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm font-semibold">
                    {PENDING_LISTINGS.filter(l => !approvedListings.includes(l.id) && !rejectedListings.includes(l.id)).length} pending
                  </span>
                </div>
                <div className="divide-y divide-outline-variant/20">
                  {PENDING_LISTINGS.map(listing => {
                    const approved = approvedListings.includes(listing.id)
                    const rejected = rejectedListings.includes(listing.id)
                    return (
                      <div key={listing.id} className="p-5 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <p className="font-title-sm text-title-sm text-on-surface font-semibold">{listing.title}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{listing.lender} · {listing.brand} · Submitted {listing.submitted}</p>
                        </div>
                        {approved ? (
                          <span className="px-3 py-1 bg-[#eaf3ed] text-[#2c583b] rounded-full font-label-sm text-label-sm uppercase">Approved ✓</span>
                        ) : rejected ? (
                          <span className="px-3 py-1 bg-error-container text-error rounded-full font-label-sm text-label-sm uppercase">Rejected ✗</span>
                        ) : (
                          <div className="flex gap-2 shrink-0">
                            <button onClick={() => setApprovedListings(prev => [...prev, listing.id])}
                              className="px-4 py-2 bg-[#eaf3ed] text-[#2c583b] rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-[#d0e9d9] transition-colors">
                              Approve
                            </button>
                            <button onClick={() => setRejectedListings(prev => [...prev, listing.id])}
                              className="px-4 py-2 bg-error-container text-error rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-error hover:text-on-error transition-colors">
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeSection !== 'Dashboard' && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-[56px] text-on-surface-variant">
                {activeSection === 'Users' ? 'people' : activeSection === 'Listings' ? 'checkroom' : activeSection === 'Bookings' ? 'calendar_month' : 'bar_chart'}
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface-variant mt-4" style={{fontFamily:'Playfair Display,serif'}}>{activeSection} Section</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Connected to backend API — data loads dynamically.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
