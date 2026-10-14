import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const MEMBER_STATS = { rentals: 12, listings: 3, saved: 34200, rating: 4.8, wishlist: 8, reviews: 24 }

export default function MemberProfilePage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('Profile')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || 'Ananya Kapoor',
    email: user?.email || 'ananya@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    bust: '34', waist: '28', hips: '36', height: '165',
    bio: 'Fashion enthusiast and sustainability advocate. I love discovering unique designer pieces for special occasions.',
  })

  const tabs = ['Profile', 'Fit Passport', 'Rental History', 'Settings']

  return (
    <div className="pt-20 bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-xl">
        {/* Profile Header */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden mb-space-xl">
          <div className="h-32 bg-gradient-to-r from-primary to-primary-container relative">
            <div className="absolute -bottom-12 left-6 md:left-10">
              <div className="w-24 h-24 rounded-full border-4 border-surface-container-lowest bg-secondary-container flex items-center justify-center text-primary font-bold text-3xl shadow-lg">
                {(user?.name || 'A').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          <div className="pt-14 pb-6 px-6 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-headline-sm text-headline-sm text-on-surface" style={{fontFamily:'Playfair Display,serif'}}>{form.name}</h1>
                <span className="px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm uppercase tracking-wider">Trusted Member</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{form.city} · Member since Jan 2024</p>
              <div className="flex items-center gap-0.5 text-tertiary mt-1">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: `'FILL' ${i <= 4 ? 1 : 0}` }}>star</span>
                ))}
                <span className="font-body-sm text-body-sm text-on-surface-variant ml-1">{MEMBER_STATS.rating} ({MEMBER_STATS.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <button onClick={() => setEditing(!editing)} className="flex items-center gap-2 px-5 py-2.5 bg-surface-container text-on-surface rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container-high transition-all">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
              <button onClick={logout} className="flex items-center gap-2 px-5 py-2.5 bg-error-container text-on-error-container rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-error hover:text-on-error transition-all">
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Logout
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 md:grid-cols-6 border-t border-outline-variant/30 divide-x divide-outline-variant/30">
            {[
              { label: 'Rentals', value: MEMBER_STATS.rentals },
              { label: 'Listings', value: MEMBER_STATS.listings },
              { label: 'Saved', value: `₹${(MEMBER_STATS.saved/1000).toFixed(0)}k` },
              { label: 'Wishlist', value: MEMBER_STATS.wishlist },
              { label: 'Reviews', value: MEMBER_STATS.reviews },
              { label: 'Rating', value: `${MEMBER_STATS.rating}★` },
            ].map(stat => (
              <div key={stat.label} className="p-4 text-center">
                <div className="font-headline-sm text-headline-sm text-primary font-bold">{stat.value}</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-2 mb-space-lg border-b border-outline-variant/30">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 font-label-lg text-label-lg uppercase tracking-wider whitespace-nowrap transition-all border-b-2 -mb-px ${activeTab === tab ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'Profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-space-md">
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Phone Number', key: 'phone', type: 'tel' },
                  { label: 'City', key: 'city', type: 'text' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">{field.label}</label>
                    {editing ? (
                      <input type={field.type} value={form[field.key]} onChange={e => setForm({...form, [field.key]: e.target.value})}
                        className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                    ) : (
                      <p className="font-body-md text-body-md text-on-surface py-2.5">{form[field.key]}</p>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Bio</label>
                {editing ? (
                  <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3}
                    className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                ) : (
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{form.bio}</p>
                )}
              </div>
              {editing && (
                <button onClick={() => setEditing(false)} className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-sm">
                  Save Changes
                </button>
              )}
            </div>
            <div className="space-y-space-md">
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-3">
                <h4 className="font-title-md text-title-md text-on-surface font-bold">Quick Links</h4>
                {[
                  { icon: 'checkroom', label: 'My Wardrobe', to: '/my-wardrobe' },
                  { icon: 'favorite', label: 'Wishlist', to: '/wishlist' },
                  { icon: 'add_circle', label: 'List New Outfit', to: '/list-outfit' },
                  { icon: 'quiz', label: 'Style Quiz', to: '/find-my-look' },
                ].map(link => (
                  <Link key={link.label} to={link.to} className="flex items-center gap-space-sm p-3 rounded-lg hover:bg-surface-container transition-colors group">
                    <span className="material-symbols-outlined text-primary text-[20px]">{link.icon}</span>
                    <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">{link.label}</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[16px] ml-auto group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fit Passport Tab */}
        {activeTab === 'Fit Passport' && (
          <div className="max-w-2xl space-y-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-space-md">
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Your Fit Passport</h3>
                <span className="px-3 py-1 bg-[#eaf3ed] text-[#2c583b] rounded-full font-label-sm text-label-sm uppercase tracking-wider">Verified</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Your saved measurements help lenders confirm fit compatibility before confirming bookings.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md">
                {[
                  { label: 'Bust', key: 'bust', unit: 'in' },
                  { label: 'Waist', key: 'waist', unit: 'in' },
                  { label: 'Hips', key: 'hips', unit: 'in' },
                  { label: 'Height', key: 'height', unit: 'cm' },
                ].map(m => (
                  <div key={m.key} className="bg-surface-container-low rounded-xl p-4 text-center space-y-1">
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">{m.label}</label>
                    {editing ? (
                      <input type="number" value={form[m.key]} onChange={e => setForm({...form, [m.key]: e.target.value})}
                        className="w-full text-center bg-transparent font-headline-sm text-headline-sm text-primary font-bold focus:outline-none" />
                    ) : (
                      <div className="font-headline-sm text-headline-sm text-primary font-bold">{form[m.key]}</div>
                    )}
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{m.unit}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setEditing(!editing)} className="mt-space-md flex items-center gap-2 text-primary font-label-md text-label-md hover:underline uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                {editing ? 'Save Measurements' : 'Update Measurements'}
              </button>
            </div>
          </div>
        )}

        {/* Rental History Tab */}
        {activeTab === 'Rental History' && (
          <div className="space-y-space-md">
            {[
              { outfit: 'Emerald Festive Kurta Set', date: 'Oct 14-17, 2025', amount: 2097, status: 'Returned', rating: 5 },
              { outfit: 'Midnight Satin Slip', date: 'Sep 28-30, 2025', amount: 1198, status: 'Returned', rating: 5 },
              { outfit: 'Ivory Anarkali Set', date: 'Aug 15-18, 2025', amount: 2397, status: 'Returned', rating: 4 },
            ].map((rental, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                <div className="space-y-1">
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold">{rental.outfit}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{rental.date}</p>
                  <div className="flex items-center gap-0.5 text-tertiary">
                    {Array.from({length: rental.rating}).map((_,j)=>(
                      <span key={j} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-space-md">
                  <span className="px-3 py-1 bg-[#eaf3ed] text-[#2c583b] rounded-full font-label-sm text-label-sm uppercase tracking-wider">{rental.status}</span>
                  <span className="font-title-md text-title-md text-on-surface font-bold">₹{rental.amount}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'Settings' && (
          <div className="max-w-xl space-y-space-md">
            {[
              { title: 'Email Notifications', desc: 'New booking requests, rental updates, payout alerts', enabled: true },
              { title: 'SMS Alerts', desc: 'Delivery tracking and event reminders', enabled: true },
              { title: 'Marketing Emails', desc: 'New archive drops and seasonal curation', enabled: false },
              { title: 'Two-Factor Authentication', desc: 'Secure your account with OTP verification', enabled: false },
            ].map((setting, i) => (
              <ToggleSetting key={i} {...setting} />
            ))}
            <div className="pt-4">
              <button className="text-error font-label-md text-label-md uppercase tracking-wider hover:underline flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                Delete My Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ToggleSetting({ title, desc, enabled: initialEnabled }) {
  const [enabled, setEnabled] = useState(initialEnabled)
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex items-center justify-between gap-space-md">
      <div>
        <p className="font-title-sm text-title-sm text-on-surface font-semibold">{title}</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{desc}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-7' : 'translate-x-1'}`}></div>
      </button>
    </div>
  )
}
