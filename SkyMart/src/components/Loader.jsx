import PropTypes from 'prop-types'

function Loader({ size = 48, className = '' }) {
  return (
    <div className={`loader ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 50 50"
        className="loader__spinner"
        style={{ width: size, height: size }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

Loader.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
}

export default Loader
