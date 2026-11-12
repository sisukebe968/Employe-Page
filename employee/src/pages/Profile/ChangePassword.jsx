
import { useState } from "react";
import {
  LockKeyhole,
  Save,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Alert from "../../components/common/Alert.jsx";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const togglePassword = (field) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.currentPassword.trim()) {
      setMessage("Please enter your current password.");
      return;
    }

    if (form.newPassword.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (form.newPassword === form.currentPassword) {
      setMessage("New password must be different from your current password.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    setMessage(
      "Password validation successful. Backend integration is required to save your new password."
    );

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleClear = () => {
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setMessage("");
  };

  const passwordFields = [
    {
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter your current password",
    },
    {
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter your new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Confirm your new password",
    },
  ];

  return (
    <div className="module-page">
      <div className="module-heading">
        <div>
          <span className="module-eyebrow">ACCOUNT SECURITY</span>
          <h1>Change Password</h1>
          <p>Update your password to keep your employee account secure.</p>
        </div>
      </div>

      {message && (
        <Alert type="info" onClose={() => setMessage("")}>
          {message}
        </Alert>
      )}

      <div className="module-narrow">
        <Card title="Update Your Password">
          <div className="security-information">
            <ShieldCheck size={25} />
            <p>
              Choose a strong password with at least 8 characters.
              Do not share your password with anyone.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="module-form">
            {passwordFields.map((field) => (
              <label className="module-field" key={field.name}>
                <span>{field.label}</span>

                <div className="module-input-icon">
                  <LockKeyhole size={17} />

                  <input
                    type={
                      showPasswords[field.name] ? "text" : "password"
                    }
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    minLength={
                      field.name === "currentPassword" ? 1 : 8
                    }
                    autoComplete="off"
                  />

                  <button
                    type="button"
                    onClick={() => togglePassword(field.name)}
                    aria-label={
                      showPasswords[field.name]
                        ? "Hide password"
                        : "Show password"
                    }
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#64748b",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPasswords[field.name] ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>
            ))}

            <div className="password-requirements">
              <ShieldCheck size={19} />
              <div>
                <strong>Password requirements</strong>
                <ul>
                  <li>At least 8 characters.</li>
                  <li>Must be different from your current password.</li>
                  <li>Confirmation must match your new password.</li>
                </ul>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <Button type="button" variant="secondary" onClick={handleClear}>
                Clear
              </Button>

              <Button type="submit">
                <Save size={17} />
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
