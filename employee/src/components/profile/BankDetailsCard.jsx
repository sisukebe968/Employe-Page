
import { Landmark } from "lucide-react";

export default function BankDetailsCard({ bank }) {
  return (
    <section className="profile-section-card">
      <div className="profile-section-heading">
        <div className="profile-section-title-icon">
          <Landmark size={20} />
        </div>

        <div>
          <h3>Bank Details</h3>
          <p>Your registered salary payment information</p>
        </div>
      </div>

      <div className="profile-details-grid">
        <div className="profile-detail-item">
          <span>Bank Name</span>
          <p>{bank.bankName}</p>
        </div>

        <div className="profile-detail-item">
          <span>Account Holder</span>
          <p>{bank.accountHolder}</p>
        </div>

        <div className="profile-detail-item">
          <span>Account Number</span>
          <p>{bank.accountNumber}</p>
        </div>

        <div className="profile-detail-item">
          <span>Branch</span>
          <p>{bank.branch}</p>
        </div>
      </div>
    </section>
  );
}
