
import { BriefcaseBusiness } from "lucide-react";

export default function EmploymentDetailsCard({ employee }) {
  return (
    <section className="profile-section-card">
      <div className="profile-section-heading">
        <div className="profile-section-title-icon">
          <BriefcaseBusiness size={20} />
        </div>

        <div>
          <h3>Employment Details</h3>
          <p>Your official employment information</p>
        </div>
      </div>

      <div className="profile-details-grid">
        <div className="profile-detail-item">
          <span>Employee ID</span>
          <p>{employee.employeeId}</p>
        </div>

        <div className="profile-detail-item">
          <span>Civil Department</span>
          <p>{employee.department}</p>
        </div>

        <div className="profile-detail-item">
          <span>Job Grade</span>
          <p>{employee.grade}</p>
        </div>

        <div className="profile-detail-item">
          <span>Salary Scale</span>
          <p>{employee.salary}</p>
        </div>

        <div className="profile-detail-item">
          <span>Employment Type</span>
          <p>{employee.employmentType}</p>
        </div>

        <div className="profile-detail-item">
          <span>Official Hired Date</span>
          <p>{employee.hiredDate}</p>
        </div>
      </div>
    </section>
  );
}
