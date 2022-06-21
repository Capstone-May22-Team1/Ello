const Comment = require("../models/comment");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose")

const createComment = (req, res, next) => {
  const errors = validationResult(req);
  const newObj = {
    cardId: req.body.cardId,
    text: req.body.comment.text
  }

  if (errors.isEmpty()) {
    Comment.create(newObj)
      .then((comment) => {
        res.json(comment)

        return comment
      })
      .then((comment) => {
        Card.findByIdAndUpdate(comment.cardId, { $push: { comments: comment._id }}, () => {})
      })
      .catch((err) => {
        console.log(err);
        return next(new HttpError("Creating comment failed, please try again", 500))
      });
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.createComment = createComment;