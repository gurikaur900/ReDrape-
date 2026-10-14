import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant pt-space-2xl pb-space-xl">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-space-2xl">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-medium">ReDrape</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
              The high-fashion circular archive. Rent prestigious designer occasionwear and recirculate coveted couture with pristine care and authentic craftsmanship.
            </p>
            <div className="pt-space-xs">
              <span className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                <span className="w-2 h-2 rounded-full bg-[#3B5E49]"></span>
                Verified Circular Fashion Pledge
              </span>
            </div>
          </div>

          {/* Archive Links */}
          <div className="md:col-span-2 space-y-space-sm">
            <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-semibold">The Archive</h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li className="hover:text-on-surface transition-colors"><Link to="/explore">All Occasions</Link></li>
              <li className="hover:text-on-surface transition-colors"><Link to="/explore?occasion=wedding">Bridal & Sangeet</Link></li>
              <li className="hover:text-on-surface transition-colors"><Link to="/explore?occasion=gala">Black Tie & Gala</Link></li>
              <li className="hover:text-on-surface transition-colors"><Link to="/explore">Designer Directory</Link></li>
            </ul>
          </div>

          {/* Circular Economy Links */}
          <div className="md:col-span-3 space-y-space-sm">
            <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-semibold">Circular Economy</h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li className="hover:text-on-surface transition-colors"><Link to="/trust-safety">The Rental Lifecycle</Link></li>
              <li className="hover:text-on-surface transition-colors"><Link to="/list-outfit">Lend & Consign</Link></li>
              <li className="hover:text-on-surface transition-colors"><Link to="/find-my-look">Style Consultation Quiz</Link></li>
              <li className="hover:text-on-surface transition-colors"><Link to="/trust-safety">Eco-Care & Pristine Standards</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-space-sm">
            <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-semibold">The Atelier Gazette</h4>
            <p className="font-body-sm text-body-sm leading-relaxed">
              Receive private showroom invitations, debut archive releases, and seasonal curation notes.
            </p>
            <div className="flex items-center gap-space-xs pt-space-xs">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
              />
              <button
                onClick={() => { alert('Subscribed!'); setEmail('') }}
                className="bg-primary text-on-primary px-4 py-2 font-label-sm text-label-sm uppercase tracking-wider rounded-lg hover:bg-primary-container transition-colors whitespace-nowrap"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-space-lg border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-md text-label-md">
          <p>© 2025 ReDrape Archive Technologies Inc. All rights reserved.</p>
          <div className="flex gap-space-lg">
            <Link to="/trust-safety" className="hover:text-on-surface transition-colors">Privacy Policy</Link>
            <Link to="/trust-safety" className="hover:text-on-surface transition-colors">Terms of Service</Link>
            <Link to="/trust-safety" className="hover:text-on-surface transition-colors">Insurance & Authenticity</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
