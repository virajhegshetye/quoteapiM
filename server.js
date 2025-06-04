const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/creditcard/apply', (req, res) => {
    const { name, income, phone } = req.body;
    let decision = null;  // Use `let` for decision
    let crediLimit = null; 
    let apr = null; 
    let reasconCode = null; 
    let product = null;

    // Check if the name is provided and is valid
    if (name && name.trim().length > 0) {
        const lowerCaseName = name.toLowerCase();
        // Custom logic for specific names
        if (lowerCaseName === 'viraj') {
            decision = "ACCEPT";
            crediLimit = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit integer (1000 to 9999)
            apr = "29%";
            product = "REWARDS";
        } else if (lowerCaseName === 'deepak') {
            decision = "DECLINE";
            reasconCode = "MIN_INC_DEC";
        } else if (lowerCaseName === 'rajshree') {
            decision = "DECLINE";
            reasconCode = "MIN_AGE_DEC";
        } else if (lowerCaseName === 'aditya') {
            decision = "REFER";
            reasconCode = "MULTI_NAME_MATCH";
        }
    }

    // If no decision was set, return an error
    if (decision === null) {
        return res.status(400).json({ error: 'Invalid name provided for application.' });
    }

    // Generate a unique quotation ID
    const quotationId = `QUOT-${Math.random().toString(36).substring(2, 8)}`;

    // Prepare the response data
    const response = { name, phone, quotationId, decision };

    // Conditionally add properties if they are not null
    if (crediLimit !== null) response.crediLimit = crediLimit;
    if (apr !== null) response.apr = apr;
    if (reasconCode !== null) response.reasconCode = reasconCode;
    if (product !== null) response.product = product;

    // Send the response
    res.json(response);
});

app.listen(8443, () => console.log('Mock Quotation API running on port 3000'));
