import { useState } from "react";
import { Gift, Star, Award, Trophy, Sparkles } from "lucide-react";

import RewardCard from "../../components/rewards/RewardCard.jsx";
import BadgeShowcase from "../../components/rewards/BadgeShowcase.jsx";
import RecognitionList from "../../components/rewards/RecognitionList.jsx";

const rewards = [
  {
    id: 1,
    title: "Outstanding Performance",
    category: "Performance",
    description: "Recognition for excellent work and consistent results.",
    date: "October 2026",
    points: 100,
    icon: "Trophy",
  },
  {
    id: 2,
    title: "Teamwork Recognition",
    category: "Teamwork",
    description: "Awarded for collaboration and supporting colleagues.",
    date: "September 2026",
    points: 50,
    icon: "Star",
  },
  {
    id: 3,
    title: "Professional Development",
    category: "Development",
    description: "Recognition for learning and improving professional skills.",
    date: "August 2026",
    points: 75,
    icon: "Award",
  },
];

const badges = [
  {
    id: 1,
    name: "Top Performer",
    description: "For outstanding performance.",
    icon: "Trophy",
    color: "gold",
    earnedDate: "October 2026",
  },
  {
    id: 2,
    name: "Team Player",
    description: "For excellent teamwork.",
    icon: "Star",
    color: "blue",
    earnedDate: "September 2026",
  },
  {
    id: 3,
    name: "Dedicated Employee",
    description: "For commitment and dedication.",
    icon: "ShieldCheck",
    color: "green",
    earnedDate: "August 2026",
  },
];

const recognitions = [
  {
    id: 1,
    title: "Excellent Project Contribution",
    message:
      "Your contribution and commitment helped the department complete its assigned activities successfully.",
    from: "Department Management",
    date: "October 25, 2026",
  },
  {
    id: 2,
    title: "Appreciation for Teamwork",
    message:
      "Thank you for your cooperation, support, and positive contribution to the team.",
    from: "Human Resources",
    date: "September 18, 2026",
  },
];

export default function RewardsAndRecognition() {
  const [activeTab, setActiveTab] = useState("Rewards");

  const totalPoints = rewards.reduce(
    (total, reward) => total + reward.points,
    0
  );

  return (
    <div className="employee-module-page">
      <div className="module-page-heading">
        <div>
          <span className="module-eyebrow">EMPLOYEE SERVICES</span>
          <h1>Rewards & Recognition</h1>
          <p>Celebrate achievements, performance, and contributions.</p>
        </div>
      </div>

      <div className="rewards-welcome-banner">
        <div>
          <span>YOUR ACHIEVEMENTS</span>
          <h2>Keep up the great work!</h2>
          <p>Your dedication and contribution make a difference.</p>
        </div>
        <div className="rewards-banner-icon">
          <Sparkles size={42} />
        </div>
      </div>

      <div className="module-stats-grid">
        <div className="module-stat-card">
          <div className="module-stat-icon gold"><Star /></div>
          <div>
            <span>Total Reward Points</span>
            <h2>{totalPoints}</h2>
          </div>
        </div>

        <div className="module-stat-card">
          <div className="module-stat-icon blue"><Award /></div>
          <div>
            <span>Badges Earned</span>
            <h2>{badges.length}</h2>
          </div>
        </div>

        <div className="module-stat-card">
          <div className="module-stat-icon green"><Gift /></div>
          <div>
            <span>Rewards Received</span>
            <h2>{rewards.length}</h2>
          </div>
        </div>

        <div className="module-stat-card">
          <div className="module-stat-icon orange"><Trophy /></div>
          <div>
            <span>Recognitions</span>
            <h2>{recognitions.length}</h2>
          </div>
        </div>
      </div>

      <div className="module-content-card">
        <div className="module-tabs">
          {["Rewards", "Badges", "Recognition"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "module-tab active" : "module-tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Rewards" && (
          <div className="rewards-card-grid">
            {rewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        )}

        {activeTab === "Badges" && (
          <BadgeShowcase badges={badges} />
        )}

        {activeTab === "Recognition" && (
          <RecognitionList recognitions={recognitions} />
        )}
      </div>

      <div className="module-help-note">
        <Gift size={18} />
        <span>
          Rewards and recognition shown here are demonstration records. They
          can later be loaded from your HRMS backend.
        </span>
      </div>
    </div>
  );
}