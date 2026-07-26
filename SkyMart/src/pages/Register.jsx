import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const result = register({ name, email, password })

    if (!result.success) {
      setError(result.message)
      return
    }

    toast.success('Account created! Welcome to SkyMart.')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b]  flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-8 rounded-xl bg-lime-400 flex items-center justify-center">
          <span className="text-black text-lg font-bold">⚡</span>
        </div>

        <h1 className="text-2xl font-bold">
          <span className="text-white">Sky</span>
          <span className="text-lime-400">Mart</span>
        </h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-[440px] bg-[#111111] border border-zinc-800 rounded-[28px] p-6">
        <h2 className="text-2xl font-bold text-white">Create account</h2>

        <p className="text-zinc-500 text-sm mt-2 mb-8">
          Join SkyMart and start shopping
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative mb-6">
            <User
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Full name"
              className="w-full bg-[#1d1d1d] border border-zinc-700 rounded-xl h-10 pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none focus:border-lime-400"
            />
          </div>

          {/* Email */}
          <div className="relative mb-6">
            <Mail
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Email address"
              className="w-full bg-[#1d1d1d] border border-zinc-700 rounded-xl h-10 pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none focus:border-lime-400"
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <Lock
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (min 6 chars)"
              className="w-full bg-[#1d1d1d] border border-zinc-700 rounded-xl h-10 pl-14 pr-14 text-white placeholder:text-zinc-500 outline-none focus:border-lime-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-8">
            <Lock
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              className="w-full bg-[#1d1d1d] border border-zinc-700 rounded-xl h-10 pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none focus:border-lime-400"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="w-full h-10 rounded-xl bg-lime-400 text-black font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition">
            Create Account
            <ArrowRight size={14} />
          </button>

          {error ? <p className="mt-4 text-center text-red-400">{error}</p> : null}
        </form>

        <p className="text-center text-zinc-500 mt-7 text-base">
          Already have an account?{' '}
          <Link to="/login" className="text-lime-400 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
