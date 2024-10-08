import { useAuthUserContext } from '@features/auth'
import { Container } from '@features/ui'
import { Link } from 'react-router-dom'
import './AppNavbar.css'

const AppNavbar = () => {
  const [authUser, authUserDispatch] = useAuthUserContext()

  const logout = () => {
    authUserDispatch({ type: 'remove' })
  }

  if (authUser === null) {
    return (
      <nav className="app-navbar">
        <Container>
          <div className="app-navbar__user">
            <Link to="/login" className="app-navbar__button" role="button">
              Login
            </Link>
            <Link to="/register" className="app-navbar__button" role="button">
              Register
            </Link>
          </div>
        </Container>
      </nav>
    )
  }

  return (
    <nav className="app-navbar">
      <Container>
        <div>
          <ul className="app-navbar__menu">
            <li className="app-navbar__menu-item">
              <Link to="/" className="app-navbar__link">
                Home
              </Link>
            </li>
            <li className="app-navbar__menu-item">
              <Link to="/chats" className="app-navbar__link">
                Chats
              </Link>
            </li>
          </ul>
        </div>
        <div className="app-navbar__user">
          <span className="app-navbar__user-info">
            Logged in as <strong>{authUser.username}</strong>
          </span>
          <button className="app-navbar__button" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </Container>
    </nav>
  )
}

export default AppNavbar
