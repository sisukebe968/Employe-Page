export default function Dropdown({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
}) {
  return (
    <select value={value} onChange={onChange}>
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}