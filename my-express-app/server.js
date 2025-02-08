// import renderApi from '@api/render-api';

// // renderApi.auth(process.env.RENDER_API_KEY);
// renderApi.auth("rnd_zCIdur57vdLaGZwufWuQsdaoVObv");
// renderApi.listServices({ includePreviews: 'true', limit: '20' })
//     .then(({ data }) => console.log(data))
//     .catch(err => console.error(err));
/////////////
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

/////////////
// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get("/apps", async (req, res) => {
//     try {
//         const response = await axios.get("https://api.render.com/v1/services", {
//             headers: {
//                 Authorization: `Bearer ${process.env.RENDER_API_KEY}`,
//             },
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching apps:", error.message);
//         res.status(500).json({ error: "Failed to fetch applications" });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });




