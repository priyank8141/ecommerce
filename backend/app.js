const mongoose = require("mongoose"); // import mongoose
const dotenv = require("dotenv"); // import dotenv
const express = require("express"); //import express
const morgan = require("morgan"); //import morgan
const bodyParser = require("body-parser"); // import body parser
const cors = require("cors"); //import cors
require("dotenv").config(); // import .env file

// import auth routes
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoute");

// app initialize
const app = express();

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // database connection
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//route middleware

app.use("/api", authRoutes);
app.use("/category", categoryRoutes);

//port
const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on ${port}`));
