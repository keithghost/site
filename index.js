require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/download', (req, res) => {
  res.sendFile(__dirname + '/public/download.html');
});

app.get('/url-code', (req, res) => {
  res.sendFile(__dirname + '/public/url-code.html');
});


app.get('/color', (req, res) => {
  res.sendFile(__dirname + '/public/color.html');
});

app.get('/run-js', (req, res) => {
  res.sendFile(__dirname + '/public/run-js.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

app.get('/likee', (req, res) => {
  res.sendFile(__dirname + '/public/likee.html');
});


app.get('/pinterest', (req, res) => {
  res.sendFile(__dirname + '/public/pinterest.html');
});


app.get('/capcut', (req, res) => {
  res.sendFile(__dirname + '/public/capcut.html');
});

app.get('/mediafire', (req, res) => {
  res.sendFile(__dirname + '/public/mediafire.html');
});

app.get('/twitter', (req, res) => {
  res.sendFile(__dirname + '/public/twitter.html');
});

app.get('/education-ai', (req, res) => {
  res.sendFile(__dirname + '/public/education-ai.html');
});

app.get('/wallpaper2', (req, res) => {
  res.sendFile(__dirname + '/public/wallpaper2.html');
});
app.get('/apk', (req, res) => {
  res.sendFile(__dirname + '/public/apk.html');
});
app.get('/quran', (req, res) => {
  res.sendFile(__dirname + '/public/quran.html');
});
app.get('/blackbox', (req, res) => {
  res.sendFile(__dirname + '/public/blackbox.html');
});

app.get('/ilama', (req, res) => {
  res.sendFile(__dirname + '/public/ilama.html');
});

app.get('/catgpt', (req, res) => {
  res.sendFile(__dirname + '/public/catgpt.html');
});
app.get('/gemini', (req, res) => {
  res.sendFile(__dirname + '/public/gemini.html');
});

app.get('/bard', (req, res) => {
  res.sendFile(__dirname + '/public/bard.html');
});

app.get('/image-search', (req, res) => {
  res.sendFile(__dirname + '/public/image-search.html');
});
app.get('/search-ai', (req, res) => {
  res.sendFile(__dirname + '/public/search-ai.html');
});

app.get('/bing-search', (req, res) => {
  res.sendFile(__dirname + '/public/bing-search.html');
});

app.get('/spotify-search', (req, res) => {
  res.sendFile(__dirname + '/public/spotify-search.html');
});
app.get('/soundcloud-search', (req, res) => {
  res.sendFile(__dirname + '/public/soundcloud-search.html');
});
app.get('/twitter-search', (req, res) => {
  res.sendFile(__dirname + '/public/twitter-search.html');
});
app.get('/wallpaper', (req, res) => {
  res.sendFile(__dirname + '/public/wallpaper.html');
});

app.get('/imdb-search', (req, res) => {
  res.sendFile(__dirname + '/public/imdb-search.html');
});
app.get('/tiktok-search', (req, res) => {
  res.sendFile(__dirname + '/public/tiktok-search.html');
});
app.get('/tiktok-trend-search', (req, res) => {
  res.sendFile(__dirname + '/public/tiktok-trend-search.html');
});

app.get('/youtube-search', (req, res) => {
  res.sendFile(__dirname + '/public/youtube-search.html');
});

app.get('/bible', (req, res) => {
  res.sendFile(__dirname + '/public/bible.html');
});

app.get('/randombible', (req, res) => {
  res.sendFile(__dirname + '/public/randombible.html');
});

app.get('/coding', (req, res) => {
  res.sendFile(__dirname + '/public/coding.html');
});

app.get('/stalker', (req, res) => {
  res.sendFile(__dirname + '/public/stalker.html');
});

app.get('/sports', (req, res) => {
  res.sendFile(__dirname + '/public/sports.html');
});

app.get('/search', (req, res) => {
  res.sendFile(__dirname + '/public/search.html');
});

app.get('/lyrics', (req, res) => {
  res.sendFile(__dirname + '/public/lyrics.html');
});

app.get('/yt', (req, res) => {
  res.sendFile(__dirname + '/public/yt.html');
});

app.get('/tiktokstalk', (req, res) => {
  res.sendFile(__dirname + '/public/tiktokstalk.html');
});
app.get('/twitter-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/twitter-stalk.html');
});

app.get('/youtube-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/youtube-stalk.html');
});

