const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.SignUp = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  res.status(201).send("User created successfully");
};

exports.SignIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid user or password");
  }
  const token = jwt.sign(
    { userId: user._id },
    "OnceUponATimeInHollywoodElGatoComeEverythingHeFind",
    { expiresIn: "1h" }
  );
  res.json({ token });
};
