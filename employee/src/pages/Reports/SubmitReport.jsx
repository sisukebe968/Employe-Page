import { useState } from "react";
import { CheckCircle2, FileText, Info } from "lucide-react";

import ReportSubmissionForm from "../../components/reports/ReportSubmissionForm.jsx";

export default function SubmitReport() {
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(report) {
    // Frontend demonstration only.
    // Connect this function to your backend API when it is ready.
    console.log("Submitted report:", report);

    setSuccessMessage("Your report has been submitted successfully.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="employee-module-page">
      <div className="module-page-heading">
        <div>
          <span className="module-eyebrow">EMPLOYEE SERVICES</span>
          <h1>Submit Report</h1>
          <p>Send your work progress and activity reports to HR.</p>
        </div>
      </div>

      {successMessage && (
        <div className="module-success-message">
          <CheckCircle2 size={20} />
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage("")}>×</button>
        </div>
      )}

      <div className="module-info-banner">
        <Info size={20} />
        <div>
          <strong>Before submitting</strong>
          <p>
            Make sure your report information is correct. Your report will be
            marked as pending until it has been reviewed.
          </p>
        </div>
      </div>

      <ReportSubmissionForm onSubmit={handleSubmit} />

      <div className="module-help-note">
        <FileText size={18} />
        <span>
          You can check the progress of your submitted reports from the My
          Reports page.
        </span>
      </div>
    </div>
  );
}