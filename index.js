#! /usr/bin/env node
const { BlobServiceClient } = require('@azure/storage-blob');

(async function run() {
    const [, , source, target] = process.argv;
    if (!source || !target) {
        console.log("Usage: node index.js <source> <target>");
        return;
    }
    console.log(`Uploading ${source} to ${target}`);

    const sasToken = `https://realwave00shared.blob.core.windows.net/yesway?sp=racwdl&st=2022-01-13T22:51:54Z&se=2022-01-21T06:51:54Z&spr=https&sv=2020-08-04&sr=c&sig=qOcSDhzbJrQlsj69u3tNeT9a2JQwA7X1zobt63sMreQ%3D`;

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
    await blobBlobClient.uploadFile(source);
    console.log('Uploaded');

}());