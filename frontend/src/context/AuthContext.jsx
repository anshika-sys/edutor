import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()
axios.defaults.withCredentials = true

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    const login = async (identifier, password) => {
        const res = await axios.post('/api/auth/login', { identifier, password })
        setUser(res.data.user)
        return res.data
    }

    const register = async (data) => {
        const res = await axios.post('/api/auth/register', data)
        setUser(res.data.user)
        return res.data
    }

    const logout = async () => {
        await axios.post('/api/auth/logout')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
