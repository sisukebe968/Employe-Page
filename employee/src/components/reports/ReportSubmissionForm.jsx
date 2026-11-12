import { useState } from "react";
import { Send, Upload, X } from "lucide-react";

const initialForm = {
  title: "",
  category: "Work Progress",
  description: "",
};

const categories = [
  "Work Progress",
  "Monthly Report",
  "Project Report",
  "Activity Report",
  "Technical Report",
  "Other",
];

export default function ReportSubmissionForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    setFile(selectedFile);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      setError("Please complete the required fields.");
      return;
    }

    onSubmit?.({
      ...form,
      file,
    });

    setForm(initialForm);
    setFile(null);
    setError("");
    event.target.reset();
  }

  return (
    <form className="module-form-card" onSubmit={handleSubmit}>
      <div className="module-section-heading">
        <div>
          <h2>Submit a Report</h2>
          <p>Complete the form below to submit your work report.</p>
        </div>
      </div>

      <div className="module-form-grid">
        <div className="module-form-group">
          <label>Report Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter report title"
            required
          />
        </div>

        <div className="module-form-group">
          <label>Report Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="module-form-group full-width">
          <label>Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="6"
            placeholder="Describe your work, activities, achievements, and challenges..."
            required
          />
        </div>

        <div className="module-form-group full-width">
          <label>Attach Report (Optional)</label>

          <label className="module-upload-area">
            <Upload size={24} />
            <span>
              {file ? file.name : "Click to upload a report"}
            </span>
            <small>PDF, DOC, DOCX or image · Maximum 5 MB</small>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              hidden
            />
          </label>

          {file && (
            <button
              type="button"
              className="module-remove-file"
              onClick={() => setFile(null)}
            >
              <X size={15} /> Remove file
            </button>
          )}
        </div>
      </div>

      {error && <p className="module-form-error">{error}</p>}

      <div className="module-form-actions">
        <button
          type="button"
          className="module-secondary-button"
          onClick={() => {
            setForm(initialForm);
            setFile(null);
            setError("");
          }}
        >
          Clear Form
        </button>

        <button type="submit" className="module-primary-button">
          <Send size={17} />
          Submit Report
        </button>
      </div>
    </form>
  );
}