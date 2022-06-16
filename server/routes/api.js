const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const { validateBoard, validateList } = require("../validators/validators");
const listsController = require("../controllers/listsController");

router.get('/boards',boardsController.getBoards );
router.post('/boards', validateBoard, boardsController.createBoard );
router.get('/boards/:id', boardsController.getBoard);

router.post('/lists', validateList, listsController.createList );

module.exports = router;