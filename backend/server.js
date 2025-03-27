const express = require("express");
require("dotenv").config();
const connectToDb = require("./config/connectToDb");
const {errorHandler, notFound} = require("./middlewares/error");
const cors = require("cors");

// Connect to MongoDB
connectToDb();

// Init App
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Cors Policy
app.use(cors({
  origin: "http://localhost:5173"
}));

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));

// Not Found Middleware
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// Running the server
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
