const Message = require('../models/message');
const io = require('../socket');

exports.postMessage = (req, res, next) => {

    const newMessage = new Message({ message: req.body.message, timeStamp: new Date().toLocaleString().toString(), sender: req.body.userId });
    newMessage.save().then((savedMessage) => {
        return Message.find({ _id: savedMessage._id }).populate('sender', 'email username imageURL');
    }).then((myNewMessage) => {
        io.getIO().emit('myMessage', { action: 'receiveMessage', message: myNewMessage[0] });
        res.status(201).json({ message: "successfully send" });
    }).catch(err => {
        const error = new Error(err.message);
        error.statusCode = 409;
        next(error);
    });
}

exports.getMessages = (req, res, next) => {
    Message.find().populate('sender', 'email username imageURL').then((savedMessages) => {
        res.status(200).json({ messages: savedMessages });
    }).catch(err => {
        const error = new Error(err.message);
        error.statusCode = 409;
        next(error);
    });
}

