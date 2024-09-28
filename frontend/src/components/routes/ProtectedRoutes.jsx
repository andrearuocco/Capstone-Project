import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { MeContext } from '../context/MeContext'

function ProtectedRoute({ children }) {
  const { me } = useContext(MeContext)

  if (!me) {
    return <Navigate to="/login" replace />
  }

  return children // se l'utente è loggato non mostare più il login ma i figli delle rotte protette (quelli del componente ProtectedRoutes in App)
}

export default ProtectedRoute