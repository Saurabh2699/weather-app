const forecast = require("../utils/forecast");
const geocode = require("../utils/geocode");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;

//path to various directories
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setting up view engine and directory for views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

//various routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Saurabh Khaparey"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Saurabh Khaparey"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMsg: "This is some helpful text",
    title: "Help",
    name: "Saurabh Khaparey"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!!!!"
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, foreCast) => {
      if (error) {
        return res.send({ error });
      }

      res.send({ latitude, longitude, location, forecast:foreCast });
    });
  });
});

app.get("/help/*", (_req, res) => {
  res.render("404", {
    title: "404",
    name: "Saurabh Khaparey",
    errorMsg: "Help not found..!!!!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Saurabh Khaparey",
    errorMsg: "Page not found..!!!!"
  });
});

app.listen(port, () => {
  console.log("The server is running at port " + port);
});
