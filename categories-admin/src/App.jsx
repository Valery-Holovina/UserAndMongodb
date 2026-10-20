// npm create vite@latest categories-admin -- --template react
// cd categories-admin
// npm install
// npm install @reduxjs/toolkit react-redux
// npm run dev



import { useSelector } from 'react-redux'
import AuthPanel from './features/auth/AuthPanel'
import CategoryDashboard from './features/categories/CategoryDashboard'

export default function App() {
  const token = useSelector((state) => state.auth.token)

  return token ? <CategoryDashboard /> : <AuthPanel />
}



