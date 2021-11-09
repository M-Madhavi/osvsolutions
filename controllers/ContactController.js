const Contact = require('../models/Contact')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//get user contact by Id
exports.getContactById = (req, res, next) => {
    const id = req.params.contactId;
    Contact.findById(id)
        .select('_id firstname lastname email  createdAt')
        .exec((err, user) => {
            if (err || !user) {
              return res.status(400).json({
                error: "No valid entry found for provided ID"
              });
            }
            res.json({user});
            next();
          });
        }
  
//delete user contact by Id

exports.deleteContactById = (req, res) => {
    Contact.remove({ _id: req.params.contactId })
    .exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "No valid entry found for provided ID"
          });
        }
        res.json({
            message:"User Contact DELETED"
        });
      });
}
//update user contact by Id
exports.updateContact = (req, res) => {
    const id = req.params.contactId;
    Contact.updateMany({ _id: id }, { $set: {email: req.body.email, mobilenumber: req.body.mobilenumber } })
    .exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "No valid entry found for provided ID"
          });
        }
        res.json({
            message:"User Contact Updated"
        });
      });
    }
//get All user contacts
 
    exports.getAllContacts = (req, res, next) => {
        Contact.find()
            .select('_id firstname lastname email  createdAt')
            .exec((err, user) => {
                if (err || !user) {
                  return res.status(400).json({
                    error: "No UserContacts in DB"
                  });
                }
               res.json({user});
                next();
              });
            }
//Register new user contact
exports.registerUserContact = (req, res, next) => {
    Contact.find({ email: req.body.email })
        .exec()
        .then(contact => {
            if (contact.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const contact = new Contact({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            firstname:  req.body.firstname,
                            lastname:req.body.lastname,
                            age:req.body.age,
                            gender:req.body.gender,
                            mobilenumber:req.body.mobilenumber,
                            createdAt: new Date().toISOString()

                        });
                        contact.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "contact created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}

//login

exports.logInContact=(req, res, next) => {
        Contact.find({ _id: req.body._id })
            .exec()
            .then(contact => {
                if (contact.length < 1) {
                    return res.status(401).json({
                        message: "Authentication failed"
                    });
                }
                bcrypt.compare(req.body.password, contact[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Authentication failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: contact[0].email,
                                contact: contact[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: "Authentication successful",
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: "Authentication failed"
                    });
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
   
//TODO
//pagination

  exports.getPaginationResults= (req, res, next) => {
    per_page = parseInt(req.query.per_page) || 2
    page_no = parseInt(req.query.page_no) || 1
    var pagination = {
      limit: per_page ,
      skip:per_page * (page_no - 1)
    }
    
    Contact.find()
        .select('_id firstname lastname email  createdAt')
        .limit(pagination.limit).skip(pagination.skip)
        .exec((err, user) => {
            if (err || !user) {
              return res.status(400).json({
                error: "No UserContacts in DB"
              });
            }
           res.json({user});
            next();
          });
        }
