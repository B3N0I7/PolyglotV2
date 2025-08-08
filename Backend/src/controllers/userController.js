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
  console.log(`userController secret: ${process.env.JWT_SECRET}`);
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  console.log(`signin token: ${token}`);
  res.cookie("polyglotToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 3 * 60 * 1000,
  });
  res.status(200).json({ message: "Connexion réussie" });
};

exports.checkAuth = async (req, res) => {
  res.status(200).json({
    authenticated: true,
    userId: req.user.userId,
  });
};

exports.SignOut = async (req, res) => {
  res.clearCookie("polyglotToken");
  res.json({ message: "Déconnexion réussie" });
};
