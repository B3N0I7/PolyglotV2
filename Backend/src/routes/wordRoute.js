const express = require("express");
const router = express.Router();
const wordController = require("./../controllers/wordController");

router.get("/get-all-words", wordController.getAllWords);

router.post("/create-new-word", wordController.createNewWord);

router.put("/modify-word/:id", wordController.modifyWord);
router.get("/english-word/:englishWord", wordController.getWordInEnglish);
router.get("/french-word/:frenchWord", wordController.getWordInFrench);

module.exports = router;
