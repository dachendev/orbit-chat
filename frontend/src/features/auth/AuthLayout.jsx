import PropTypes from 'prop-types'
import { AppNavbar } from '@shared/app'

const AuthLayout = ({ children }) => {
  return (
    <>
      <AppNavbar />
      <div className="container">{children}</div>
    </>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthLayout
