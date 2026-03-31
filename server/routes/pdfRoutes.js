const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');
const billData = require('../models/billData'); // Assuming you have a model for bill data

// Endpoint to generate and download PDF
router.get('/download-bill/:id', async (req, res) => {
    try {
        const bill = await billData.findById(req.params.id); // Fetch the bill data
        if (!bill) return res.status(404).send('Bill not found.');

        // HTML content for PDF
        const html = `<h1>Bill Summary</h1>\n<p>Bill ID: ${bill._id}</p>\n<p>Amount: ${bill.amount}</p>`;

        const options = { format: 'A4' };

        // Generate PDF
        pdf.create(html, options).toFile(`./${bill._id}.pdf`, (err, file) => {
            if (err) return res.send(Promise.reject(err));
            res.download(file.filename); // download PDF
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;