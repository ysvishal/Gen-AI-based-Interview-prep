import React from 'react'
import {RouterProvider} from 'react-router'
import {router} from './app.routes.jsx' 
import './style.css'
import { AuthProvider } from './features/auth/auth.context.jsx'
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router = {router} />
    </AuthProvider>
  )
}

export default App