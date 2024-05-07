const express = require('express');
const multer = require('multer');

const { generateCertificate } = require('./controller');

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.json());


app.post('/api/certificates', upload.single('pdfBlob'), async (req, res) => {
    const { name, course, email } = req.body;
    const pdfBlob = req.file;

    if (!name || !course || !email || !pdfBlob) {
        return res.status(400).send('Missing required fields.');
    }

    try {
        const certificateLink = await generateCertificate(name, course, email, pdfBlob);
        res.status(200).json({ certificateLink });
    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).send('Error generating certificate.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
