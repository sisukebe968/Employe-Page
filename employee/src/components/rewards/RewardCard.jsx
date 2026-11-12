import { Gift, Star, Award } from "lucide-react";

export default function RewardCard({ reward }) {
  const icons = {
    Gift,
    Star,
    Award,
  };

  const Icon = icons[reward.icon] || Gift;

  return (
    <div className="reward-card">
      <div className="reward-card-icon">
        <Icon size={25} />
      </div>

      <div className="reward-card-content">
        <span className="reward-card-category">{reward.category}</span>
        <h3>{reward.title}</h3>
        <p>{reward.description}</p>

        <div className="reward-card-footer">
          <span>{reward.date}</span>
          <strong>{reward.points} Points</strong>
        </div>
      </div>
    </div>
  );
}