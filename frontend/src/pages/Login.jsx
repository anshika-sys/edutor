import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

export default function Login() {
    const [form, setForm] = useState({ identifier: '', password: '' })
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(''); setLoading(true)
        try {
            await login(form.identifier, form.password)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        } finally { setLoading(false) }
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
            <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="glass rounded-3xl p-10 w-full max-w-md mx-4 shadow-2xl shadow-purple-900/30 relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">EDUTOR</h1>
                    <p className="text-white/60 mt-2 text-sm">Welcome back! Sign in to continue learning.</p>
                </div>
                {error && <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 mb-5 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11" placeholder="Username or Email"
                            value={form.identifier} onChange={e => setForm({ ...form, identifier: e.target.value })} required />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11 pr-11" type={showPass ? 'text' : 'password'} placeholder="Password"
                            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                            {showPass ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-white/60 cursor-pointer">
                            <input type="checkbox" className="accent-purple-500" /> Remember me
                        </label>
                        <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300">Forgot Password?</Link>
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
                        className="gradient-btn w-full text-center disabled:opacity-60">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </motion.button>
                </form>
                <p className="text-center text-white/50 text-sm mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium">Sign Up</Link>
                </p>
            </motion.div>
        </div>
    )
}
