/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const mongoose = require("mongoose");
var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
var request = require("request"); //assuming you installed this module

var bookSchema = new mongoose.Schema({
  title: String,
  commentCount: Number,
  comments: [String]
});

/** 3) Create and Save a Person */
var Book = mongoose.model("Book ", bookSchema);

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
mongoose.connect(
  CONNECTION_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, client) => {
    if (err) {
      console.log("Database error: " + err);
    } else {
      console.log("Successful database connection");
    }
  }
);
module.exports = function(app) {
  app
    .route("/api/books")
    .get(function(req, res) {
      Book.find({}, function(err, data) {
        if (data === null) res.send("No book exists");
        res.json(data);
      });

      //I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount.
      //console.log(req.body.title);
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(function(req, res) {
      var title = req.body.title;

      Book.findOne({ title }, function(err, data) {
        if (data === null) {
          var book = new Book({ title, commentCount: 0, comments: [] });
          book.save(function(err, data) {
            res.send({ _id: data._id, title: data.title });
          });
        } else {
          res.send("Book was already added");
        }
      });

      //response will contain new book object including atleast _id and title
    })

    .delete(function(req, res) {
      Book.findAndRemove({}, function(err, data) {
        if (err) console.log(err);
        res.send("Delete succesful");
      });
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(function(req, res) {
      var bookid = req.params.id;

      Book.findById({ _id: bookid }, function(err, data) {
        if (data === null) res.send("No book exists");
        res.json({ _id: data._id, title: data.title, comments: data.comments });
      });
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      console.log(bookid);
    })

    .post(function(req, res) {
      var bookid = req.params.id;
      var comment = req.body.comment;

      Book.findById({ _id: bookid }, function(err, data) {
        if (err) console.log(err);
        data.comments.push(comment);

        data.save(function(err, data) {
          res.json({
            _id: data._id,
            title: data.title,
            comments: data.comments
          });
        });

        //res.json({ _id: data._id, title: data.title, comments: data.comments });
      });

      //json res format same as .get
    })

    .delete(function(req, res) {
      var bookid = req.params.id;
      Book.findAndRemove({ _id: bookid }, function(err, data) {
        if (err) console.log(err);
        res.send("Delete succesful");
      });

      //if successful response will be 'delete successful'
    });
};
