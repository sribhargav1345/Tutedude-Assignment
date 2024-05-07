const mongoose = require("mongoose");

const mongoDB = async () => {

    const mongoURL = 'mongodb+srv://assignment:Tutedude@certificate.cvecxjc.mongodb.net/?retryWrites=true&w=majority&appName=Certificate';

    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    }
    catch (error) {
      console.error('MongoDB connection error:', error);
    }
};

module.exports = mongoDB;