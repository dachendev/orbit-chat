import { useState } from 'react'
import { register } from '../authService'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    register(username, password).then(() => {
      navigate('/login')
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <p>
        username:{' '}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>
      <p>
        password:{' '}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>
      <p>
        <button>login</button>
      </p>
    </form>
  )
}

export default RegisterForm
