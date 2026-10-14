import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const QUIZ_STEPS = [
  {
    question: 'What occasion are you dressing for?',
    subtitle: 'Pick the event type that matches your upcoming milestone.',
    options: [
      { icon: 'celebration', label: 'Wedding / Sangeet' },
      { icon: 'school', label: 'Farewell / Graduation' },
      { icon: 'work', label: 'Interview / Formal' },
      { icon: 'local_bar', label: 'Party / Cocktail' },
      { icon: 'festival', label: 'Festive / Diwali' },
      { icon: 'photo_camera', label: 'Photoshoot' },
    ],
  },
  {
    question: "What's your preferred style aesthetic?",
    subtitle: "We'll match you with the most fitting archive pieces.",
    options: [
      { icon: 'diamond', label: 'Royal & Traditional' },
      { icon: 'style', label: 'Contemporary Fusion' },
      { icon: 'auto_awesome', label: 'Minimal & Clean' },
      { icon: 'star', label: 'Glamorous & Bold' },
      { icon: 'palette', label: 'Artistic & Avant-garde' },
      { icon: 'spa', label: 'Soft & Ethereal' },
    ],
  },
  {
    question: "What's your preferred colour palette?",
    subtitle: 'Select the tones that resonate with your vision.',
    options: [
      { icon: 'circl
        
    e', label: 'Jewel Tones (Emerald, Sapphire)', color: '#1b4332' },
      { icon: 'circle', label: 'Neutrals (Ivory, Cream, Beige)', color: '#c9a96e' },
      { icon: 'circle', label: 'Pastels (Lilac, Blush, Powder)', color: '#e8b4b8' },
      { icon: 'circle', label: 'Darks (Navy, Midnight, Burgundy)', color: '#500519' },
      { icon: 'circle', label: 'Metallics (Gold, Silver, Bronze)', color: '#b5a642' },
      { icon: 'circle', label: 'Brights (Red, Fuchsia, Orange)', color: '#c0392b' },
    ],
  },
  {
    question: "What's your size & fit preference?",
    subtitle: "We'll filter for pieces that will drape perfectly on you.",
    options: [
      { icon: 'straighten', label: 'XS (32–34)' },
      { icon: 'straighten', label: 'S (34–36)' },
      { icon: 'straighten', label: 'M (36–38)' },
      { icon: 'straighten', label: 'L (38–40)' },
      { icon: 'straighten', label: 'XL (40–42)' },
      { icon: 'straighten', label: 'Custom / Plus Size' },
    ],
  },
  {
    question: "What's your rental budget per day?",
    subtitle: 'All prices include dry-cleaning, delivery & damage cover.',
    options: [
      { icon: 'currency_rupee', label: 'Under ₹500' },
      { icon: 'currency_rupee', label: '₹500 – ₹999' },
      { icon: 'currency_rupee', label: '₹1,000 – ₹1,999' },
      { icon: 'currency_rupee', label: '₹2,000 – ₹3,499' },
      { icon: 'currency_rupee', label: '₹3,500+' },
      { icon: 'currency_rupee', label: 'Flexible / Surprise me' },
    ],
  },
]

const RECOMMENDED = [
  { id: '1', title: 'Emerald Festive Silk Set', brand: 'Raw Mango', rentalPrice: 699, rating: 4.8, match: 98, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBza4R7PX_MJeHd2pC5atxfLB8KqZITdI_od1IewiE_QUgth-HsH3crdlU2DfbHKaaXzI5POCzAx7hfxs6l-xv6aH3_uVdQVbp6UF2BaRgxGWCCvv0DR9-vh1fECofleBlidv5AZoLFT0KNunk18N3ExhPUoGcFq0_46BY0G7wvjFS5T-GpWkQmqm5Wlgc-SFglXh-123Jz7Spe-4l24fZ679EnMRZf6OeJkDsI-Vyc8uOJEH9eo_Rs' },
  { id: '3', title: 'Ivory Anarkali Set', brand: 'Anita Dongre', rentalPrice: 799, rating: 5.0, match: 95, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxIZnY8Z8OqYzMZAb1hr0-GXyDIpC8_K7lnleFMtPg-Wu-lYoAwHUD88XVCbJtqPfhsWI2ETRWvyGB9WSE8uhhgBsK76fd7Ydh3BQfKaOOJMTLc06HNPk5PV4SXioTpLwuxtapQhPIr1E7QuqJ-93aCsrMRt8TnKRV7prMEeAKXGgtsgulMvRoBxytv4YAw4Rw6H0v9EIU4GRfBsR0VYnw-s9pkoJdkWw8JUdoLaPM26Ff5qkGTOzW' },
  { id: '6', title: 'Pastel Organza Saree', brand: 'Sabyasachi', rentalPrice: 899, rating: 4.8, match: 91, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4DxcRnYOAqyEMx7u6i2h5-RD6UDLdNZqRRPgM70KJgoIl4E3PA_id12QxFwtFfWhA9lI-6SX667FQLUZy-yBA-LToJGxjCSfTs37QKnuV08YdIHHaPuVpP3dgXzsypOwlNIw1ymE0O6V6hZve-S64t3k77yoiqNMbiPPfgQ1YckTtFmd_Ud9fX0Uv-6JOxSdFHtY5q7REKUvs9nKip-TY2q0n1HWlm0jU1GfM5TkcckGjzvTigfrx' },
]

export default function FindMyLookPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [completed, setCompleted] = useState(false)

  const handleSelect = (option) => {
    const newAnswers = { ...answers, [step]: option }
    setAnswers(newAnswers)
    if (step < QUIZ_STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 300)
    } else {
      setTimeout(() => setCompleted(true), 300)
    }
  }

  const resetQuiz = () => {
    setStep(0)
    setAnswers({})
    setCompleted(false)
  }

  const progress = ((step) / QUIZ_STEPS.length) * 100

  if (completed) {
    return (
      <div className="pt-20 bg-surface min-h-screen">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-2xl">
          <div className="text-center mb-space-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaf3ed] text-[#2c583b] font-label-md text-label-md mb-4">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              Your style DNA has been decoded
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight" style={{fontFamily:'Playfair Display,serif'}}>Your Curated Looks Are Ready</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-lg mx-auto">
              Based on your preferences, we've handpicked {RECOMMENDED.length} archive pieces with the highest style compatibility scores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter mb-space-xl">
            {RECOMMENDED.map((outfit) => (
              <div key={outfit.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={outfit.img} alt={outfit.title} />
                  <div className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider shadow-md">
                    {outfit.match}% Match
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary">{outfit.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{outfit.brand}</p>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="font-title-lg text-title-lg text-primary font-bold">₹{outfit.rentalPrice} <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ day</span></div>
                    <div className="flex items-center gap-0.5 text-tertiary">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-label-md text-label-md font-bold">{outfit.rating}</span>
                    </div>
                  </div>
                  <Link to={`/outfit/${outfit.id}`} className="block w-full bg-primary text-on-primary py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all text-center">
                    View & Reserve
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <p className="font-body-md text-body-md text-on-surface-variant">Not seeing your vibe?</p>
            <div className="flex flex-wrap items-center justify-center gap-space-md">
              <button onClick={resetQuiz} className="bg-surface-container text-on-surface px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container-high transition-all">
                Retake Quiz
              </button>
              <Link to="/explore" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all">
                Browse All Outfits
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = QUIZ_STEPS[step]

  return (
    <div className="pt-20 bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-2xl">
        {/* Header */}
        <div className="text-center mb-space-xl">
          <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-semibold">Personal Style Intelligence</span>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1" style={{fontFamily:'Playfair Display,serif'}}>Find My Look Quiz</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">5 quick questions to your perfect curated look</p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-space-xl">
          <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant mb-2">
            <span>Question {step + 1} of {QUIZ_STEPS.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question */}
        <div className="max-w-2xl mx-auto text-center mb-space-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface" style={{fontFamily:'Playfair Display,serif'}}>{currentQ.question}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">{currentQ.subtitle}</p>
        </div>

        {/* Options */}
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-space-md">
          {currentQ.options.map((option) => (
            <button
              key={option.label}
              onClick={() => handleSelect(option.label)}
              className={`p-6 rounded-xl border-2 transition-all hover:border-primary hover:shadow-md text-left space-y-2 ${
                answers[step] === option.label
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-outline-variant bg-surface-container-lowest'
              }`}
            >
              {option.color ? (
                <div className="w-10 h-10 rounded-full border-2 border-outline-variant/30" style={{ backgroundColor: option.color }}></div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">{option.icon}</span>
                </div>
              )}
              <p className="font-title-sm text-title-sm text-on-surface">{option.label}</p>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="max-w-3xl mx-auto mt-space-xl flex items-center justify-between">
          <button
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
            className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </button>
          <div className="flex gap-2">
            {QUIZ_STEPS.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-primary w-6' : i < step ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
            ))}
          </div>
          <button
            onClick={() => step < QUIZ_STEPS.length - 1 ? setStep(step + 1) : setCompleted(true)}
            className="flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
          >
            Skip
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  )
}
