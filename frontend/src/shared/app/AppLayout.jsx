import { Container } from '@/features/ui'
import AppNavbar from './AppNavbar'
import PropTypes from 'prop-types'

const AppLayout = ({ children }) => {
  return (
    <>
      <AppNavbar />
      <br />
      <Container>{children}</Container>
    </>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
