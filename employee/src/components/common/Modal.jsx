import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="common-modal-overlay" onClick={onClose}>
      <div
        className="common-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="common-modal-header">
          <h2>{title}</h2>

          <button type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}