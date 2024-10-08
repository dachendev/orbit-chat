import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { LoginPage, RegisterPage, useAuthUserContext } from './features/auth'
import { ChatPage } from './features/chat'
import AppLayout from './shared/AppLayout'

const HomePage = () => {
  return (
    <AppLayout>
      <h2>home</h2>
    </AppLayout>
  )
}

const AppViews = () => {
  const [authUser] = useAuthUserContext()

  if (!authUser) {
    return <Navigate to="/login" />
  }

  return (
    <Routes>
      <Route path="/chat/:recipientId" element={<ChatPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<AppViews />} />
      </Routes>
    </Router>
  )
}

export default App
