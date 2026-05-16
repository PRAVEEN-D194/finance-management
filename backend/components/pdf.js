const PDFDocument = require('pdfkit');
const paymentSchema = require("../modules/paymentSchema");
const customerSchema = require("../modules/customerSchema");

const getpdf = async(req, res, next)=>{
    try{
        const id = req.params.id;
        const customer = await customerSchema.findById({_id:id});
        const payment = await paymentSchema.find({customerId:id});

        const doc = new PDFDocument();//create new pdf

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${customer.name}.pdf`//this for pdf name eg. ravi.pdf
        );

        // Pipe PDF
        doc.pipe(res);//this for send the pdf to the browser

        // Title
        doc
        .fontSize(22)
        .text("Customer Payment History");

        doc.moveDown();//move next line

        // Customer Details
        doc.fontSize(16).text(
            `Name: ${customer.name}`
        );
        doc.text(
            `Total Amount: Rs.${customer.totalAmount}`
        );

        doc.text(
            `Remaining Balance: Rs.${customer.remainingAmount}`
        );

        doc.moveDown();

        // Payment History
        doc
            .fontSize(18)
            .text("Payment History");

        doc.moveDown();//move next line

        payment.forEach((payment, index)=>{
            doc
                .fontSize(14)
                .text(
                    `${index+1}.
                        Paid Amount: Rs.${payment.paidAmount}
                        | Interest: Rs.${payment.Paidinterest}
                        | Date: ${payment.paidDate.toLocaleDateString()}
                    `
                )
                doc.moveDown();
        })
       
        doc.end();


    }catch(err){
        res.status(500).json({
        message: err.message,
    });
    }
} 

module.exports = {getpdf:getpdf};