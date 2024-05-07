const fs = require('fs');
const { google } = require('googleapis');

const credentials = require('./client_secret_530187695914-ebelhhn0bv848i8bp5c1f614p5fsb8mu.apps.googleusercontent.com.json');

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

oAuth2Client.setCredentials(credentials.token);

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

const uploadToGoogleDrive = async (filePath, mimeType) => {
    const fileContent = fs.readFileSync(filePath);

    const response = await drive.files.create({
        requestBody: {
            name: 'MyFile.pdf', 
        },
        media: {
            mimeType: mimeType, 
            body: fileContent, 
        },
    });

    return response.data;
};

module.exports = { uploadToGoogleDrive };
