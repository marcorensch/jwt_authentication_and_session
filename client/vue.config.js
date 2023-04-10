const {defineConfig} = require('@vue/cli-service')
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync(path.join(__dirname, '..', 'certs', 'localhost-key.pem')),
                cert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'localhost.pem')),
            }
        },
        proxy: 'https://localhost:3000'
    },
})

function devServerConfig() {
    if (true) {
        console.log("Using https");
        return {
            server: {
                type: 'https',
                options: {
                    key: fs.readFileSync(path.join(__dirname, '..', 'certs', 'localhost-key.pem')),
                    cert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'localhost.pem')),
                }
            },
            proxy: 'https://localhost:3000/api'
        }
    }
}
