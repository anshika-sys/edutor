import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { FiStar, FiClock, FiDownload, FiSmartphone, FiAward, FiGlobe, FiShoppingCart, FiCheck } from 'react-icons/fi'

export default function CourseDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [buying, setBuying] = useState(false)
    const [popup, setPopup] = useState(false)
    const [enrolled, setEnrolled] = useState(false)

    useEffect(() => {
        axios.get(`/api/courses/${id}`).then(res => setCourse(res.data)).finally(() => setLoading(false))
        axios.get('/api/my-courses').then(res => setEnrolled(res.data.some(e => e.course_id === parseInt(id)))).catch(() => { })
    }, [id])

    const handleBuy = async () => {
        if (enrolled) return navigate(`/learn/${id}`)
        setBuying(true)
        try {
            await axios.post('/api/buy-course', { course_id: parseInt(id) })
            setEnrolled(true)
            setPopup(true)
            setTimeout(() => { setPopup(false); navigate('/my-courses') }, 2500)
        } catch (err) {
            if (err.response?.data?.message?.includes('Already enrolled')) {
                setEnrolled(true); navigate(`/learn/${id}`)
            }
        } finally { setBuying(false) }
    }

    if (loading) return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
    if (!course) return <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center text-white/50">Course not found</div>

    const discount = course.original_price ? Math.round((1 - course.price / course.original_price) * 100) : null

    return (
        <div className="min-h-screen bg-[#0f0f1a]">
            <Navbar />

            <AnimatePresence>
                {popup && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500/20 border border-green-500/40 text-green-300 px-6 py-3 rounded-2xl shadow-lg text-sm font-medium flex items-center gap-2">
                        <FiCheck /> Payment Successful. Course added to your learning.
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">

                {/* LEFT: Course info */}
                <div className="flex-1">
                    <span className="text-xs text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{course.category}</span>
                    <h1 className="text-3xl font-bold text-white mt-4 leading-snug">{course.title}</h1>
                    <p className="text-white/60 mt-3 text-base leading-relaxed">
                        {course.description || 'Comprehensive course covering all essential topics with hands-on examples and real-world projects.'}
                    </p>

                    {/* Rating row */}
                    <div className="flex items-center gap-3 mt-4 flex-wrap">
                        <span className="text-yellow-400 font-bold">{Number(course.rating || 0).toFixed(1)}</span>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(s => (
                                <FiStar key={s} size={14} className={s <= Math.round(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />
                            ))}
                        </div>
                        <span className="text-white/40 text-sm">by {course.instructor || 'EDUTOR Expert'}</span>
                        <span className="text-white/40 text-sm flex items-center gap-1"><FiGlobe size={13} /> English</span>
                    </div>

                    {/* Thumbnail (visible on mobile) */}
                    <div className="lg:hidden mt-6 rounded-2xl overflow-hidden">
                        <img src={course.thumbnail_url} alt={course.title} className="w-full object-cover"
                            onError={e => { e.target.src = `https://picsum.photos/seed/${course.id}/600/340` }} />
                    </div>

                    {/* What you'll learn */}
                    <div className="mt-8 glass rounded-2xl p-6">
                        <h2 className="text-white font-semibold text-lg mb-4">What you'll learn</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {['Core concepts explained clearly', 'Hands-on coding exercises', 'Real-world project experience',
                                'Interview preparation tips', 'Best practices & patterns', 'Certificate of completion'].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 text-white/70 text-sm">
                                        <FiCheck className="text-purple-400 mt-0.5 flex-shrink-0" />
                                        {item}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Course includes */}
                    <div className="mt-6 glass rounded-2xl p-6">
                        <h2 className="text-white font-semibold text-lg mb-4">This course includes</h2>
                        <div className="grid sm:grid-cols-2 gap-3 text-white/60 text-sm">
                            <div className="flex items-center gap-2"><FiClock className="text-purple-400" />{course.total_hours || 10} hours on-demand video</div>
                            <div className="flex items-center gap-2"><FiDownload className="text-purple-400" />Downloadable resources</div>
                            <div className="flex items-center gap-2"><FiSmartphone className="text-purple-400" />Access on mobile and TV</div>
                            <div className="flex items-center gap-2"><FiAward className="text-purple-400" />Certificate of completion</div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Purchase card (sticky) */}
                <div className="lg:w-80 xl:w-96 flex-shrink-0">
                    <div className="glass rounded-2xl overflow-hidden sticky top-24 shadow-2xl shadow-purple-900/30">
                        {/* Course thumbnail */}
                        <div className="hidden lg:block">
                            <img src={course.thumbnail_url} alt={course.title} className="w-full h-48 object-cover"
                                onError={e => { e.target.src = `https://picsum.photos/seed/${course.id}/400/220` }} />
                        </div>

                        <div className="p-6">
                            {/* Price */}
                            <div className="flex items-end gap-3 mb-1">
                                <span className="text-3xl font-extrabold text-white">
                                    {course.price == 0 ? 'Free' : `₹${course.price}`}
                                </span>
                                {course.original_price > 0 && (
                                    <span className="text-white/30 line-through text-lg">₹{course.original_price}</span>
                                )}
                                {discount > 0 && (
                                    <span className="bg-orange-500/20 text-orange-400 text-sm font-bold px-2 py-0.5 rounded">{discount}% off</span>
                                )}
                            </div>
                            <p className="text-orange-400 text-xs mb-4 flex items-center gap-1">⏰ 2 days left at this price!</p>

                            {/* Buttons */}
                            <motion.button whileTap={{ scale: 0.97 }} onClick={handleBuy} disabled={buying}
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60 mb-3">
                                {buying ? 'Processing...' : enrolled ? 'Go to Course' : 'Buy Now'}
                            </motion.button>

                            {!enrolled && (
                                <button className="w-full border border-white/30 text-white/70 hover:text-white hover:border-white/50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                                    <FiShoppingCart /> Add to cart
                                </button>
                            )}

                            <p className="text-white/30 text-xs text-center mt-3">30-Day Money-Back Guarantee</p>
                            <p className="text-white/30 text-xs text-center">Full Lifetime Access</p>

                            {/* Includes list */}
                            <div className="mt-5 space-y-2 text-white/50 text-xs border-t border-white/10 pt-4">
                                <p className="text-white/70 font-medium text-sm mb-2">This course includes:</p>
                                <div className="flex items-center gap-2"><FiClock size={13} className="text-purple-400" />{course.total_hours || 10} hours on-demand video</div>
                                <div className="flex items-center gap-2"><FiDownload size={13} className="text-purple-400" />{course.total_lessons || 20} downloadable resources</div>
                                <div className="flex items-center gap-2"><FiSmartphone size={13} className="text-purple-400" />Access on mobile and TV</div>
                                <div className="flex items-center gap-2"><FiAward size={13} className="text-purple-400" />Certificate of completion</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
