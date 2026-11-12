import { Award, BriefcaseBusiness, TrendingUp } from "lucide-react";

import Card from "../../components/common/Card.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import MilestoneTimeline from "../../components/career/MilestoneTimeline.jsx";
import PromotionHistory from "../../components/career/PromotionHistory.jsx";

const milestones = [
  {
    id: 1,
    title: "Joined the Organization",
    description: "Started employment with the organization.",
    date: "January 15, 2024",
    type: "Employment",
  },
  {
    id: 2,
    title: "Completed Professional Training",
    description: "Completed an internal professional development program.",
    date: "June 20, 2025",
    type: "Training",
  },
  {
    id: 3,
    title: "Annual Performance Review",
    description: "Annual employee performance evaluation completed.",
    date: "October 10, 2026",
    type: "Performance",
  },
];

const promotions = [
  {
    id: 1,
    position: "IT Associate",
    department: "Cybersecurity & Quality Assurance",
    date: "January 15, 2024",
    status: "Current Position",
  },
];

export default function CareerMilestones() {
  return (
    <div className="module-page">
      <div className="module-heading">
        <div>
          <span className="module-eyebrow">EMPLOYEE DEVELOPMENT</span>
          <h1>Career Milestones</h1>
          <p>Track your professional journey and career development.</p>
        </div>
      </div>

      <div className="module-stats-grid">
        <StatCard
          title="Career Milestones"
          value={milestones.length}
          icon={Award}
          color="gold"
          subtitle="Recorded achievements"
        />

        <StatCard
          title="Promotions"
          value={promotions.length}
          icon={TrendingUp}
          color="green"
          subtitle="Career progression"
        />

        <StatCard
          title="Current Position"
          value="IT Associate"
          icon={BriefcaseBusiness}
          color="blue"
          subtitle="Current role"
        />
      </div>

      <div className="career-page-grid">
        <Card
          title="Career Timeline"
          subtitle="Important events in your career"
        >
          <MilestoneTimeline milestones={milestones} />
        </Card>

        <Card
          title="Promotion History"
          subtitle="Your position history"
        >
          <PromotionHistory promotions={promotions} />
        </Card>
      </div>
    </div>
  );
}