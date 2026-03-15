import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { FiArrowLeft, FiExternalLink, FiPlay, FiYoutube } from 'react-icons/fi'

export default function CoursePlayer() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [course, setCourse] = useState(null)
    const [enrollment, setEnrollment] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get course details
        axios.get(`/api/courses/${id}`)
            .then(res => setCourse(res.data))
            .catch(() => navigate('/my-courses'))

        // Get enrollment to confirm access
        axios.get('/api/my-courses')
            .then(res => {
                const found = res.data.find(e => e.course_id === parseInt(id))
                if (!found) navigate('/my-courses')
                else setEnrollment(found)
            })
            .catch(() => navigate('/my-courses'))
            .finally(() => setLoading(false))
    }, [id])

    const openPlaylist = () => {
        if (course?.youtube_playlist_id) {
            window.open(`https://www.youtube.com/playlist?list=${course.youtube_playlist_id}`, '_blank')
        }
    }

    const openFirstVideo = () => {
        if (course?.youtube_playlist_id) {
            window.open(`https://www.youtube.com/watch?list=${course.youtube_playlist_id}&index=1`, '_blank')
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )

    if (!course) return null

    const progress = enrollment ? Number(enrollment.progress_percentage) : 0

    return (
        <div className="min-h-screen bg-[#0f0f1a]">
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Back */}
                <button onClick={() => navigate('/my-courses')}
                    className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
                    <FiArrowLeft /> Back to My Courses
                </button>

                {/* Course Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl overflow-hidden">

                    {/* Thumbnail banner */}
                    <div className="relative h-56 md:h-72 overflow-hidden">
                        <img src={course.thumbnail_url}
                            alt={course.title}
                            className="w-full h-full object-cover"
                            onError={e => { e.target.src = `https://picsum.photos/seed/${course.id}/800/400` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={openFirstVideo}
                                className="w-20 h-20 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-900/50 transition-colors"
                            >
                                <FiPlay size={32} className="text-white ml-1" />
                            </motion.button>
                        </div>

                        {/* Course title on banner */}
                        <div className="absolute bottom-4 left-6 right-6">
                            <h1 className="text-white font-bold text-xl md:text-2xl leading-snug drop-shadow-lg">{course.title}</h1>
                            <p className="text-white/70 text-sm mt-1">by {course.instructor}</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="px-6 py-4 border-b border-white/10">
                        <div className="flex justify-between text-sm text-white/50 mb-2">
                            <span>Your Progress</span>
                            <span>{progress.toFixed(0)}% complete</span>
                        </div>
                        <div className="bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }} />
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="p-6 flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={openFirstVideo}
                            className="flex-1 gradient-btn flex items-center justify-center gap-3 py-4 text-base"
                        >
                            <FiPlay size={20} />
                            Start Watching on YouTube
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={openPlaylist}
                            className="flex-1 glass border border-white/20 hover:border-red-500/50 text-white font-semibold rounded-xl py-4 flex items-center justify-center gap-3 transition-all text-base"
                        >
                            <FiYoutube size={20} className="text-red-500" />
                            View Full Playlist
                        </motion.button>
                    </div>
                </motion.div>

                {/* Course Info */}
                <div className="grid md:grid-cols-3 gap-5 mt-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="glass rounded-2xl p-5 text-center">
                        <p className="text-3xl font-bold text-purple-400">{course.total_hours || '—'}</p>
                        <p className="text-white/50 text-sm mt-1">Hours of Content</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="glass rounded-2xl p-5 text-center">
                        <p className="text-3xl font-bold text-indigo-400">{course.total_lessons || '—'}</p>
                        <p className="text-white/50 text-sm mt-1">Lessons</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="glass rounded-2xl p-5 text-center">
                        <p className="text-3xl font-bold text-yellow-400">{Number(course.rating).toFixed(1)}⭐</p>
                        <p className="text-white/50 text-sm mt-1">Rating</p>
                    </motion.div>
                </div>

                {/* Description */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="glass rounded-2xl p-6 mt-5">
                    <h2 className="text-white font-semibold text-lg mb-3">About this Course</h2>
                    <p className="text-white/60 text-sm leading-relaxed">{course.description}</p>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                        <FiExternalLink className="text-purple-400" />
                        <a href={`https://www.youtube.com/playlist?list=${course.youtube_playlist_id}`}
                            target="_blank" rel="noreferrer"
                            className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                            Open full playlist on YouTube →
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
