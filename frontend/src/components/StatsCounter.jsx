import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const stats = [
    { label: 'Total Students', value: 12000, suffix: '+' },
    { label: 'Total Courses', value: 50, suffix: '+' },
    { label: 'Expert Teachers', value: 30, suffix: '+' },
    { label: 'Courses Completed', value: 8500, suffix: '+' },
]

export default function StatsCounter() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
    return (
        <section ref={ref} className="py-16 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="glass rounded-2xl p-6 text-center">
                        <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                            {inView ? <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} /> : '0'}
                        </div>
                        <p className="text-white/60 text-sm mt-2">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
