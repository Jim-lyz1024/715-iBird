const mongoose = require('mongoose');
const { Bird } = require('./schema');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // Update all birds, removing questions that ask for the scientific name
        Bird.updateMany(
            {},
            { $pull: { questions: { question: /scientific name/i } } }
        )
            .then(res => {
                console.log(`Modified ${res.modifiedCount} bird(s)`);
                mongoose.connection.close();
            })
            .catch(error => {
                console.error('Error updating birds:', error);
            });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
