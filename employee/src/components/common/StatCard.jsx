export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "green",
  subtitle,
}) {
  return (
    <div className="common-stat-card">
      <div className={`common-stat-icon ${color}`}>
        {Icon && <Icon size={22} />}
      </div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        {subtitle && <span>{subtitle}</span>}
      </div>
    </div>
  );
}