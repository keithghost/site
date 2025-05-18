const express = require('express');
const router = express.Router();
const axios = require('axios');

// TikTok Download using external API
router.get('/dl', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({
        status: false,
        message: 'URL parameter is required'
      });
    }

    // Call the external API
    const apiUrl = `https://apis-keith.vercel.app/download/tiktokdl?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Format the response
    const result = {
      status: true,
      creator: "Your Name", // Change to your name
      result: {
        title: data.result.desc || 'No description',
        caption: data.result.desc || '',
        nowm: data.result.video_sd,
        hd: data.result.video_hd,
        mp3: data.result.audio,
        thumbnail: data.result.thumb
      }
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error processing TikTok URL'
    });
  }
});

module.exports = router;
