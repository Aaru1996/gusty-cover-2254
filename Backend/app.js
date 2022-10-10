require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// extra packages for security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

// ConnecDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

// Routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Users API");
});

app.use("/auth", authRouter);
app.use("/usertasks", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
