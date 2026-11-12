
import { useState } from "react";
import { CalendarDays, Download } from "lucide-react";

import PayslipTable from "../../components/payroll/PayslipTable.jsx";
import PayslipModal from "../../components/payroll/PayslipModal.jsx";

const payrollRecords = [
  {
    id: 1,
    month: "2026-10",
    grossSalary: 11200,
    incomeTax: 2420,
    pension: 784,
    otherDeductions: 0,
    netSalary: 7996,
    status: "FORWARDED_TO_FINANCE",
    paymentDate: "October 30, 2026",
  },
  {
    id: 2,
    month: "2026-09",
    grossSalary: 11200,
    incomeTax: 2420,
    pension: 784,
    otherDeductions: 0,
    netSalary: 7996,
    status: "GENERATED",
    paymentDate: "September 30, 2026",
  },
];

const employee = {
  name: "Tiblet Alemayehu",
  employeeId: "T2323",
  department: "Cybersecurity & Quality Assurance",
  position: "Associate Officer",
  bankName: "Commercial Bank of Ethiopia",
  accountNumber: "********1234",
};

export default function MyPayroll() {
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const formatCurrency = (amount) =>
    `ETB ${Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="employee-content payroll-page">
      <div className="payroll-heading">
        <div>
          <h1>My Compensation &amp; Payslips</h1>
          <p>
            Review your gross earnings, statutory tax deductions
            (ERCA), 7% pension, and export digital payslips.
          </p>
        </div>
      </div>

      <section className="payroll-table-card">
        <PayslipTable
          records={payrollRecords}
          formatCurrency={formatCurrency}
          onDownload={setSelectedPayslip}
        />
      </section>

      {selectedPayslip && (
        <PayslipModal
          payslip={selectedPayslip}
          employee={employee}
          onClose={() => setSelectedPayslip(null)}
          formatCurrency={formatCurrency}
        />
      )}

      <div className="payroll-demo-note">
        <CalendarDays size={17} />
        <span>
          Demo payroll data. Salary records are currently displayed
          from sample frontend data and are not connected to the
          organization's payroll database.
        </span>
      </div>
    </div>
  );
}
