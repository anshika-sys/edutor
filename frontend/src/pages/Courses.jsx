import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'
import AIChatBot from '../components/AIChatBot'
import { FiSearch } from 'react-icons/fi'

// shuffle array randomly
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

export default function Courses() {
    const [courses, setCourses] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/courses')
            .then(res => {
                const shuffled = shuffle(res.data)
                setCourses(shuffled)
                setFiltered(shuffled)
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (!search) return setFiltered(courses)
        setFiltered(courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor?.toLowerCase().includes(search.toLowerCase())))
    }, [search, courses])

    return (
        <div className="min-h-screen bg-[#0f0f1a]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-3xl font-extrabold text-white">All Courses</h1>
                    <p className="text-white/50 mt-1 text-sm">{courses.length} courses available</p>
                </motion.div>

                {/* Search */}
                <div className="relative max-w-md mb-8">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input className="input-glass pl-11" placeholder="Search courses or instructors..."
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center text-white/40 py-20">No courses found.</div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {filtered.map((course, i) => (
                            <motion.div key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}>
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
            <AIChatBot />
        </div>
    )
}
