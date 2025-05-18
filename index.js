require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const QRCode = require('qrcode');
const axios = require('axios');
const pino = require("pino");
const { makeid } = require('./id');
const PastebinAPI = require('pastebin-js');
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");

const app = express();
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Audio and video URLs
const audioUrls = [
    "https://files.catbox.moe/hpwsi2.mp3",
    "https://files.catbox.moe/xci982.mp3",
    // ... (keep all your audio URLs)
];

const videoUrls = [
    "https://i.imgur.com/Zuun5CJ.mp4",
    "https://i.imgur.com/tz9u2RC.mp4",
    // ... (keep all your video URLs)
];

const factsAndQuotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    // ... (keep all your facts and quotes)
];

// Utility functions
function getRandomAudioUrl() {
    return audioUrls[Math.floor(Math.random() * audioUrls.length)];
}

function getRandomVideoUrl() {
    return videoUrls[Math.floor(Math.random() * videoUrls.length)];
}

function getRandomFactOrQuote() {
    return factsAndQuotes[Math.floor(Math.random() * factsAndQuotes.length)];
}

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tiktok', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tiktok.html'));
});

app.get('/qr', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'qr.html'));
});

app.get('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});

// QR Code Endpoint
app.get('/generate-qr', async (req, res) => {
    const id = makeid();
    let responseSent = false;

    async function generateQR() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            const sock = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: Browsers.macOS("Desktop"),
            });

            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;
                if (qr && !responseSent) {
                    const qrImage = await QRCode.toDataURL(qr);
                    res.send(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>QR Code Scanner</title>
                            <style>
                                body { margin: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; height: 100vh; background: black; }
                                video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; }
                                img { z-index: 1; border: 5px solid white; border-radius: 15px; }
                            </style>
                        </head>
                        <body>
                            <video autoplay muted loop>
                                <source src="https://files.catbox.moe/d5ch2k.mp4">
                            </video>
                            <img src="${qrImage}" alt="Scan this QR code">
                        </body>
                        </html>
                    `);
                    responseSent = true;
                }

                if (connection === "open") {
                    await delay(10000);
                    const data = fs.readFileSync(path.join(__dirname, `temp/${id}/creds.json`));
                    const compressedData = zlib.gzipSync(data);
                    const b64data = compressedData.toString('base64');

                    await sock.sendMessage(sock.user.id, { text: 'BWM-XMD;;;' + b64data });

                    const welcomeText = `
🔐 *Session Successfully Connected*  
*Welcome to BWM XMD Platform*  

📌 *Next Steps & Resources:*  
🌍 *Bot Website*: https://www.ibrahimadams.site  
💻 *Codebase*: https://github.com/ibrahimaitech  
🌍 *Enterprise Solutions*: https://business.bwmxmd.online  
🔧 *Powered by BWM XMD Technologies*  
                    `;

                    await sock.sendMessage(sock.user.id, {
                        image: { url: 'https://files.catbox.moe/642del.jpeg' },
                        caption: welcomeText
                    });

                    await sock.sendMessage(sock.user.id, {
                        audio: { url: 'https://files.catbox.moe/l1dfxb.mp3' },
                        mimetype: 'audio/mp4',
                        ptt: true
                    });

                    await delay(100);
                    await sock.ws.close();
                    await removeFile(path.join(__dirname, 'temp', id));
                } else if (connection === "close" && lastDisconnect?.error?.output.statusCode != 401) {
                    await delay(10000);
                    generateQR();
                }
            });
        } catch (err) {
            if (!responseSent) res.json({ code: "Service Unavailable" });
            console.error(err);
            await removeFile(path.join(__dirname, 'temp', id));
        }
    }

    await generateQR();
});

// Pair Code Endpoint
app.get('/generate-pair', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function generatePair() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            const sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }),
                browser: Browsers.chrome("Linux")
            });

            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sock.requestPairingCode(num);
                res.json({ code });
            }

            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    await delay(5000);
                    const data = fs.readFileSync(path.join(__dirname, `temp/${id}/creds.json`));
                    const compressedData = zlib.gzipSync(data);
                    const b64data = compressedData.toString('base64');

                    await sock.sendMessage(sock.user.id, { text: 'KEITH;;;' + b64data });

                    await sock.sendMessage(sock.user.id, {
                        video: { url: getRandomVideoUrl() },
                        caption: getRandomFactOrQuote()
                    });

                    await sock.sendMessage(sock.user.id, {
                        audio: { url: getRandomAudioUrl() },
                        mimetype: 'audio/mp4',
                        ptt: true,
                        waveform: [100, 0, 100, 0, 100, 0, 100]
                    });

                    await delay(100);
                    await sock.ws.close();
                    await removeFile(path.join(__dirname, 'temp', id));
                } else if (connection === "close" && lastDisconnect?.error?.output.statusCode != 401) {
                    await delay(10000);
                    generatePair();
                }
            });
        } catch (err) {
            console.error("Service restarted:", err);
            await removeFile(path.join(__dirname, 'temp', id));
            res.json({ code: "Service Unavailable" });
        }
    }

    await generatePair();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
