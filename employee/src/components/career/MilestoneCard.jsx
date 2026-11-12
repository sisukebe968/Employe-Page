import { Award, CalendarDays } from "lucide-react";
import Badge from "../common/Badge.jsx";

export default function MilestoneCard({ milestone }) {
  return (
    <article className="career-milestone-card">
      <div className="career-milestone-icon">
        <Award size={23} />
      </div>

      <div className="career-milestone-content">
        <Badge color="gold">{milestone.type}</Badge>
        <h3>{milestone.title}</h3>
        <p>{milestone.description}</p>

        <span>
          <CalendarDays size={15} />
          {milestone.date}
        </span>
      </div>
    </article>
  );
}