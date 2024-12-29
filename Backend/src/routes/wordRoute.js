const express = require("express");
const router = express.Router();
const wordController = require("./../controllers/wordController");

router.get("/get-all-words", wordController.getAllWords);

router.post("/create-new-word", wordController.createNewWord);

module.exports = router;
