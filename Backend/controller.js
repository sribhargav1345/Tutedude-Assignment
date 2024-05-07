const fs = require('fs');
const path = require('path');

const { google } = require('googleapis');
const jsPDF = require('jspdf');

const { v4: uuidv4 } = require('uuid');
const Certificate = require('./model');

const auth = new google.auth.GoogleAuth({
    keyFile: './client_secret_530187695914-ebelhhn0bv848i8bp5c1f614p5fsb8mu.apps.googleusercontent.com.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
    version: 'v3',
    auth: auth,
});

const uploadToGoogleDrive = async (pdfBlob) => {
    const fileMetadata = {
        name: uuidv4() + '.pdf',
    };
    const media = {
        mimeType: 'application/pdf',
        body: fs.createReadStream(pdfBlob.path),
    };

    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
    });

    return response.data.id;
};

const generateCertificate = async (name, course, email) => {
    try {

        const templatePath = path.join(__dirname, 'templates', 'certificate_template.png');

        const doc = new jsPDF();

        doc.addImage(templatePath, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

        doc.setFontSize(12);
        doc.text(name, 100, 100);
        doc.text(course, 100, 120); 
        doc.text(email, 100, 140); 

        const outputPdf = await doc.output('blob');

        const fileId = await uploadToGoogleDrive(outputPdf);

        const certificateLink = `https://drive.google.com/file/d/${fileId}/view`;

        const newCertificate = new Certificate({
            name,
            course,
            email,
            certificateLink,
        });

        await newCertificate.save();
        console.log(`Certificate generated for ${name}. Link: ${certificateLink}`);

        return certificateLink;

    } catch (error) {
        console.error('Error generating certificate:', error);
        throw new Error('Error generating certificate.');
    }
};

module.exports = { generateCertificate };
