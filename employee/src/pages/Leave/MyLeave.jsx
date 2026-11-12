
import { useMemo, useState } from "react";
import { Plus, CalendarDays } from "lucide-react";

import LeaveBalanceSummery from "../../components/leave/LeaveBalanceSummery.jsx";
import LeaveHistoryTable from "../../components/leave/LeaveHistoryTable.jsx";
import LeaveRequestForm from "../../components/leave/LeaveRequestForm.jsx";

export default function MyLeave() {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    leaveType: "Annual Leave",
    startDate: "",
    endDate: "",
    contact: "",
    remarks: "",
    document: null,
  });

  const totalDays = useMemo(() => {
    if (!form.startDate || !form.endDate) return 0;

    const start = new Date(`${form.startDate}T00:00:00`);
    const end = new Date(`${form.endDate}T00:00:00`);

    const difference = end.getTime() - start.getTime();

    if (difference < 0) return 0;

    return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
  }, [form.startDate, form.endDate]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "document") {
      const file = files?.[0];

      if (!file) return;

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF, JPG or PNG file.");
        event.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size must not exceed 5 MB.");
        event.target.value = "";
        return;
      }

      setForm((previous) => ({
        ...previous,
        document: file,
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      leaveType: "Annual Leave",
      startDate: "",
      endDate: "",
      contact: "",
      remarks: "",
      document: null,
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const handleApply = () => {
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.startDate || !form.endDate) {
      alert("Please select your leave dates.");
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
      totalDays,
      contact: form.contact,
      remarks: form.remarks,
      documentName: form.document?.name || "",
      status: "Pending",
      submittedAt: new Date().toLocaleDateString(),
    };

    setRequests((previous) => [newRequest, ...previous]);

    resetForm();
    setShowForm(false);

    alert("Your leave application has been submitted successfully!");
  };

  return (
    <div className="leave-page">
      <div className="leave-heading">
        <div>
          <span className="leave-eyebrow">EMPLOYEE PORTAL</span>
          <h2>My Leave</h2>
          <p>Manage your leave balance and applications.</p>
        </div>

        <button
          type="button"
          className="leave-primary-button"
          onClick={handleApply}
        >
          <Plus size={18} />
          Apply for Leave
        </button>
      </div>

      <LeaveBalanceSummery requests={requests} />

      {showForm && (
        <LeaveRequestForm
          form={form}
          totalDays={totalDays}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <LeaveHistoryTable
        requests={requests}
        onApply={handleApply}
      />

      <div className="leave-demo-note">
        <CalendarDays size={18} />
        <span>
          This is a frontend demonstration. Your leave requests
          are stored temporarily and will reset when you refresh
          the page.
        </span>
      </div>
    </div>
  );
}