app.get('/npm-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/npm-stalk.html');
});

app.get('/ip-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/ip-stalk.html');
});

app.get('/whatsapp-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/whatsapp-stalk.html');
});
app.get('/github-repo-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/github-repo-stalk.html');
});

app.get('/github-user-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/github-user-stalk.html');
});

app.get('/country-info-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/country-info-stalk.html');
});
app.get('/gpt', (req, res) => {
  res.sendFile(__dirname + '/public/gpt.html');
});

app.get('/encrypt', (req, res) => {
  res.sendFile(__dirname + '/public/encrypt.html');
});

app.get('/base64', (req, res) => {
  res.sendFile(__dirname + '/public/base64.html');
});

app.get('/unbase64', (req, res) => {
  res.sendFile(__dirname + '/public/unbase64.html');
});

app.get('/run-html', (req, res) => {
  res.sendFile(__dirname + '/public/run-html.html');
});

app.get('/run-py', (req, res) => {
  res.sendFile(__dirname + '/public/run-py.html');
});

app.get('/binary', (req, res) => {
  res.sendFile(__dirname + '/public/binary.html');
});

app.get('/dbinary', (req, res) => {
  res.sendFile(__dirname + '/public/dbinary.html');
});

app.get('/web-extract', (req, res) => {
  res.sendFile(__dirname + '/public/web-extract.html');
});

app.get('/top-scorers', (req, res) => {
  res.sendFile(__dirname + '/public/top-scorers.html');
});
app.get('/standings', (req, res) => {
  res.sendFile(__dirname + '/public/standings.html');
});
app.get('/matches', (req, res) => {
  res.sendFile(__dirname + '/public/matches.html');
});

app.get('/upcoming-matches', (req, res) => {
  res.sendFile(__dirname + '/public/upcoming-matches.html');
});

app.get('/venue-search', (req, res) => {
  res.sendFile(__dirname + '/public/venue-search.html');
});
app.get('/player-search', (req, res) => {
  res.sendFile(__dirname + '/public/player-search.html');
});

app.get('/match-history', (req, res) => {
  res.sendFile(__dirname + '/public/match-history.html');
});
app.get('/team-search', (req, res) => {
  res.sendFile(__dirname + '/public/team-search.html');
});

app.get('/cricket', (req, res) => {
  res.sendFile(__dirname + '/public/cricket.html');
});
               

app.get('/ai', (req, res) => {
  res.sendFile(__dirname + '/public/ai.html');
});
app.get('/metai', (req, res) => {
  res.sendFile(__dirname + '/public/metai.html');
});
app.get('/deepseek', (req, res) => {
  res.sendFile(__dirname + '/public/deepseek.html');
});
app.get('/vision', (req, res) => {
  res.sendFile(__dirname + '/public/vision.html');
});
app.get('/ytmp4', (req, res) => {
  res.sendFile(__dirname + '/public/ytmp4.html');
});

app.get('/spotify', (req, res) => {
  res.sendFile(__dirname + '/public/spotify.html');
});

app.get('/soundcloud', (req, res) => {
  res.sendFile(__dirname + '/public/soundcloud.html');
});

app.get('/play', (req, res) => {
  res.sendFile(__dirname + '/public/play.html');
});
app.get('/instagram', (req, res) => {
  res.sendFile(__dirname + '/public/instagram.html');
});

app.get('/facebook', (req, res) => {
  res.sendFile(__dirname + '/public/facebook.html');
});

app.get('/video', (req, res) => {
  res.sendFile(__dirname + '/public/video.html');
});

app.get('/tiktok', (req, res) => {
  res.sendFile(__dirname + '/public/tiktok.html');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
