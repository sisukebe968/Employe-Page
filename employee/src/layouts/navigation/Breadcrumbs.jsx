
export default function Breadcrumbs({ activePage }) {
  return (
    <nav
      className="employee-breadcrumbs"
      aria-label="Breadcrumb"
    >
      {activePage && activePage !== "Dashboard" && (
        <span className="employee-breadcrumb-current">
          {activePage}
        </span>
      )}
    </nav>
  );
}
