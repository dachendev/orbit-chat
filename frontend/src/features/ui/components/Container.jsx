import classNames from 'classnames'
import PropTypes from 'prop-types'
import './Container.css'

const Container = ({ className, children, ...props }) => {
  return (
    <div className={classNames('container', className)} {...props}>
      {children}
    </div>
  )
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Container
