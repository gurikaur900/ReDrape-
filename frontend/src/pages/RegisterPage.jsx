import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'borrower', agree: false })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (!form.agree) { setError('Please accept the terms to continue.'); return }
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password, role: form.role })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = () => {
    const p = form.password
    if (!p) return { label: '', color: '', width: '0%' }
    if (p.length < 6) return { label: 'Weak', color: 'bg-error', width: '25%' }
    if (p.length < 10) return { label: 'Fair', color: 'bg-tertiary', width: '50%' }
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Good', color: 'bg-primary', width: '75%' }
    return { label: 'Strong', color: 'bg-emerald-600', width: '100%' }
  }

  const strength = passwordStrength()

  return (
    <div className="pt-20 bg-surface min-h-screen flex items-center justify-center px-margin-mobile py-space-2xl">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-8 text-center relative overflow-hidden">
            <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-primary-container/40 blur-xl"></div>
            <div className="relative z-10">
              <h1 className="font-headline-sm text-headline-sm text-on-primary" style={{fontFamily:'Playfair Display,serif'}}>Join ReDrape</h1>
              <p className="font-body-sm text-body-sm text-primary-fixed-dim mt-1">Access the circular occasionwear archive</p>
            </div>
          </div>

          <div className="p-8 space-y-space-md">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-error-container text-error rounded-lg font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-space-md">
              {/* Account type */}
              <div>
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-2">I want to...</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setForm({...form, role: 'borrower'})}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${form.role === 'borrower' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/40'}`}>
                    <span className="material-symbols-outlined text-primary text-[22px]">checkroom</span>
                    <p className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">Rent Outfits</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Browse & book looks</p>
                  </button>
                  <button type="button" onClick={() => setForm({...form, role: 'lender'})}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${form.role === 'lender' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/40'}`}>
                    <span className="material-symbols-outlined text-primary text-[22px]">sell</span>
                    <p className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">List & Earn</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Monetise wardrobe</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">person</span>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your full name" />
                </div>
              </div>

              <div>
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">mail</span>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="you@example.com" />
                </div>
              </div>

              <div>
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">lock</span>
                  <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Min. 8 characters" />
                </div>
                {form.password && (
                  <div className="mt-1.5 space-y-1">
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} rounded-full transition-all duration-500`} style={{width: strength.width}}></div>
                    </div>
                    <span className={`font-label-sm text-label-sm ${strength.color.replace('bg-', 'text-')}`}>{strength.label} password</span>
                  </div>
                )}
              </div>

              <div>
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Confirm Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">lock</span>
                  <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} required
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Re-enter password" />
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.agree} onChange={e => setForm({...form, agree: e.target.checked})}
                  className="mt-0.5 accent-primary rounded" />
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  I agree to the{' '}
                  <Link to="/trust-safety" className="text-primary hover:underline">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/trust-safety" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button type="submit" disabled={loading}
                className="w-full bg-primary text-on-primary py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? (
                  <><span className="material-symbols-outlined text-[18px] animate-spin">autorenew</span>Creating Account...</>
                ) : (
                  <><span className="material-symbols-outlined text-[18px]">person_add</span>Create Account</>
                )}
              </button>
            </form>

            <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
              Already a member?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
