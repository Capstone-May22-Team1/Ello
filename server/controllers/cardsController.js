const List = require("../models/list");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  const id = req.params.id
  console.log(id)
  Card.findById(id)
    .populate('comments')
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
    const newCard = {
      boardId: req.body.boardId,
      listId: req.body.listId,
      title: req.body.card.title
    }
    Card.create(newCard)
      .then((card) => {
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

const updateCard = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    const updatedCard = req.body.card
    const cardId = req.params.id

    Card.findByIdAndUpdate(cardId, updatedCard, {new: true})
      .then((returnedCard) => {
        res.json(returnedCard)
      })
      .catch((err) => {
        console.log(err)
        return next(new HttpError("Updating card failed, please try again", 500))
      })
    
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
}

exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;