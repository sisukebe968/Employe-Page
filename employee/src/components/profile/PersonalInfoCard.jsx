
import { useRef } from "react";
import { Camera, Trash2, UserRound } from "lucide-react";

export default function PersonalInfoCard({
  employee,
  photo,
  onPhotoChange,
  onRemovePhoto,
}) {
  const fileInputRef = useRef(null);

  return (
    <section className="profile-section-card">
      <div className="profile-section-heading">
        <h3>Personal Information</h3>
        <p>Your personal employee information</p>
      </div>

      <div className="profile-personal-header">
        <div className="profile-photo-wrapper">
          <div className="profile-photo">
            {photo ? (
              <img src={photo} alt="Employee" />
            ) : (
              <div className="profile-photo-placeholder">
                <UserRound size={42} />
                <span>Employee</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="profile-photo-delete"
            onClick={onRemovePhoto}
            title="Remove photo"
          >
            <Trash2 size={15} />
          </button>

          <button
            type="button"
            className="profile-photo-camera"
            onClick={() => fileInputRef.current?.click()}
            title="Change photo"
          >
            <Camera size={17} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onPhotoChange}
          />
        </div>

        <div className="profile-identity">
          <h3>{employee.name}</h3>
          <p className="profile-qualification">
            {employee.qualification}
          </p>

          <div className="profile-identity-meta">
            <span className="profile-status">{employee.status}</span>
            <span className="profile-employee-id">
              ID: {employee.employeeId}
            </span>
          </div>
        </div>

        <p className="profile-photo-hint">
          Click camera icon to change photo
        </p>
      </div>

      <div className="profile-details-grid">
        <div className="profile-detail-item">
          <span>Full Name</span>
          <p>{employee.name}</p>
        </div>

        <div className="profile-detail-item">
          <span>Gender</span>
          <p>{employee.gender}</p>
        </div>

        <div className="profile-detail-item">
          <span>Date of Birth</span>
          <p>{employee.dateOfBirth}</p>
        </div>

        <div className="profile-detail-item">
          <span>Qualification</span>
          <p>{employee.qualification}</p>
        </div>

        <div className="profile-detail-item">
          <span>Email Address</span>
          <p>{employee.email}</p>
        </div>

        <div className="profile-detail-item">
          <span>Phone Number</span>
          <p>{employee.phone}</p>
        </div>
      </div>
    </section>
  );
}
