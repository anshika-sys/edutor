import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FiHome, FiBook, FiUser, FiLogOut } from 'react-icons/fi'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const navItems = [
        { to: '/', icon: <FiHome size={20} />, label: 'Home' },
        { to: '/courses', icon: <FiBook size={20} />, label: 'Courses' },
        { to: '/my-courses', icon: <FiUser size={20} />, label: 'My Learning' },
    ]

    return (
        <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 glass-dark border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                EDUTOR
            </Link>
            <div className="flex items-center gap-6">
                {navItems.map(item => (
                    <Link key={item.to} to={item.to}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === item.to ? 'text-purple-400' : 'text-white/60 hover:text-white'}`}>
                        {item.icon}
                        <span className="hidden md:inline">{item.label}</span>
                    </Link>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm hidden md:block">Hi, {user?.username}</span>
                <button onClick={handleLogout} className="flex items-center gap-2 text-white/60 hover:text-red-400 transition-colors text-sm">
                    <FiLogOut size={18} />
                    <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </motion.nav>
    )
}
