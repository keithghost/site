const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

// MP3 Download
router.get('/mp3', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({
        status: false,
        message: 'URL parameter is required'
      });
    }

    const videoId = ytdl.getURLVideoID(url);
    const info = await ytdl.getInfo(url);
    
    const response = {
      creator: "Your Name",
      status: 200,
      success: true,
      result: {
        id: videoId,
        image: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
        title: info.videoDetails.title,
        downloadUrl: `${process.env.BASE_URL}/api/youtube/download/mp3?id=${videoId}`
      }
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error processing YouTube URL'
    });
  }
});

// MP3 Download Handler
router.get('/download/mp3', async (req, res) => {
  try {
    const videoId = req.query.id;
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    
    res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
    ytdl(url, { filter: 'audioonly', quality: 'highestaudio' }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error downloading audio');
  }
});

// YouTube Search
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({
        status: false,
        message: 'Search query is required'
      });
    }

    const searchResults = await ytSearch(query);
    const videos = searchResults.videos.slice(0, 10).map(video => ({
      id: video.videoId,
      title: video.title,
      thumbnail: video.thumbnail,
      url: video.url,
      duration: video.duration.timestamp
    }));

    res.json({
      status: true,
      results: videos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error searching YouTube'
    });
  }
});

module.exports = router;
