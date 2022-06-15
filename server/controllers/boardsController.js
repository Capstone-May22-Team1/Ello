const Board = require("../models/board");
const List = require("../models/list"); // required to import the Schemas for List and Card
const Card = require("../models/card"); // required to import the Schemas for List and Card
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json(boards);
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        res.json({
          title: board.title,
          _id: board._id,
          createdAt: board.createdAt,
          updatedAt: board.updatedAt,
        });
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getBoard = (req, res, next) => {
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

exports.getBoard = getBoard;
exports.getBoards = getBoards;
exports.createBoard = createBoard;