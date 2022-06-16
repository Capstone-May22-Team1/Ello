const Board = require("../models/board");
const List = require("../models/list"); // required to import the Schemas for List and Card
const Card = require("../models/card"); // required to import the Schemas for List and Card
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const { listeners } = require("../models/board");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors)

  const newObj = {
    boardId: req.body.boardId,
    title: req.body.list.title
  }

  if (errors.isEmpty()) {
    // console.log(req.body)
    List.create(newObj)
      .then((list) => {
        res.json({
          title: list.title,
          _id: list._id,
          createdAt: list.createdAt,
          updatedAt: list.updatedAt,
          boardId: list.boardId
        })

        return list
      })
      .then((list) => {
        // lists: [...lists, list]
        // // Mongo $push operator
        // { $push: { lists: list._id }}
        Board.findByIdAndUpdate(list.boardId, { $push: { lists: list._id }}, () => {})
      })
      .catch((err) => {
        console.log(err);
        return next(new HttpError("Creating list failed, please try again", 500))
      });
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

/*
{
  "boardId": "62a8ccc07fa2f8e51b28dac0",
  "title": "Test List"
}
*/

/*
const editList = (req, res, next) => {
  const id = req.params.id
  Board.findById(id)
  .populate({
    path: 'lists',
    populate: { path: 'cards' }
  })
  .then((board) => {
    res.json(board)
  }).catch((err) => {
    console.log(err)
    next(new HttpError("Board does not exist", 404))
  })
}
*/

exports.createList = createList;
// exports.editList = editList;