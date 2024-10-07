import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { LoginPage, RegisterPage, useAuthUserContext } from './features/auth'
import { ChatPage } from './features/chat'
import AppLayout from './shared/AppLayout'
import { Helmet } from 'react-helmet'

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
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

const App = () => {
  return (
    <Router>
      <Helmet>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<AppViews />} />
      </Routes>
    </Router>
  )
}

export default App
