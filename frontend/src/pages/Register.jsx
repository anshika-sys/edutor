import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', gender: '', phone: '', role: 'Student', password: '', confirmPassword: '' })
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const validate = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email format'
        if (form.password.length < 8) return 'Password must be at least 8 characters'
        if (!/^\d+$/.test(form.phone)) return 'Phone number must be numeric'
        if (form.password !== form.confirmPassword) return 'Passwords do not match'
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const err = validate()
        if (err) return setError(err)
        setError(''); setLoading(true)
        try {
            await register(form)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed')
        } finally { setLoading(false) }
    }

    const set = f => e => setForm({ ...form, [f]: e.target.value })

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center relative overflow-hidden py-10">
            <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
            <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="glass rounded-3xl p-10 w-full max-w-md mx-4 shadow-2xl shadow-purple-900/30 relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">EDUTOR</h1>
                    <p className="text-white/60 mt-2 text-sm">Create your account and start learning.</p>
                </div>
                {error && <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 mb-5 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11" placeholder="Username" value={form.username} onChange={set('username')} required />
                    </div>
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11" type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <select className="input-glass" value={form.gender} onChange={set('gender')} required style={{ background: 'rgba(15,15,26,0.9)' }}>
                            <option value="" disabled>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <select className="input-glass" value={form.role} onChange={set('role')} style={{ background: 'rgba(15,15,26,0.9)' }}>
                            <option value="Student">Student</option>
                            <option value="Working Professional">Working Professional</option>
                            <option value="Teacher">Teacher</option>
                        </select>
                    </div>
                    <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11" placeholder="Phone Number" value={form.phone} onChange={set('phone')} required />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11 pr-11" type={showPass ? 'text' : 'password'}
                            placeholder="Password (min 8 chars)" value={form.password} onChange={set('password')} required />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                            {showPass ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11" type="password" placeholder="Confirm Password"
                            value={form.confirmPassword} onChange={set('confirmPassword')} required />
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
                        className="gradient-btn w-full text-center disabled:opacity-60">
                        {loading ? 'Creating account...' : 'Create Account'}
                    </motion.button>
                </form>
                <p className="text-center text-white/50 text-sm mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">Sign In</Link>
                </p>
            </motion.div>
        </div>
    )
}
