import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FiMail } from 'react-icons/fi'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true); setError('')
        try {
            const res = await axios.post('/api/auth/forgot-password', { email })
            setMsg(res.data.message)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally { setLoading(false) }
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="glass rounded-3xl p-10 w-full max-w-md mx-4 shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Forgot Password</h1>
                    <p className="text-white/60 mt-2 text-sm">Enter your email to receive a reset link.</p>
                </div>
                {msg && <div className="bg-green-500/20 border border-green-500/40 text-green-300 rounded-xl px-4 py-3 mb-5 text-sm">{msg}</div>}
                {error && <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 mb-5 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input className="input-glass pl-11" type="email" placeholder="Your email address"
                            value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
                        className="gradient-btn w-full text-center disabled:opacity-60">
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </motion.button>
                </form>
                <p className="text-center text-white/50 text-sm mt-6">
                    <Link to="/login" className="text-purple-400 hover:text-purple-300">Back to Login</Link>
                </p>
            </motion.div>
        </div>
    )
}
