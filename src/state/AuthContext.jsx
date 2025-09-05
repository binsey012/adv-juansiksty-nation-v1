import { createContext, useContext, useEffect, useState } from 'react'

const AuthCtx = createContext(null)

const defaultUser = null

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ajn_user')
    return saved ? JSON.parse(saved) : defaultUser
  })

  useEffect(() => {
    localStorage.setItem('ajn_user', JSON.stringify(user))
  }, [user])

  const login = (name, role = 'member') => setUser({ name, role })
  const register = (name) => setUser({ name, role: 'member' })
  const loginAs = (role) => setUser({ name: user?.name || 'User', role })
  const logout = () => setUser(null)

  return (
    <AuthCtx.Provider value={{ user, login, register, loginAs, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
