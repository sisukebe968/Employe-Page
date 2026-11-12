export default function Card({
  title,
  subtitle,
  children,
  action,
  className = "",
}) {
  return (
    <section className={`common-card ${className}`}>
      {(title || action) && (
        <div className="common-card-header">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}

      <div className="common-card-body">{children}</div>
    </section>
  );
}