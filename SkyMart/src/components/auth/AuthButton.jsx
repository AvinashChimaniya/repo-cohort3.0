import PropTypes from 'prop-types'

function AuthButton({ type = 'button', children, onClick, className = '' }) {
  return (
    <button type={type} className={`auth-button ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

AuthButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default AuthButton
