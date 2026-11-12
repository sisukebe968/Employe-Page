
import { Upload, X, CalendarDays } from "lucide-react";

const leaveTypes = [
  "Annual Leave",
  "Sick Leave",
  "Maternity Leave",
  "Paternity Leave",
  "Emergency Leave",
  "Marriage Leave",
  "Bereavement Leave",
  "Special Leave",
  "Unpaid Leave",
  "Other",
];

export default function LeaveRequestForm({
  form,
  totalDays,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="leave-panel">
      <div className="leave-panel-heading">
        <div>
          <h3>New Leave Application</h3>
          <p>Complete the form below to request leave.</p>
        </div>

        <button
          type="button"
          className="leave-cancel-button"
          onClick={onCancel}
          aria-label="Close form"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className="leave-form-grid">
          <div className="leave-field">
            <label>Employee Name</label>
            <input
              type="text"
              value="Tiblet Alemayehu"
              readOnly
            />
          </div>

          <div className="leave-field">
            <label>Leave Type *</label>
            <select
              name="leaveType"
              value={form.leaveType}
              onChange={onChange}
              required
            >
              {leaveTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="leave-field">
            <label>Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              required
            />
          </div>

          <div className="leave-field">
            <label>End Date *</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              min={form.startDate || undefined}
              onChange={onChange}
              required
            />
          </div>

          <div className="leave-field">
            <label>Total Leave Days</label>
            <div className="leave-days-display">
              <CalendarDays size={18} />
              <strong>{totalDays > 0 ? totalDays : 0} Days</strong>
            </div>
          </div>

          <div className="leave-field">
            <label>Contact During Leave *</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={onChange}
              placeholder="Phone number or address"
              required
            />
          </div>

          <div className="leave-field leave-full-width">
            <label>Remarks</label>
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={onChange}
              placeholder="Enter the reason for your leave..."
              rows="4"
            />
          </div>

          <div className="leave-field leave-full-width">
            <label>Supporting Document (Optional)</label>

            <label className="leave-upload">
              <Upload size={22} />
              <span>
                {form.document
                  ? form.document.name
                  : "Click to upload PDF, JPG or PNG (maximum 5 MB)"}
              </span>

              <input
                type="file"
                name="document"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={onChange}
                hidden
              />
            </label>
          </div>
        </div>

        <div className="leave-form-actions">
          <button
            type="button"
            className="leave-cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button type="submit" className="leave-primary-button">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
