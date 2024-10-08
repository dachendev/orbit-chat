import { Container } from '@/features/ui'
import Navbar from './Navbar'
import PropTypes from 'prop-types'

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
