import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../api/api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      try{
        const res = await auth.me()
        const resolved = res?.user || res
        if (mounted) setUser(resolved)
      }catch(e){
        // not logged in
      }
      if (mounted) setLoading(false)
    })()
    return ()=> mounted = false
  },[])

  const logout = async () => {
    try{
      await auth.logout()
    }catch(e){ /* ignore */ }
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
