import PropTypes from 'prop-types'

function AuthInput({ id, label, value, onChange, type = 'text', placeholder = '', className = '' }) {
  return (
    <label className={`auth-input ${className}`} htmlFor={id}>
      {label && <span className="auth-input__label">{label}</span>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="auth-input__field"
      />
    </label>
  )
}

AuthInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
}

export default AuthInput
