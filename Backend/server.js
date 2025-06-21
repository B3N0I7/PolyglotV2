const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/polyglotdb");
const wordRoute = require("./src/routes/wordRoute");
const userRoute = require("./src/routes/userRoute");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use("/word", wordRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
