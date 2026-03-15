import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiBook, FiUsers, FiAward, FiPlay } from 'react-icons/fi'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const features = [
    { icon: '🎥', title: 'YouTube-Powered Learning', desc: 'Access curated playlists from top instructors like Striver, Andrew Ng, Love Babbar and more.' },
    { icon: '📚', title: 'Structured IT Courses', desc: 'DSA, ML, OS, DBMS, CN and more — all organized for clear progression.' },
    { icon: '📊', title: 'Track Your Progress', desc: 'Monitor completion, pick up where you left off, and stay on track.' },
    { icon: '🏆', title: 'Certificate on Completion', desc: 'Earn a certificate for every course you complete on EDUTOR.' },
]

const stats = [
    { label: 'Students', value: 12000, suffix: '+' },
    { label: 'Courses', value: 24, suffix: '+' },
    { label: 'Instructors', value: 15, suffix: '+' },
    { label: 'Completions', value: 8500, suffix: '+' },
]

const courses = [
    { title: 'DSA Full Course', instructor: 'Striver', img: 'https://img.youtube.com/vi/0bHoB32fuj0/maxresdefault.jpg', price: '₹499' },
    { title: 'ML - Andrew Ng', instructor: 'Andrew Ng', img: 'https://img.youtube.com/vi/jGwO_UgTS7I/maxresdefault.jpg', price: '₹799' },
    { title: 'OS - Neso Academy', instructor: 'Neso Academy', img: 'https://img.youtube.com/vi/vBURTt97EkA/maxresdefault.jpg', price: '₹349' },
    { title: 'DBMS - Apna College', instructor: 'Apna College', img: 'https://img.youtube.com/vi/T7AxM7Vqvaw/maxresdefault.jpg', price: '₹349' },
]

function StatsSection() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
    return (
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
                <div key={i} className="glass rounded-2xl p-6 text-center">
                    <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        {inView ? <CountUp end={s.value} duration={2.5} separator="," suffix={s.suffix} /> : '0'}
                    </div>
                    <p className="text-white/50 text-sm mt-1">{s.label}</p>
                </div>
            ))}
        </div>
    )
}

export default function Landing() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white">

            {/* Navbar */}
            <nav className="sticky top-0 z-50 glass-dark border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    EDUTOR
                </span>
                <div className="flex items-center gap-3">
                    <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('/login')}
                        className="text-white/70 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                        Login
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('/register')}
                        className="gradient-btn text-sm px-5 py-2">
                        Get Started
                    </motion.button>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden px-6 py-28 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    className="relative max-w-4xl mx-auto">
                    <span className="inline-block text-purple-400 text-sm font-medium bg-purple-500/10 px-4 py-1.5 rounded-full mb-6">
                        🚀 India's #1 IT Learning Platform
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                        Master <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Computer Science</span>
                        <br />Skills That Matter
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
                        Learn DSA, Machine Learning, OS, DBMS, CN and more from top YouTube instructors — all in one place, structured and affordable.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/register')}
                            className="gradient-btn text-base px-10 py-4 flex items-center gap-2 justify-center">
                            Start Learning Free <FiArrowRight />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/login')}
                            className="glass border border-white/20 hover:border-purple-500/50 text-white font-semibold rounded-xl px-10 py-4 transition-all flex items-center gap-2 justify-center">
                            <FiPlay size={18} /> Already a member? Login
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Stats */}
            <section className="py-16 px-6">
                <StatsSection />
            </section>

            {/* Features */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold">Why students choose <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">EDUTOR</span></h2>
                    <p className="text-white/50 mt-3 max-w-xl mx-auto">Everything you need to go from beginner to job-ready.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                            className="glass rounded-2xl p-6 text-center hover:border-purple-500/40 transition-colors">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-white font-semibold">{f.title}</h3>
                            <p className="text-white/50 text-sm mt-2 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Course Preview */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Popular Courses</h2>
                    <p className="text-white/50 mt-3">Join thousands of learners already enrolled</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.map((c, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                            className="glass rounded-2xl overflow-hidden group cursor-pointer"
                            onClick={() => navigate('/register')}>
                            <div className="h-40 overflow-hidden">
                                <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-white font-semibold text-sm">{c.title}</h3>
                                <p className="text-white/40 text-xs mt-1">{c.instructor}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-purple-400 font-bold">{c.price}</span>
                                    <span className="text-xs text-white/40">Enroll →</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/register')}
                        className="gradient-btn px-10 py-4 text-base flex items-center gap-2 mx-auto">
                        View All Courses <FiArrowRight />
                    </motion.button>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-indigo-900/30" />
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="relative max-w-2xl mx-auto">
                    <h2 className="text-4xl font-extrabold">Ready to start your <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">tech journey?</span></h2>
                    <p className="text-white/60 mt-4 text-lg">Join 12,000+ students already learning on EDUTOR.</p>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/register')}
                        className="gradient-btn mt-8 px-12 py-4 text-base inline-flex items-center gap-2">
                        Create Free Account <FiArrowRight />
                    </motion.button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 px-6 py-8 text-center text-white/30 text-sm">
                <p className="text-xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">EDUTOR</p>
                <p>© 2026 EDUTOR. All rights reserved. Built for learners, by learners.</p>
            </footer>
        </div>
    )
}
