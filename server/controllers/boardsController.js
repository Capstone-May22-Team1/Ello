const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose")

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
  Board.findOne({'_id': id})
    .populate({
      path: 'lists',
      populate: { path: 'cards' }
    })
    .then((board) => {
      if (board.length === 0) {
        next(new HttpError("Board does not exist", 404))
      }
      res.json(board)
    }).catch((err) => {
      next(new HttpError("Board does not exist", 404))
    })
}

exports.getBoard = getBoard;
exports.getBoards = getBoards;
exports.createBoard = createBoard;