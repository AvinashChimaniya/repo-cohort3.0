import PropTypes from 'prop-types'

function Button({ type = 'button', children, onClick, className = '' }) {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default Button
