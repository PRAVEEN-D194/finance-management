const PDFDocument = require("pdfkit");
const paymentSchema = require("../modules/paymentSchema");
const customerSchema = require("../modules/customerSchema");

const getpdf = async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await customerSchema.findById(id);
    const payment = await paymentSchema.find({ customerId: id });

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${customer.name}.pdf`
    );

    doc.pipe(res);

    // ================= HEADER =================
    doc.fontSize(22).text("CUSTOMER LOAN REPORT", { align: "center" });
    doc.moveDown(2);

    // ================= CALCULATIONS =================
    const totalAmount = customer.totalAmount || 0;
    const interestPercent = customer.interestPercent || 0;
    const remaining = customer.remainingAmount || 0;
    const paidInterest = customer.paidinterest || 0;

    const interestAmount = (totalAmount * interestPercent) / 100;
    const totalWithInterest = totalAmount + interestAmount;

    const paidPrincipal = totalAmount - remaining;
    const totalPaid = paidPrincipal + paidInterest;

    // ================= CUSTOMER SECTION =================
    doc.fontSize(16).text("CUSTOMER DETAILS");
    doc.moveDown(1);

    doc.fontSize(12);
    doc.text(`Name: ${customer.name}`);
    doc.text(`Joined: ${new Date(customer.createdAt).toLocaleDateString()}`);
    doc.moveDown(1.5);

    // ================= LOAN OVERVIEW =================
    doc.fontSize(16).text(" LOAN OVERVIEW");
    doc.moveDown(1);

    doc.fontSize(12);
    doc.text(`Principal Amount: Rs.${totalAmount}`);
    doc.text(`Remaining Principal: Rs.${remaining}`);
    doc.text(`Interest Rate: ${interestPercent}%`);
    doc.moveDown(1);

    doc.text(`Paid Principal: Rs.${paidPrincipal}`);
    doc.text(`Paid Interest: Rs.${paidInterest}`);
    doc.text(`Total Paid: Rs.${totalPaid}`);

    doc.moveDown(2);

    // ================= PAYMENT HISTORY =================
    doc.fontSize(16).text("PAYMENT HISTORY");
    doc.moveDown(1);

    // Table Header
    doc.fontSize(12);

    let y = doc.y;

    doc.text("No", 50, y);
    doc.text("Principal", 100, y);
    doc.text("Interest", 220, y);
    doc.text("Balance", 330, y);
    doc.text("Date", 450, y);

    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    // ================= TABLE ROWS =================
    payment.forEach((pay, index) => {
      if (doc.y > 700) {
        doc.addPage();
      }

      let rowY = doc.y;

      doc.text(index + 1, 50, rowY);
      doc.text(`Rs.${pay.paidAmount || 0}`, 100, rowY);
      doc.text(`Rs.${pay.Paidinterest || 0}`, 220, rowY);
      doc.text(`Rs.${pay.remainingBalance || 0}`, 330, rowY);
      doc.text(
        new Date(pay.paidDate).toLocaleDateString(),
        450,
        rowY
      );

      doc.moveDown();
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.3);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { getpdf };