const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

//import routes
const routes = require("./routes");


// Setup Express
const app = express();
const PORT = process.env.PORT || 3001;

// app.use(cors());

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); // Always allow
    },
    credentials: true
}));

// Setup body-parser
app.use(express.json());

// Setup our routes.
app.use("/routes", routes);

// testing
app.get('/', (req, res) => {
    res.send('Hello World');
});


// connect DB, if success, start the server.
mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() =>
        app.listen(PORT, '0.0.0.0', () => console.log(`iBird Server listening on port ${PORT}!`))
    );
