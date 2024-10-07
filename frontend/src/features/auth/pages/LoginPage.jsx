import { Navigate, useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useAuthUserContext } from '../AuthUserContext'
import { login } from '../authService'
import AuthLayout from '../AuthLayout'

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
    <AuthLayout>
      <h2>login</h2>
      <LoginForm onLogin={onLogin} />
    </AuthLayout>
  )
}

export default LoginPage
