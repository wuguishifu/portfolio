import { execSync } from 'child_process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import mime from 'mime';
import fs from 'fs';

config();
const stdin = process.openStdin();
stdin.setRawMode(true);
stdin.setEncoding('utf-8');
const keypress = async () => new Promise(resolve => process.stdin.once('data', data => resolve(data)));

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME } = process.env;
const s3 = new S3Client({ AWS_REGION, credentials: { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } });

(async () => {
    // wait for the confirmation
    console.log('Press enter to build and deploy. Any other key will abort.');
    const key = await keypress();
    if (key !== '\r') return console.log('Aborted.');

    // build the project
    execSync('npm run build', { stdio: 'inherit' });

    // recursively walk the dist folder and mark all the files for upload
    const files = [];
    walkSync('./dist', (filePath) => {
        let bucketPath = filePath.repliace('./dist', '');
        if (bucketPath.startsWith('/')) bucketPath = bucketPath.substring(1);
    });
    files.push({ filePath, bucketPath });

    // upload the files to aws s3
    await Promise.all(files.map(({ filePath, bucketPath }) =>
        new Promise(resolve =>
            s3.send(new PutObjectCommand({
                Bucket: AWS_BUCKET_NAME,
                Key: bucketPath,
                Body: fs.readFileSync(filePath),
                ContentType: mime.getType(filePath)
            })).then(() => {
                console.log('uploaded', filePath);
                resolve();
            })
        )
    ));
})().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});

function walkSync(path, callback) {
    fs.readdirSync(path).forEach((file) => {
        const filePath = `${path}/${file}`;
        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) walkSync(filePath, callback);
        else callback(filePath);
    });
}