import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiStar } from 'react-icons/fi'

export default function CourseCard({ course }) {
    const navigate = useNavigate()
    const discount = course.original_price
        ? Math.round((1 - course.price / course.original_price) * 100)
        : null

    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(108,99,255,0.2)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="glass rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/courses/${course.id}`)}
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden h-44">
                <img
                    src={course.thumbnail_url || `https://img.youtube.com/vi/${course.youtube_playlist_id}/maxresdefault.jpg`}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.src = `https://picsum.photos/seed/${course.id}/400/220` }}
                />
                {discount > 0 && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                        {discount}% off
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">{course.title}</h3>
                <p className="text-white/40 text-xs mt-1">{course.instructor || 'EDUTOR Expert'}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-400 text-xs font-bold">{Number(course.rating || 0).toFixed(1)}</span>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map(s => (
                            <FiStar key={s} size={11}
                                className={s <= Math.round(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-white font-bold text-base">
                        {course.price == 0 ? 'Free' : `₹${course.price}`}
                    </span>
                    {course.original_price > 0 && (
                        <span className="text-white/30 text-xs line-through">₹{course.original_price}</span>
                    )}
                </div>

                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={e => { e.stopPropagation(); navigate(`/courses/${course.id}`) }}
                    className="w-full mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-semibold py-2 rounded-xl transition-all"
                >
                    Buy Now
                </motion.button>
            </div>
        </motion.div>
    )
}
