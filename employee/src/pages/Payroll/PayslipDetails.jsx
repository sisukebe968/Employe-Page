
import { FileText, CalendarDays, UserRound } from "lucide-react";
import DeductionBreakdown from "../../components/payroll/DeductionBreakdown.jsx";

export default function PayslipDetails({
  payslip,
  employee,
  formatCurrency,
}) {
  return (
    <div className="payslip-details">
      <div className="payslip-document-heading">
        <div className="payslip-document-logo">H</div>
        <div>
          <h2>Hadiya Science IT Department</h2>
          <p>Employee Salary Statement</p>
        </div>
      </div>

      <div className="payslip-document-title">
        <FileText size={23} />
        <div>
          <h2>PAYSLIP</h2>
          <p>Payroll period: {payslip.month}</p>
        </div>
      </div>

      <div className="payslip-employee-details">
        <div>
          <UserRound size={18} />
          <span>Employee Information</span>
        </div>

        <p><strong>Employee Name:</strong> {employee.name}</p>
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Position:</strong> {employee.position}</p>
      </div>

      <div className="payslip-period">
        <CalendarDays size={18} />
        <span>Payment Date: {payslip.paymentDate}</span>
      </div>

      <DeductionBreakdown
        payslip={payslip}
        formatCurrency={formatCurrency}
      />

      <div className="payslip-bank-details">
        <h3>Bank Information</h3>
        <p><strong>Bank:</strong> {employee.bankName}</p>
        <p><strong>Account Number:</strong> {employee.accountNumber}</p>
      </div>

      <div className="payslip-footer">
        <p>
          This is a computer-generated salary statement.
        </p>
        <p>Hadiya Science IT Department</p>
      </div>
    </div>
  );
}
