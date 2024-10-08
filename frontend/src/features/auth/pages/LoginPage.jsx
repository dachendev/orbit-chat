import { AppLayout } from '@/shared/app'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthUserContext } from '../AuthUserContext'
import { login } from '../authService'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  const [authUser, authUserDispatch] = useAuthUserContext()
  const navigate = useNavigate()

  if (authUser) {
    return <Navigate to="/" />
  }

  const onLogin = (username, password) => {
    login(username, password).then((userInfo) => {
      authUserDispatch({ type: 'set', payload: userInfo })
      navigate('/')
    })
  }

  return (
    <AppLayout>
      <h2>Login</h2>
      <LoginForm onLogin={onLogin} />
    </AppLayout>
  )
}

export default LoginPage
