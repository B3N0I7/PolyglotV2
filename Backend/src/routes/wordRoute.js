const express = require("express");
const router = express.Router();
const wordController = require("./../controllers/wordController");
const authMiddleware = require("./../middlewares/authMiddleware");

router.get("/get-all-words", wordController.getAllWords);

router.post("/create-new-word", authMiddleware, wordController.createNewWord);

router.put("/modify-word/:id", wordController.modifyWord);
router.get("/english-word/:englishWord", wordController.getWordInEnglish);
router.get("/french-word/:frenchWord", wordController.getWordInFrench);

router.get("/random-english", wordController.getRandomEnglishWord);
router.get("/random-french", wordController.getRandomFrenchWord);
router.post("/verify-translation", wordController.verifyTranslation);

router.get("/random-words/:count", wordController.getRandomWords);

module.exports = router;
