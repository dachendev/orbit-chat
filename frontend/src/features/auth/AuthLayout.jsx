import PropTypes from 'prop-types'
import Navbar from '../../shared/Navbar'

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthLayout
