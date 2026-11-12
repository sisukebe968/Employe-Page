import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export default function Alert({
  type = "info",
  children,
  onClose,
}) {
  const Icon = icons[type] || Info;

  return (
    <div className={`common-alert ${type}`}>
      <Icon size={19} />
      <span>{children}</span>

      {onClose && (
        <button type="button" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
}