const Board = require("../models/board");
const List = require("../models/list"); 
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getList = (req, res, next) => {
  const id = req.params.id
  List.findById(id)
    .then((list) => {
      res.json(list)
    }).catch((err) => {
      console.log(err)
      next(new HttpError("Board does not exist", 404))
    })
}

const createList = (req, res, next) => {
  const errors = validationResult(req);
  const newObj = {
    boardId: req.body.boardId,
    title: req.body.list.title
  }

  if (errors.isEmpty()) {
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

const updateList = (req, res, next) => {
  const listId = req.params.id
  const updatedList = req.body

  List.findByIdAndUpdate(listId, { title: updatedList.title }, {new: true})
    .then((returnedList) => {
      res.json(returnedList)
    })
    .catch((err) => {
      console.log(err)
      return next(new HttpError("Updating list failed, please try again", 500))
    })
}

exports.createList = createList;
exports.updateList = updateList;
exports.getList = getList;