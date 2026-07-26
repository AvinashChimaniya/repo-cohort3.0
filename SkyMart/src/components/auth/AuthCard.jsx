function AuthCard({ title, children }) {
  return (
    <section className="auth-card">
      {title && <h2 className="auth-card__title">{title}</h2>}
      <div className="auth-card__body">{children}</div>
    </section>
  )
}

export default AuthCard
