export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
}) {
  return (
    <div className="common-tabs">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab}
          className={activeTab === tab ? "active" : ""}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}