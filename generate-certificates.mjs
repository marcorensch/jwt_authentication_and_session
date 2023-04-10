import mkcert from 'mkcert';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certDir = path.join(__dirname, '..', 'certs');
const certPath = path.join(certDir, 'localhost.pem');
const keyPath = path.join(certDir, 'localhost-key.pem');

if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir);
}

const ca = await mkcert.createCA({
    organization: 'NXD',
    countryCode: 'CH',
    state: 'Grisons',
    locality: 'Chur',
    validityDays: 3650,
});

const cert = await mkcert.createCert({
    domains: ['localhost'],
    validityDays: 3650,
    caKey: ca.key,
    caCert: ca.cert
});

fs.writeFileSync(certPath, cert.cert);
fs.writeFileSync(keyPath, cert.key);
