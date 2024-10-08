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
        Username:{' '}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>
      <p>
        Password:{' '}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>
      <p>
        <button type="submit">Register</button>
      </p>
    </form>
  )
}

export default RegisterForm
