const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors')
const interviewRouter = require('./routes/interview.routes')

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gen-ai-based-interview-prep-nine.vercel.app",
    ],
    credentials: true,
  }),
);

const authRouter = require("./routes/auth.routes");
/* Auth routes are all here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter)

module.exports = app;
