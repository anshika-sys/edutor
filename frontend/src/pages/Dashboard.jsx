import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import Navbar from '../components/Navbar'
import StatsCounter from '../components/StatsCounter'
import CourseCard from '../components/CourseCard'
import AIChatBot from '../components/AIChatBot'
import { useAuth } from '../context/AuthContext'

const features = [
    { icon: '🎥', title: 'Learn from Top Tech Playlists', desc: 'Curated YouTube playlists from the best instructors worldwide.' },
    { icon: '📚', title: 'Structured IT Learning', desc: 'Follow a clear learning path from beginner to advanced.' },
    { icon: '📊', title: 'Track Your Progress', desc: 'Monitor your completion and stay motivated every step.' },
]

export default function Dashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [myCourses, setMyCourses] = useState([])
    const [featuredCourses, setFeaturedCourses] = useState([])

    useEffect(() => {
        axios.get('/api/my-courses').then(res => setMyCourses(res.data)).catch(() => { })
        axios.get('/api/courses').then(res => {
            const shuffled = [...res.data].sort(() => Math.random() - 0.5)
            setFeaturedCourses(shuffled.slice(0, 8))
        }).catch(() => { })
    }, [])

    return (
        <div className="min-h-screen bg-[#0f0f1a]">
            <Navbar />
            <section className="relative overflow-hidden px-6 py-24 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative max-w-3xl mx-auto">
                    <span className="text-purple-400 text-sm font-medium bg-purple-500/10 px-4 py-1.5 rounded-full">Welcome back, {user?.username} 👋</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight text-white">
                        Master <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Computer Science</span> Skills
                    </h1>
                    <p className="text-white/60 text-lg mt-4 max-w-xl mx-auto">Build your tech career with structured IT courses, expert playlists, and real-world projects.</p>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/courses')} className="gradient-btn mt-8 text-base px-10 py-4 inline-block">
                        Explore Courses
                    </motion.button>
                </motion.div>
            </section>

            <StatsCounter />

            <section className="py-16 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white">Why Choose <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">EDUTOR</span>?</h2>
                    <p className="text-white/50 mt-3 max-w-xl mx-auto">Structured, playlist-based learning for Computer Science and Software Engineering.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                            className="glass rounded-2xl p-6 text-center hover:border-purple-500/40 transition-colors">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-white font-semibold text-lg">{f.title}</h3>
                            <p className="text-white/50 text-sm mt-2">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {myCourses.length > 0 && (
                <section className="py-12 px-6 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-6">My Learning</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {myCourses.map(enrollment => (
                            <motion.div key={enrollment.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                className="glass rounded-2xl p-5 flex gap-4 items-center">
                                <img src={enrollment.Course?.thumbnail_url || `https://picsum.photos/seed/${enrollment.course_id}/80`}
                                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0" alt="" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-medium text-sm truncate">{enrollment.Course?.title}</h4>
                                    <div className="mt-2 bg-white/10 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all"
                                            style={{ width: `${enrollment.progress_percentage}%` }} />
                                    </div>
                                    <p className="text-white/40 text-xs mt-1">{Number(enrollment.progress_percentage).toFixed(0)}% complete</p>
                                    <button onClick={() => navigate(`/learn/${enrollment.course_id}`)}
                                        className="text-purple-400 text-xs font-medium mt-2 hover:text-purple-300 transition-colors">
                                        Continue Learning →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {featuredCourses.length > 0 && (
                <section className="py-12 px-6 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Featured Courses</h2>
                        <button onClick={() => navigate('/courses')} className="text-purple-400 text-sm hover:text-purple-300">View All →</button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {featuredCourses.map(course => <CourseCard key={course.id} course={course} />)}
                    </div>
                </section>
            )}
            <AIChatBot />
        </div>
    )
}
