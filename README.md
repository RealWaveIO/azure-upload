# Purpose

Simple node utility to upload files to Azure using SAS token

# Installation

```
git clone https://github.com/RealWaveIO/azure-upload.git
cd azure-upload
npm install
```

# Syntax

```
node index.js <source> <target>
```

# Example

```
node index.js sample.mp4 'https://demo.blob.core.windows.net/demo?sp=racwdl&st=2022-01-13T22:51:54Z&se=2022-01-21T06:51:54Z&spr=https&sv=2020-08-04&sr=c&sig=klsajdflkjlk23j4lkj2l4%3D'
```