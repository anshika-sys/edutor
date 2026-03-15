import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FiLock } from 'react-icons/fi'

export default function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirm) return setError('Passwords do not match')
        if (password.length < 8) return setError('Password must be at least 8 characters')
        setLoading(true)
        try {
            await axios.post('/api/auth/reset-password', { token, password })
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.message || 'Reset failed')
        } finally { setLoading(false) }
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="glass rounded-3xl p-10 w-full max-w-md mx-4 shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Reset Password</h1>
                    <p className="text-white/60 mt-2 text-sm">Enter your new password below.</p>
                </div>
                {error && <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 mb-5 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11" type="password" placeholder="New password"
                            value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11" type="password" placeholder="Confirm new password"
                            value={confirm} onChange={e => setConfirm(e.target.value)} required />
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
                        className="gradient-btn w-full text-center disabled:opacity-60">
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}
