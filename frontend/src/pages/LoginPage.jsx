import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 bg-surface min-h-screen flex items-center justify-center px-margin-mobile py-space-2xl">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-8 text-center relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary-container/40 blur-xl"></div>
            <div className="relative z-10">
              <h1 className="font-headline-sm text-headline-sm text-on-primary" style={{fontFamily:'Playfair Display,serif'}}>Welcome Back</h1>
              <p className="font-body-sm text-body-sm text-primary-fixed-dim mt-1">Sign in to your ReDrape archive</p>
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
              <div>
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">mail</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Password</label>
                  <a href="#" className="font-label-md text-label-md text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">lock</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">autorenew</span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-outline-variant/40"></div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">or</span>
              <div className="flex-1 h-px bg-outline-variant/40"></div>
            </div>

            {/* Demo login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setForm({ email: 'user@redrape.in', password: 'password123' }) }}
                className="px-4 py-2.5 bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high transition-all text-center"
              >
                Demo User
              </button>
              <button
                onClick={() => { setForm({ email: 'admin@redrape.in', password: 'admin123' }) }}
                className="px-4 py-2.5 bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high transition-all text-center"
              >
                Demo Admin
              </button>
            </div>

            <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
              New to ReDrape?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-space-lg mt-6 text-on-surface-variant font-label-sm text-label-sm">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">lock</span>256-bit SSL</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">verified_user</span>Secure Login</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">privacy_tip</span>GDPR Compliant</span>
        </div>
      </div>
    </div>
  )
}
