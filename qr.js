const { makeid } = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    Browsers,
    delay,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let responseSent = false;

    const { state, saveCreds } = await useMultiFileAuthState(`./temp/${id}`);
    
    try {
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: "silent" }),
            browser: Browsers.macOS("Desktop"),
        });

        sock.ev.on('creds.update', saveCreds);
        sock.ev.on("connection.update", async (update) => {
            const { connection, qr } = update;

            if (qr && !responseSent) {
                const qrImage = await QRCode.toDataURL(qr);
                res.send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>QR Code Scanner</title>
                        <style>
                            body { 
                                display: flex; 
                                justify-content: center; 
                                align-items: center; 
                                height: 100vh; 
                                margin: 0; 
                                background: #f0f2f5;
                            }
                            .qr-container {
                                text-align: center;
                                padding: 20px;
                                border-radius: 10px;
                                background: white;
                                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                            }
                            .qr-container img {
                                max-width: 300px;
                                margin-bottom: 20px;
                            }
                            .instructions {
                                margin-top: 20px;
                                color: #555;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="qr-container">
                            <h2>Scan QR Code</h2>
                            <img src="${qrImage}" alt="QR Code">
                            <div class="instructions">
                                <p>Open WhatsApp on your phone</p>
                                <p>Go to Settings → Linked Devices → Link a Device</p>
                                <p>Scan this QR code</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `);
                responseSent = true;
            }

            if (connection === 'open') {
                await delay(1000);
                await sock.sendMessage(sock.user.id, { text: 'You have successfully connected!' });
                await sock.ws.close();
                removeFile(`./temp/${id}`);
            }
        });
    } catch (error) {
        if (!responseSent) {
            res.status(500).send('Error generating QR code');
            responseSent = true;
        }
        console.error('QR generation error:', error);
        removeFile(`./temp/${id}`);
    }
});

module.exports = router;
