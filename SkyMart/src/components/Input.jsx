import PropTypes from 'prop-types'

function Input({ id, label, value, onChange, placeholder = '', type = 'text', className = '' }) {
  return (
    <label className={`input-field ${className}`} htmlFor={id}>
      {label && <span className="input-field__label">{label}</span>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field__control"
      />
    </label>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
}

export default Input
