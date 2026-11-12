import { Heart, Award, CalendarDays } from "lucide-react";

export default function RecognitionList({ recognitions = [] }) {
  if (recognitions.length === 0) {
    return (
      <div className="module-empty-state">
        <Heart size={36} />
        <h3>No recognition records</h3>
        <p>Employee recognition announcements will appear here.</p>
      </div>
    );
  }

  return (
    <div className="recognition-list">
      {recognitions.map((item) => (
        <div className="recognition-item" key={item.id}>
          <div className="recognition-icon">
            <Award size={23} />
          </div>

          <div className="recognition-content">
            <div className="recognition-title-row">
              <h3>{item.title}</h3>
              <span className="recognition-label">Recognition</span>
            </div>

            <p>{item.message}</p>

            <div className="recognition-meta">
              <span><Heart size={14} /> {item.from}</span>
              <span><CalendarDays size={14} /> {item.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}