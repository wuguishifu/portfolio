import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
express()
    .use(express.static(`${__dirname}/dist`))
    .use(express.static(`${__dirname}/dist/assets`))
    .all('/*', (_, res) => res.sendFile(`${__dirname}/dist/index.html`))
    .listen(process.env.PORT, () => console.log('listening on port', +process.env.PORT));