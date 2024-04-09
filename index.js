require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/inference', async (req, res) => {
    const { s3_url, reference_text_id } = req.body;
    const apiKey = process.env.API_KEY;
    const apiUrl = process.env.API_URL;

    const data = {
        s3_url,
        reference_text_id
    };

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
    };

    try {
        const response = await axios.post(apiUrl, data, { headers });
        console.log('Response:', response.data);
        res.json({ success: true, message: 'API request successful', response: response.data });
    } catch (error) {
        console.error('Error:', error.response.data);
        res.status(500).json({ success: false, message: 'Failed to call API' });
    }

});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
