import Badge from "../common/Badge.jsx";

export default function PromotionHistory({ promotions = [] }) {
  return (
    <div className="promotion-list">
      {promotions.map((promotion) => (
        <div className="promotion-item" key={promotion.id}>
          <div>
            <h4>{promotion.position}</h4>
            <p>{promotion.department}</p>
            <small>{promotion.date}</small>
          </div>

          <Badge color="green">{promotion.status}</Badge>
        </div>
      ))}

      {!promotions.length && (
        <p>No promotion history available.</p>
      )}
    </div>
  );
}