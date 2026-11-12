import { useState } from "react";
import {
  UserRound,
  BriefcaseBusiness,
  Building2,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  IdCard,
  GraduationCap,
  Camera,
  Save,
} from "lucide-react";

import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Alert from "../../components/common/Alert.jsx";

export default function MyProfile() {
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");

  const [employee, setEmployee] = useState({
    fullName: "Tiblet Alemayehu",
    employeeId: "T2323",
    email: "employee@example.com",
    phone: "+251 900 000 000",
    gender: "Female",
    department: "Cybersecurity & Quality Assurance",
    position: "IT Associate",
    employmentType: "Permanent",
    grade: "Grade II (Associate)",
    education: "Bachelor Degree",
    address: "Hawassa, Ethiopia",
    joiningDate: "2024-01-15",
  });

  const handleChange = (event) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Profile changes saved in this demo session.");
  };

  const fields = [
    ["fullName", "Full Name", UserRound],
    ["employeeId", "Employee ID", IdCard],
    ["email", "Email Address", Mail],
    ["phone", "Phone Number", Phone],
    ["department", "Department", Building2],
    ["position", "Position", BriefcaseBusiness],
    ["grade", "Job Grade", AwardIcon],
    ["education", "Education", GraduationCap],
    ["address", "Address", MapPin],
    ["joiningDate", "Joining Date", CalendarDays],
  ];

  return (
    <div className="my-profile-page">
      <div className="module-heading">
        <div>
          <span className="module-eyebrow">EMPLOYEE SELF SERVICE</span>
          <h1>My Profile</h1>
          <p>View and update your personal information.</p>
        </div>
      </div>

      {message && (
        <Alert type="success" onClose={() => setMessage("")}>
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card title="Employee Information" subtitle="Your official employee details">
          <div className="profile-photo-section">
            <div className="profile-photo">
              {photo ? (
                <img src={photo} alt="Employee profile" />
              ) : (
                <UserRound size={38} />
              )}
            </div>

            <label className="common-button secondary">
              <Camera size={17} />
              Change Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhoto}
              />
            </label>
          </div>

          <div className="module-form-grid">
            {fields.map(([name, label, Icon]) => (
              <label className="module-field" key={name}>
                <span>{label}</span>
                <div className="module-input-icon">
                  <Icon size={17} />
                  <input
                    name={name}
                    value={employee[name]}
                    onChange={handleChange}
                    readOnly={name === "employeeId"}
                  />
                </div>
              </label>
            ))}

            <label className="module-field">
              <span>Gender</span>
              <select
                name="gender"
                value={employee.gender}
                onChange={handleChange}
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </label>

            <label className="module-field">
              <span>Employment Type</span>
              <input value={employee.employmentType} readOnly />
            </label>
          </div>
        </Card>

        <div className="module-form-actions">
          <Button type="submit">
            <Save size={17} />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

function AwardIcon(props) {
  return <BriefcaseBusiness {...props} />;
}