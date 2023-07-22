const express = require('express');
const axios = require('axios');
const app = express();
const port = 8008;

app.use(express.json());

const isValidUrl = (url) => {
    const urlPattern = /^(http:\/\/|https:\/\/)([\w.-]+(\.[\w.-]+)*)(\:[0-9]+)?(\/.*)?$/;
    return urlPattern.test(url);
};

const fetchNumbersFromUrl = async (url) => {
    try {
        const response = await axios.get(url, { timeout: 500 });
        if (response.status === 200) {
            return response.data.numbers || [];
        }
    } catch (error) {
        console.error('Error Occured', url, error.message);
        return [];
    }
};

app.get('/numbers', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'url parameter is missing' });
    }

    const urls = Array.isArray(url) ? url : [url];
    const validUrls = urls.filter((url) => isValidUrl(url));

    if (validUrls.length === 0) {
        return res.status(400).json({ error: 'No valid url' });
    }

    const fetchPromises = validUrls.map((url) => fetchNumbersFromUrl(url));

    try {
        const results = await Promise.all(fetchPromises);
        const mergedNumbers = Array.from(new Set(results.flat())).sort((a, b) => a - b);
        res.json({ numbers: mergedNumbers });
    } catch (error) {
        console.error('Error in merging:', error.message);
        res.status(500).json({ error: 'Internal error occured' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
