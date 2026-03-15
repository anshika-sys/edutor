import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiMessageCircle } from 'react-icons/fi'

const botReply = (msg) => {
    const m = msg.toLowerCase()
    if (m.includes('course') || m.includes('learn')) return "We offer 10+ IT courses including DSA, ML, Web Dev, Cloud Computing and more!"
    if (m.includes('price') || m.includes('cost')) return "Our courses start from ₹399. Check individual course pages for pricing."
    if (m.includes('certificate')) return "Yes! You get a certificate upon completing any course on EDUTOR."
    if (m.includes('help')) return "I can help with course recommendations, platform guidance, and learning tips!"
    return "Hi! I'm EDUTOR's AI assistant. Ask me about courses, learning paths, or platform features!"
}

export default function AIChatBot() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([{ from: 'bot', text: "Hi! I'm your EDUTOR AI assistant. How can I help?" }])
    const [input, setInput] = useState('')

    const send = () => {
        if (!input.trim()) return
        setMessages(prev => [...prev, { from: 'user', text: input }, { from: 'bot', text: botReply(input) }])
        setInput('')
    }

    return (
        <>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 gradient-btn rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40">
                {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
            </motion.button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-80 glass rounded-2xl shadow-2xl shadow-purple-900/40 flex flex-col overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center gap-2">
                            <FiMessageCircle size={18} />
                            <span className="font-semibold text-sm">EDUTOR AI Assistant</span>
                        </div>
                        <div className="flex-1 p-4 space-y-3 max-h-72 overflow-y-auto">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${m.from === 'user' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/80'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t border-white/10 flex gap-2">
                            <input className="input-glass text-sm py-2 flex-1" placeholder="Ask me anything..."
                                value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
                            <button onClick={send} className="gradient-btn px-3 py-2 rounded-xl"><FiSend size={16} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
