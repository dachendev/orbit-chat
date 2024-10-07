import { Link } from 'react-router-dom'
import { LogoutButton, useAuthUserContext } from '../features/auth'

const Navbar = () => {
  const [authUser] = useAuthUserContext()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {authUser && (
            <ul className="navbar-menu">
              <li className="navbar-item">
                <Link to="/" className="navbar-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/chat" className="navbar-link">
                  Chat
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="navbar-user">
          {authUser ? (
            <>
              <span className="navbar-user-info">
                Logged in as <strong>{authUser.username}</strong>
              </span>
              <LogoutButton className="navbar-button">Logout</LogoutButton>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-button">
                Login
              </Link>
              <Link to="/register" className="navbar-button">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
