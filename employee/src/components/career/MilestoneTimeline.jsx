import MilestoneCard from "./MilestoneCard.jsx";

export default function MilestoneTimeline({ milestones = [] }) {
  return (
    <div className="career-timeline">
      {milestones.map((milestone) => (
        <MilestoneCard
          key={milestone.id}
          milestone={milestone}
        />
      ))}

      {milestones.length === 0 && (
        <p>No career milestones available.</p>
      )}
    </div>
  );
}