
import express from 'express';
import renderApi from '@api/render-api';

const app = express();
const port = 3000;

// Auth to Render API with your API key
renderApi.auth(process.env.RENDER_API_KEY);

app.get('/', async (req, res) => {
    try {
        const { data } = await renderApi.listServices({ includePreviews: 'true', limit: '20' });
        res.json(data); // Send the data as JSON response
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).json({ error: 'Failed to fetch services' }); // Error handling
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

