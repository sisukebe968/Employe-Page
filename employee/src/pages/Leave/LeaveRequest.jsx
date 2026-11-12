
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import LeaveBalanceSummery from "../../components/leave/LeaveBalanceSummery.jsx";
import LeaveHistoryTable from "../../components/leave/LeaveHistoryTable.jsx";
import LeaveRequestForm from "../../components/leave/LeaveRequestForm.jsx";

export default function LeaveRequest() {
  // Leave application requests
  const [requests, setRequests] = useState([]);

  // Show or hide application form
  const [showForm, setShowForm] = useState(false);

  // Form data
  const [form, setForm] = useState({
    leaveType: "Annual Leave",
    startDate: "",
    endDate: "",
    contact: "",
    remarks: "",
    document: null,
  });

  // Calculate total leave days
  const totalDays = useMemo(() => {
    if (!form.startDate || !form.endDate) {
      return 0;
    }

    const start = new Date(`${form.startDate}T00:00:00`);
    const end = new Date(`${form.endDate}T00:00:00`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return 0;
    }

    if (end < start) {
      return 0;
    }

    return Math.floor((end - start) / 86400000) + 1;
  }, [form.startDate, form.endDate]);

  // Handle all form inputs
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    // Handle supporting document
    if (name === "document") {
      const file = files?.[0];

      if (file && file.size > 5 * 1024 * 1024) {
        alert("Document must be smaller than 5 MB.");
        event.target.value = "";
        return;
      }

      if (file) {
        const allowedTypes = [
          "application/pdf",
          "image/jpeg",
          "image/png",
        ];

        if (!allowedTypes.includes(file.type)) {
          alert("Please upload a PDF, JPG, or PNG document.");
          event.target.value = "";
          return;
        }
      }

      setForm((previous) => ({
        ...previous,
        document: file || null,
      }));

      return;
    }

    // Handle text, date and select inputs
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit leave application
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.startDate || !form.endDate) {
      alert("Please select your leave start and end dates.");
      return;
    }

    if (totalDays < 1) {
      alert("Please select a valid leave date range.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      applicationNumber: `LV-${Date.now().toString().slice(-6)}`,
      leaveType: form.leaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      totalDays: totalDays,
      contact: form.contact,
      remarks: form.remarks,
      documentName: form.document?.name || "",
      status: "Pending",
      submittedAt: new Date().toLocaleDateString(),
    };

    // Add new request to the beginning of the list
    setRequests((previous) => [
      newRequest,
      ...previous,
    ]);

    // Reset application form
    setForm({
      leaveType: "Annual Leave",
      startDate: "",
      endDate: "",
      contact: "",
      remarks: "",
      document: null,
    });

    // Close form
    setShowForm(false);

    alert("Your leave application was submitted successfully!");
  };

  // Open leave application form
  const handleApply = () => {
    setShowForm(true);
  };

  // Close leave application form
  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="employee-content leave-page">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="leave-heading">
        <div>
          <span className="leave-eyebrow">
            EMPLOYEE SELF SERVICE
          </span>

          <h1>My Leave</h1>

          <p>
            Apply for leave and track your application status.
          </p>
        </div>

        <button
          type="button"
          className="leave-primary-button"
          onClick={() => setShowForm((previous) => !previous)}
        >
          <Plus size={18} />

          {showForm ? "Close Form" : "Apply for Leave"}
        </button>
      </div>

      {/* =====================================
          LEAVE BALANCE AND STATISTICS
      ====================================== */}

      <LeaveBalanceSummery
        requests={requests}
      />

      {/* =====================================
          LEAVE APPLICATION FORM
      ====================================== */}

      {showForm && (
        <LeaveRequestForm
          form={form}
          totalDays={totalDays}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {/* =====================================
          LEAVE REQUEST HISTORY
      ====================================== */}

      <LeaveHistoryTable
        requests={requests}
        onApply={handleApply}
      />

      {/* =====================================
          DEMO INFORMATION
      ====================================== */}

      <p className="leave-demo-note">
        Demo mode: Leave requests are temporarily stored
        in React state. They will reset when you refresh
        the page.
      </p>

    </div>
  );
}
