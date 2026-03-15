import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL || ''

// Attach token from localStorage to every request
const token = localStorage.getItem('edutor_token')
if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(res => setUser(res.data))
            .catch(() => { setUser(null); localStorage.removeItem('edutor_token') })
            .finally(() => setLoading(false))
    }, [])

    const saveToken = (token) => {
        if (token) {
            localStorage.setItem('edutor_token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    const login = async (identifier, password) => {
        const res = await axios.post('/api/auth/login', { identifier, password })
        saveToken(res.data.token)
        setUser(res.data.user)
        return res.data
    }

    const register = async (data) => {
        const res = await axios.post('/api/auth/register', data)
        saveToken(res.data.token)
        setUser(res.data.user)
        return res.data
    }

    const logout = async () => {
        await axios.post('/api/auth/logout')
        localStorage.removeItem('edutor_token')
        delete axios.defaults.headers.common['Authorization']
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
