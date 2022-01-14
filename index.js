#! /usr/bin/env node
const { BlobServiceClient } = require('@azure/storage-blob');

(async function run() {
    const [, , source, target] = process.argv;
    if (!source || !target) {
        console.log("Usage: node index.js <source> <target>");
        return;
    }
    console.log(`Uploading ${source} to ${target}`);

    const matchResult = /(https:\/\/\w+.blob.core.windows.net\/)(\w+)(.+)/.exec(target);

    if (!matchResult) {
        console.log('Invalid target - must be a SasToken');
        return;
    }

    const container = matchResult[2];

    const finalSasToken = `${matchResult[1]}${matchResult[3]}`;

    const blobServiceClient = new BlobServiceClient(finalSasToken);

    const containerClient = blobServiceClient.getContainerClient(container);

    console.log({ container });

    const blobBlobClient = containerClient.getBlockBlobClient(source);
    await blobBlobClient.uploadFile(source, {
        onProgress: (ev) => {
            console.log(`${ev.loadedBytes / 1024} KB`);
        }
    });
    console.log('Uploaded');

}());