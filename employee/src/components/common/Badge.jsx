export default function Badge({ children, color = "green" }) {
  return (
    <span className={`common-badge ${color}`}>
      {children}
    </span>
  );
}