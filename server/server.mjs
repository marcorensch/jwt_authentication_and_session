import * as dotenv from 'dotenv';
dotenv.config();

import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';

import cookieParser from 'cookie-parser';

import https from "https";

const jwtSecret = "JWTsEcrEtTextHere"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.SERVER_PORT || 3000;

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello there! This isn\'t the page you\'re looking for. ⭐🧔⚔️');
});

app.post('/api/login', (req, res) => {
    const token = jsonwebtoken.sign({userId: 2341, firstname:'Marco', role: 'admin'}, jwtSecret, { expiresIn: '1h' });
    res.cookie('nxd-token', token, { httpOnly: true, sameSite: 'strict' });
    res.json({token});
});

app.get('/api/logout', (req, res) => {
    res.status(202).clearCookie('nxd-token').send('cookie cleared')
});

const keyPath = path.join(__dirname, '..', 'certs', 'localhost-key.pem');
const certPath = path.join(__dirname, '..', 'certs', 'localhost.pem');
if(!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.error("No certificates found. Please run 'npm run generate-certificates' first.");
    process.exit(1);
}
https.createServer({
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
}, app).listen(port, () => {
    console.log(`Listening on port ${port}`);
});
