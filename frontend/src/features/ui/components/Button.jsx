import classNames from 'classnames'
import PropTypes from 'prop-types'

const Button = ({ className, children, ...props }) => {
  return (
    <button className={classNames('button', className)} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Button
