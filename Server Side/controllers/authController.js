const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const User = require('../models/user');

exports.postRegister = (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
        const errorArray = errorValidation.array()[0];
        const error = new Error(errorArray.msg);
        error.statusCode = 406;
        error.data = errorArray;
        throw error;
    }

    let imageURL = '';
    (req.file) ? imageURL = req.file.path : imageURL = "Images/default_image_server_uploaded.png";
    User.find({ email: req.body.email }).then((userFound) => {
        if (userFound[0]) {
            throw new Error("User Already Exists with this email");
        }
        return bcrypt.hash(req.body.password, 12);
    }).then((hashedPassword) => {
        const newUser = new User({ email: req.body.email, password: hashedPassword, username: req.body.username, imageURL: imageURL });
        return newUser.save();
    }).then((userData) => {
        res.status(201).json({ message: "You have been successfully registered", user: userData });
    }).catch(err => {
        const error = new Error(err.message);
        error.statusCode = 409;
        next(error);
    });
}

exports.postLogin = (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
        const errorArray = errorValidation.array()[0];
        const error = new Error(errorArray.msg);
        error.statusCode = 406;
        error.data = errorArray;
        throw error;
    }
    let availableUser = undefined;
    User.findOne({ email: req.body.email }).then((foundUser) => {
        availableUser = foundUser;
        if (!foundUser) {
            throw new Error("No User Exists with this email");
        }
        return bcrypt.compare(req.body.password, foundUser.password);
    }).then((isValidUser) => {
        if (!isValidUser) {
            throw new Error("Invalid Password. Please try again!");
        }

        res.status(200).json({ message: "User Found", username: availableUser.username, email: availableUser.email, imageUrl: availableUser.imageURL, userId: availableUser._id });
    }).catch(err => {
        const error = new Error(err.message);
        error.statusCode = 409;
        next(error);
    })
}