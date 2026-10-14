import { Link } from 'react-router-dom'

const TRUST_PILLARS = [
  {
    icon: 'verified_user',
    title: 'Verified Lenders & Authenticity',
    content: [
      'Every garment undergoes a multi-point authenticity check before listing.',
      'Real government ID and phone verification for all community members.',
      'Designer piece authentication by our in-house atelier specialists.',
      'Fraud protection with secure payment escrow for all transactions.',
    ],
  },
  {
    icon: 'wash',
    title: '5-Point Bio-Ozone Sanitization',
    content: [
      'Eco-certified hospital-grade ozone cleaning between every single booking.',
      'Hand-pressed and lint-rolled by trained atelier staff after cleaning.',
      'Hermetically sealed in sustainable breathable garment bags.',
      'Third-party hygiene certificate provided with every delivery.',
    ],
  },
  {
    icon: 'shield',
    title: '₹10,000 Complimentary Damage Cover',
    content: [
      'Minor spills, zipper snags, and seam splits are covered at zero cost.',
      'Protection active from the moment the outfit leaves the lender.',
      'Claims processed within 48 hours with direct bank transfer settlement.',
      'No excess or hidden deductions for borrowers or lenders.',
    ],
  },
  {
    icon: 'local_shipping',
    title: 'White-Glove Delivery & Return',
    content: [
      'Express delivery arrives 24–48 hours before your event date.',
      'Pre-paid return courier bag included in every rental package.',
      'Contactless handoff protocols available on request.',
      'Real-time tracking from atelier to your doorstep.',
    ],
  },
  {
    icon: 'privacy_tip',
    title: 'Data Privacy & Security',
    content: [
      'End-to-end encrypted payment processing via PCI-DSS compliant gateways.',
      'Personal data never sold or shared with third-party advertisers.',
      'GDPR-aligned privacy practices with full data deletion rights.',
      'Two-factor authentication for all account access.',
    ],
  },
  {
    icon: 'support_agent',
    title: 'Concierge Customer Support',
    content: [
      'Dedicated style concierge available via chat, email, and phone.',
      '24/7 emergency support line for event-day crises.',
      'Full refund within 4 hours if outfit quality doesn\'t match listing.',
      'Free reschedule up to 48 hours before your booking date.',
    ],
  },
]

const FAQS = [
  { q: 'What if the outfit doesn\'t fit?', a: 'We offer a free size exchange or full refund if the outfit doesn\'t match the listed measurements. Our fit guarantee ensures you\'re never left without a look.' },
  { q: 'How does cleaning work?', a: 'ReDrape handles all cleaning. You never need to wash or dry-clean the outfit. Simply return it in the provided courier bag and our atelier team takes care of everything.' },
  { q: 'What if something is damaged during my rental?', a: 'Minor damage (spills, tears under 2cm) is covered by our complimentary ₹10,000 damage cover. For major damage, our team will assess and the borrower pays only excess beyond cover.' },
  { q: 'How are lenders verified?', a: 'Every lender undergoes a KYC process including government ID verification and phone authentication. Designer garments are physically inspected by our atelier before going live.' },
  { q: 'Can I buy an outfit I rented?', a: 'Yes! If a lender has enabled "Buy It Now", you can purchase the outfit at the listed buy price minus the rental amount you\'ve already paid.' },
  { q: 'When will I receive my refundable deposit?', a: 'Security deposits are refunded within 48 hours of the outfit\'s confirmed return in satisfactory condition.' },
]

export default function TrustSafetyPage() {
  return (
    <div className="pt-20 bg-surface min-h-screen">
      {/* Hero */}
      <section className="w-full bg-surface-container-low py-space-2xl relative overflow-hidden">
        <div className="absolute -right-20 top-0 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin relative z-10">
          <div className="max-w-2xl space-y-space-md">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Couture Care Guarantee</span>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight" style={{fontFamily:'Playfair Display,serif'}}>Trust & Safety at Every Step</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              From the moment you place a reservation to the second the outfit is returned, ReDrape's multi-layer protection system ensures peace of mind for every borrower and lender.
            </p>
            <div className="flex flex-wrap gap-space-md pt-2">
              {[
                { icon: 'verified', text: '100% Authentic' },
                { icon: 'shield', text: '₹10K Cover' },
                { icon: 'wash', text: 'Bio-Cleaned' },
                { icon: 'support_agent', text: '24/7 Support' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-space-xs bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm font-label-md text-label-md text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px]">{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="w-full py-space-2xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-space-xl">
          <div className="text-center">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Our Six Commitments</span>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>The ReDrape Protection Framework</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {TRUST_PILLARS.map(pillar => (
              <div key={pillar.title} className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">{pillar.icon}</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{pillar.title}</h3>
                <ul className="space-y-2">
                  {pillar.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-emerald-700 text-[16px] mt-0.5 shrink-0">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="w-full py-space-2xl bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-space-xl">
          <div className="text-center">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">The Lifecycle</span>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>How Your Outfit Travels</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-[2px] bg-outline-variant/40 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-gutter relative z-10">
              {[
                { icon: 'inventory_2', step: '01', title: 'Stored Safely', desc: 'Outfit stored in climate-controlled atelier vault until booking.' },
                { icon: 'verified', step: '02', title: 'Inspected', desc: 'Hand-inspected for condition before every dispatch.' },
                { icon: 'wash', step: '03', title: 'Bio-Cleaned', desc: 'Ozone + steam sanitized and hermetically sealed.' },
                { icon: 'local_shipping', step: '04', title: 'Delivered', desc: 'Express white-glove delivery 24–48hrs before event.' },
                { icon: 'autorenew', step: '05', title: 'Returned', desc: 'Prepaid courier return. No washing required from you.' },
              ].map(s => (
                <div key={s.step} className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-primary border-2 border-outline-variant/30">
                    <span className="material-symbols-outlined text-[26px]">{s.icon}</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">{s.step}</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">{s.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="w-full py-space-2xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="text-center mb-space-xl">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Common Questions</span>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-space-sm">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
          <div className="text-center mt-space-xl">
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">Still have questions? Our concierge team is here.</p>
            <div className="flex flex-wrap items-center justify-center gap-space-md">
              <a href="mailto:support@redrape.in" className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-sm">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Email Support
              </a>
              <a href="tel:+918000000000" className="flex items-center gap-2 bg-surface-container text-on-surface px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container-high transition-all">
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call Concierge
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-low transition-colors"
      >
        <span className="font-title-sm text-title-sm text-on-surface font-semibold pr-4">{question}</span>
        <span className={`material-symbols-outlined text-on-surface-variant text-[22px] shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
