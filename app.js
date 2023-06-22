const express = require("express");
const morgan = require("morgan");
const storyRoutes = require("./routes/storyRoutes");
const mainroutes = require("./routes/mainroute");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
//app creating
const app = express();

let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");
mongoose
  .connect("mongodb://localhost:27017/trades", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, host, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
//mount middlware
app.use(
  session({
    secret: "ajfeirf90aeu9eroejfoefj",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: "mongodb://localhost:27017/trades" }),
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
app.use(flash());

app.use((req, res, next) => {
  //console.log(req.session);
  res.locals.user = req.session.user || null;
  res.locals.errorMessages = req.flash("error");
  res.locals.successMessages = req.flash("success");
  next();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));
app.use(methodOverride("_method"));

//routes
app.get("/", (request, response) => {
  response.render("index");
});

app.use("/trades", storyRoutes);
app.use("/users", userRoutes);
app.use("/", mainroutes);

app.use((request, response, next) => {
  let error = new Error("The Server cannot locate " + request.url);
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  console.log(error.stack);
  if (!error.status) {
    error.status = 500;
    error.message = "Internal Server Error";
  }
  response.status(error.status);
  response.render("error", { error: error });
});
