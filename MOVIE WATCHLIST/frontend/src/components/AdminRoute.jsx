import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const AdminRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token)
  const isAdmin = useAuthStore((state) => state.role === 'admin')

  if (!token) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}

export default AdminRoute
