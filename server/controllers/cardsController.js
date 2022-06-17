const Board = require("../models/board");
const List = require("../models/list"); // required to import the Schemas for List and Card
const Card = require("../models/card"); // required to import the Schemas for List and Card
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  const id = req.params.id
  Card.findById(id)
    .then((card) => {
      res.json(card)
    }).catch((err) => {
      console.log(err)
      next(new HttpError("Board does not exist", 404))
    })
}

const createCard = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    console.log('we are here')
    const newCard = {
      listId: req.body.listId,
      title: req.body.card.title
    }
    Card.create(newCard)
      .then((card) => {
        console.log('in the then')
        res.json(card)
        return card
      })
      .then((card) => {
        List.findByIdAndUpdate(card.listId, { $push: { cards: card._id }}, () => {})
      })
      .catch((err) => {
        console.log(err);
        return next (new HttpError("The input field is empty.", 404));
      })
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
}

exports.getCard = getCard;
exports.createCard = createCard;