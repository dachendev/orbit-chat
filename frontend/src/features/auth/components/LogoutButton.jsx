import { useAuthUserContext } from '../AuthUserContext'
import PropTypes from 'prop-types'

const LogoutButton = ({ children }) => {
  const [authUser, authUserDispatch] = useAuthUserContext()

  const logout = () => {
    authUserDispatch({ type: 'remove' })
  }

  return (
    <button type="button" onClick={logout}>
      {children}
    </button>
  )
}

LogoutButton.propTypes = {
  children: PropTypes.node,
}

export default LogoutButton
