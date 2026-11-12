
import { Wallet, TrendingUp } from "lucide-react";

export default function SalarySummaryCard({
  grossSalary = 11200,
  netSalary = 7996,
}) {
  const formatCurrency = (amount) =>
    `ETB ${Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="salary-summary-card">
      <div className="salary-summary-icon">
        <Wallet size={23} />
      </div>

      <div>
        <p>Monthly Net Salary</p>
        <h2>{formatCurrency(netSalary)}</h2>
        <span>
          <TrendingUp size={15} />
          Gross: {formatCurrency(grossSalary)}
        </span>
      </div>
    </div>
  );
}
