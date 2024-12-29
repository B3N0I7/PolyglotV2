const Words = require("./../models/word");

exports.getAllWords = async (req, res) => {
  try {
    const words = await Words.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
