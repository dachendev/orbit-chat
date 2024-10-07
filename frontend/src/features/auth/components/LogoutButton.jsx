import { Button } from '@/features/ui'
import { useAuthUserContext } from '../AuthUserContext'
import PropTypes from 'prop-types'

const LogoutButton = ({ children }) => {
  const [authUser, authUserDispatch] = useAuthUserContext()

  const logout = () => {
    authUserDispatch({ type: 'remove' })
  }

  return (
    <Button type="button" onClick={logout}>
      {children}
    </Button>
  )
}

LogoutButton.propTypes = {
  children: PropTypes.node,
}

export default LogoutButton
