
import { useRef } from "react";
import { X, Download, Printer } from "lucide-react";
import PayslipDetails from "../../pages/Payroll/PayslipDetails.jsx";

export default function PayslipModal({
  payslip,
  employee,
  onClose,
  formatCurrency,
}) {
  const payslipRef = useRef(null);

  const handleDownload = () => {
    const content = payslipRef.current?.innerHTML;

    if (!content) return;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to download your payslip.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payslip-${payslip.month}</title>
          <meta charset="UTF-8" />
          <style>
            * { box-sizing: border-box; }
            body {
              font-family: Arial, sans-serif;
              color: #172033;
              padding: 30px;
              max-width: 850px;
              margin: auto;
            }
            h2, h3, p { margin-top: 0; }
            .payslip-document-heading,
            .payslip-document-title {
              display: flex;
              align-items: center;
              gap: 15px;
              margin-bottom: 25px;
            }
            .payslip-document-logo {
              width: 50px;
              height: 50px;
              display: grid;
              place-items: center;
              border-radius: 50%;
              background: #1e3a5f;
              color: white;
              font-size: 24px;
              font-weight: bold;
            }
            .payslip-document-heading p,
            .payslip-document-title p {
              color: #64748b;
              margin-bottom: 0;
            }
            .payslip-employee-details,
            .payslip-bank-details {
              border: 1px solid #dbe2ea;
              padding: 18px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .payslip-period { margin: 18px 0; }
            .payslip-breakdown-row,
            .payslip-breakdown-total {
              display: flex;
              justify-content: space-between;
              padding: 12px 5px;
              border-bottom: 1px solid #e2e8f0;
            }
            .payslip-breakdown-total {
              font-size: 18px;
              font-weight: bold;
              color: #00833e;
            }
            .payslip-footer {
              margin-top: 35px;
              padding-top: 15px;
              border-top: 1px solid #ddd;
              text-align: center;
              color: #64748b;
              font-size: 12px;
            }
            .tax { color: #dc2626; }
            .pension { color: #c27803; }
            .other { color: #64748b; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div className="payslip-modal-overlay" onClick={onClose}>
      <div
        className="payslip-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="payslip-modal-header">
          <div>
            <h2>Payslip Details</h2>
            <p>Payroll period: {payslip.month}</p>
          </div>

          <button
            type="button"
            className="payslip-close-button"
            onClick={onClose}
            aria-label="Close payslip"
          >
            <X size={22} />
          </button>
        </div>

        <div className="payslip-modal-body">
          <div ref={payslipRef}>
            <PayslipDetails
              payslip={payslip}
              employee={employee}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>

        <div className="payslip-modal-footer">
          <button
            type="button"
            className="payslip-cancel-button"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="payslip-print-button"
            onClick={handleDownload}
          >
            <Download size={17} />
            Download / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
}
