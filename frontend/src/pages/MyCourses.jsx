import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import Navbar from '../components/Navbar'
import AIChatBot from '../components/AIChatBot'

export default function MyCourses() {
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/my-courses').then(res => setEnrollments(res.data)).finally(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen bg-[#0f0f1a]">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 py-10">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-8">My Learning</motion.h1>
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : enrollments.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-white/40 text-lg mb-4">You haven't enrolled in any courses yet.</p>
                        <button onClick={() => navigate('/courses')} className="gradient-btn">Explore Courses</button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrollments.map((e, i) => (
                            <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }} className="glass rounded-2xl overflow-hidden">
                                <img src={e.Course?.thumbnail_url || `https://picsum.photos/seed/${e.course_id}/400/200`}
                                    alt={e.Course?.title} className="w-full h-40 object-cover" />
                                <div className="p-5">
                                    <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">{e.Course?.category}</span>
                                    <h3 className="text-white font-semibold mt-2 leading-snug">{e.Course?.title}</h3>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs text-white/40 mb-1">
                                            <span>Progress</span><span>{Number(e.progress_percentage).toFixed(0)}%</span>
                                        </div>
                                        <div className="bg-white/10 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all"
                                                style={{ width: `${e.progress_percentage}%` }} />
                                        </div>
                                    </div>
                                    <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate(`/learn/${e.course_id}`)}
                                        className="gradient-btn w-full mt-4 text-sm py-2.5">
                                        Continue Learning
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
            <AIChatBot />
        </div>
    )
}
