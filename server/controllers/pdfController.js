// pdfController.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

/**
 * Generates a PDF document and saves it to the specified path.
 * @param {String} path - The path where the PDF will be saved.
 * @param {Object} data - The data to be included in the PDF.
 */
function generatePDF(path, data) {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(path));

    doc.fontSize(25).text('PDF Generation Example', 100, 80);
    doc.fontSize(12).text(`Date: ${new Date().toLocaleString()}`, 100, 120);

    // Add data to PDF
    if (data && data.content) {
        doc.text(data.content, 100, 160);
    }

    doc.end();
}

module.exports = { generatePDF };