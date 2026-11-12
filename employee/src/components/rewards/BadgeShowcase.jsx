import { Award, Star, ShieldCheck, Trophy, Medal } from "lucide-react";

const badgeIcons = {
  Award,
  Star,
  ShieldCheck,
  Trophy,
  Medal,
};

export default function BadgeShowcase({ badges = [] }) {
  if (badges.length === 0) {
    return (
      <div className="module-empty-state">
        <Award size={36} />
        <h3>No badges yet</h3>
        <p>Your earned badges will appear here.</p>
      </div>
    );
  }

  return (
    <div className="badge-showcase-grid">
      {badges.map((badge) => {
        const Icon = badgeIcons[badge.icon] || Award;

        return (
          <div className="badge-showcase-item" key={badge.id}>
            <div className={`badge-medal ${badge.color || "gold"}`}>
              <Icon size={30} />
            </div>

            <h3>{badge.name}</h3>
            <p>{badge.description}</p>
            <span>{badge.earnedDate || "Recently earned"}</span>
          </div>
        );
      })}
    </div>
  );
}