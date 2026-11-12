
export default function DeductionBreakdown({
  payslip,
  formatCurrency,
}) {
  const deductions = [
    {
      label: "Income Tax (ERCA)",
      amount: payslip.incomeTax,
      className: "tax",
    },
    {
      label: "Employee Pension (7%)",
      amount: payslip.pension,
      className: "pension",
    },
    {
      label: "Other Deductions",
      amount: payslip.otherDeductions,
      className: "other",
    },
  ];

  return (
    <div className="payslip-breakdown">
      <h3>Salary &amp; Deduction Breakdown</h3>

      <div className="payslip-breakdown-row gross">
        <span>Gross Salary</span>
        <strong>{formatCurrency(payslip.grossSalary)}</strong>
      </div>

      {deductions.map((item) => (
        <div
          className="payslip-breakdown-row"
          key={item.label}
        >
          <span>{item.label}</span>
          <strong className={item.className}>
            - {formatCurrency(item.amount)}
          </strong>
        </div>
      ))}

      <div className="payslip-breakdown-total">
        <span>Net Salary</span>
        <strong>{formatCurrency(payslip.netSalary)}</strong>
      </div>
    </div>
  );
}
