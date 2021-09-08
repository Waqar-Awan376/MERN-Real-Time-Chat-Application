const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


const MONGODB_URI = "";

/* ~~~~~~~~~ IMPORTING THE ROUTES ~~~~~~~~~~*/
const authRoute = require('./routes/auth');
const messageRoute = require('./routes/message');
/* ~~~~~~~~~ IMPORTING THE ROUTES ~~~~~~~~~~*/

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        var d = new Date();
        var n = d.getTime();
        cb(null, n + '_' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// ~~~~~~~ FOLLOWING MIDDLEWARES WILL RUN ON EVERY REQUESTION ~~~~~~~//

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/Images', express.static(path.join(__dirname, 'Images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


app.use('/auth', authRoute);
app.use('/chatMessage', messageRoute);


app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ error: true, message: message, data: data });
});

mongoose.connect(MONGODB_URI).then(result => {
    const server = app.listen(8080);
    const io = require('./socket').init(server);
    io.on('connection', socket => {
        socket.on('userData', data => {
            io.emit('greetUser', data);
        });
        socket.on('disconnect', () => {
            io.emit('leavingChat');
            console.log("client disconnect");

        })
        console.log("client connected");
    });
}).catch(err => console.log(err));

