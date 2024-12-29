const Words = require("./../models/word");

exports.getAllWords = async (req, res) => {
  try {
    const words = await Words.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNewWord = async (req, res) => {
  const word = new Words({
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
