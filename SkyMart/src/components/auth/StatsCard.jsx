import PropTypes from 'prop-types'

function StatsCard({ stat, label }) {
  return (
    <div className="stats-card">
      <div className="stats-card__stat">{stat}</div>
      <div className="stats-card__label">{label}</div>
    </div>
  )
}

StatsCard.propTypes = {
  stat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
}

export default StatsCard
