
import { CalendarDays, Download } from "lucide-react";

export default function PayslipTable({
  records = [],
  formatCurrency,
  onDownload,
}) {
  return (
    <div className="payroll-table-wrapper">
      <table className="payroll-table">
        <thead>
          <tr>
            <th>PAYROLL<br />MONTH</th>
            <th>GROSS<br />SALARY</th>
            <th>INCOME TAX<br />(ERCA)</th>
            <th>PENSION<br />(7%)</th>
            <th>OTHER<br />DEDUCT.</th>
            <th>NET SALARY<br />(ETB)</th>
            <th>STATUS</th>
            <th>GENERATE PAYSLIP</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <div className="payroll-month">
                  <CalendarDays size={19} />
                  <strong>{record.month}</strong>
                </div>
              </td>

              <td>
                <span className="payroll-currency">
                  {formatCurrency(record.grossSalary)}
                </span>
              </td>

              <td>
                <span className="payroll-tax">
                  {formatCurrency(record.incomeTax)}
                </span>
              </td>

              <td>
                <span className="payroll-pension">
                  {formatCurrency(record.pension)}
                </span>
              </td>

              <td>
                <span className="payroll-other">
                  {formatCurrency(record.otherDeductions)}
                </span>
              </td>

              <td>
                <strong className="payroll-net-salary">
                  {formatCurrency(record.netSalary)}
                </strong>
              </td>

              <td>
                <span
                  className={`payroll-status ${
                    record.status === "GENERATED"
                      ? "generated"
                      : "forwarded"
                  }`}
                >
                  {record.status}
                </span>
              </td>

              <td>
                <button
                  type="button"
                  className="payroll-download-button"
                  onClick={() => onDownload(record)}
                >
                  <Download size={17} />
                  <span>Download<br />Payslip</span>
                </button>
              </td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td colSpan="8" className="payroll-empty">
                No payroll records are available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
