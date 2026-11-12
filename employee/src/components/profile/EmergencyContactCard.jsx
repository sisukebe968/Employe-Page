
import { ContactRound, Phone } from "lucide-react";

export default function EmergencyContactCard({ contact }) {
  return (
    <section className="profile-section-card">
      <div className="profile-section-heading">
        <div className="profile-section-title-icon">
          <ContactRound size={20} />
        </div>

        <div>
          <h3>Emergency Contact</h3>
          <p>Person to contact in case of emergency</p>
        </div>
      </div>

      <div className="profile-details-grid">
        <div className="profile-detail-item">
          <span>Contact Name</span>
          <p>{contact.name}</p>
        </div>

        <div className="profile-detail-item">
          <span>Relationship</span>
          <p>{contact.relationship}</p>
        </div>

        <div className="profile-detail-item">
          <span>Phone Number</span>
          <p className="profile-contact-phone">
            <Phone size={15} />
            {contact.phone}
          </p>
        </div>

        <div className="profile-detail-item">
          <span>Address</span>
          <p>{contact.address}</p>
        </div>
      </div>
    </section>
  );
}
