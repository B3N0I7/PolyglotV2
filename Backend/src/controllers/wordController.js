const Word = require("./../models/word");
// Get all words
exports.getAllWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Create word
exports.createNewWord = async (req, res) => {
  const word = new Word({
    englishWord: req.body.englishWord,
    frenchWord: req.body.frenchWord,
    category: req.body.category,
    difficulty: req.body.difficulty,
    creationDate: req.body.creationDate,
  });
  try {
    const newWord = await word.save();
    res.status(200).json(newWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Update word
exports.modifyWord = async (req, res) => {
  const { id } = req.params;
  try {
    const word = await Word.findByIdAndUpdate(
      id,
      {
        englishWord: req.body.englishWord,
        frenchWord: req.body.frenchWord,
        category: req.body.category,
        difficulty: req.body.difficulty,
      },
      { new: true }
    );
    if (word) {
      res.json(word);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get word by french word
exports.getWordInEnglish = async (req, res) => {
  const { englishWord } = req.params;
  try {
    const word = await Word.findOne({ englishWord: englishWord });
    if (word) {
      res.json(word);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get word by french word
exports.getWordInFrench = async (req, res) => {
  const { frenchWord } = req.params;
  try {
    const word = await Word.findOne({ frenchWord: frenchWord });
    if (word) {
      res.json(word);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Quizzes
exports.getRandomEnglishWord = async (req, res) => {
  try {
    const word = await Word.aggregate([{ $sample: { size: 1 } }]);
    res.json({ englishWord: word[0].englishWord, id: word[0]._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRandomFrenchWord = async (req, res) => {
  try {
    const word = await Word.aggregate([{ $sample: { size: 1 } }]);
    res.json({ frenchWord: word[0].frenchWord, id: word[0]._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyTranslation = async (req, res) => {
  try {
    const { wordId, englishWord, frenchWord } = req.body;
    const word = await Word.findById(wordId);

    if (!word) {
      return res.status(404).json({ message: "Word not found" });
    }

    const isCorrect =
      word.englishWord.toLowerCase() === englishWord.toLowerCase() &&
      word.frenchWord.toLowerCase() === frenchWord.toLowerCase();

    res.json({
      isCorrect,
      correctEnglishWord: word.englishWord,
      correctFrenchWord: word.frenchWord,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get x words
exports.getRandomWords = async (req, res) => {
  const count = parseInt(req.params.count, 10);
  if (isNaN(count) || count <= 0) {
    return res.status(400).send("Count must be a positive integer");
  }
  try {
    const randomWords = await Word.aggregate([
      { $sample: { size: count } },
      { $project: { englishWord: 1, frenchWord: 1, _id: 1 } },
    ]);
    res.json(randomWords);
  } catch (error) {
    res.status(500).json({ message: error.message, errorCode: "ERR500" });
  }
};
