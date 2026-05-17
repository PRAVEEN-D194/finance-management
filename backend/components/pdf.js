const PDFDocument = require('pdfkit');
const paymentSchema = require("../modules/paymentSchema");
const customerSchema = require("../modules/customerSchema");

const getpdf = async(req, res, next)=>{
    try{
        const id = req.params.id;
        const customer = await customerSchema.findById({_id:id});
        const payment = await paymentSchema.find({customerId:id});
        const paidamount = customer.totalAmount - customer.remainingAmount;

        const doc = new PDFDocument();//create new pdf

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            //`attachment; filename=${customer.name}.pdf`//this for pdf name eg. ravi.pdf auto download
            `inline; filename=${customer.name}.pdf`//not auto download only show
        );

        // Pipe PDF
        doc.pipe(res);//this for send the pdf to the browser

        // =========================
        // TITLE
        // =========================

        doc
            .fontSize(22)
            .text("Customer Payment Report", {
                align: "center"
            });

        doc.moveDown(2);

        // =========================
        // CUSTOMER DETAILS
        // =========================

        doc.fontSize(16);

        doc.text(`Customer Name : ${customer.name}`);
        doc.moveDown(0.5);

        doc.text(`Total Amount : Rs.${customer.totalAmount}`);
        doc.moveDown(0.5);

        doc.text(`Paid Amount : Rs.${paidamount}`);
        doc.moveDown(0.5);

        doc.text(`Remaining Amount : Rs.${customer.remainingAmount}`);
        doc.moveDown(1.5);



        // =========================
        // PAYMENT HISTORY TITLE
        // =========================

        doc
            .fontSize(18)
            .text("Payment History");

        doc.moveDown();

        // =========================
        // TABLE HEADER
        // =========================



        // Table Header
        doc.fontSize(14);

        const y = doc.y;

        doc.text("SI.NO", 50, y);
        doc.text("PAID AMOUNT", 120, y);
        doc.text("INTEREST", 280, y);
        doc.text("DATE", 400, y);

        doc.moveDown();

        // Line
        doc.moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

        doc.moveDown(0.5);

        // Table Rows
        payment.forEach((pay, index) => {

    // If page overflow
    if (doc.y > 700) {

        doc.addPage();

        // Table header again in new page
        let newY = doc.y;

        doc.fontSize(14);

        doc.text("SI.NO", 50, newY);
        doc.text("PAID AMOUNT", 120, newY);
        doc.text("INTEREST", 280, newY);
        doc.text("DATE", 400, newY);

        doc.moveDown();

        doc.moveTo(50, doc.y)
           .lineTo(550, doc.y)
           .stroke();

        doc.moveDown(0.5);
    }

    let rowY = doc.y;

    doc.fontSize(12);

    doc.text(index + 1, 50, rowY);

    doc.text(
        `Rs.${pay.paidAmount}`,
        120,
        rowY
    );

    doc.text(
        `Rs.${pay.Paidinterest}`,
        280,
        rowY
    );

    doc.text(
        pay.paidDate.toLocaleDateString(),
        400,
        rowY
    );

    doc.moveDown();

    // Row line
    doc.moveTo(50, doc.y)
       .lineTo(550, doc.y)
       .stroke();

    doc.moveDown(0.5);

});
        doc.end();


    }catch(err){
        res.status(500).json({
        message: err.message,
    });
    }
} 

module.exports = {getpdf:getpdf};