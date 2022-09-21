const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


// console.log(__dirname);
// console.log(__filename);

const app = express();
const port = process.env.POR || 3000; //POR = Port (heroku) || fallbackvalue (port 3000 - local)

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebards enngine and views location
app.set("view engine", "hbs"); //handlebars
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //customize server

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rittik",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Rittik",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Rittik",
  });
});

// app.get('', (req, res) => {
//     res.send("<h1>Hello Express</h1>")
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: "Rittik",
//             age: 23
//         },
//         {
//             name: "RI",
//             age: 24
//         }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>About Page</h1>")
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  // geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
  //   if(error) {
  //     return res.send({error})
  //   }
    forecast(44.1545, -75.7088, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location: "GZB",
        address: req.query.address
      })
    })
  // })

  // res.send({
  //   forecast:
  //     "Patchy rain possible. It is currently 35 degrees out. It feels like 39 degrees out.",
  //   location: "Ghaziabad",
  //   address: req.query.address
  // });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    name: "Rittik",
    errorMessage: "Help Article Not Found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rittik",
    errorMessage: "404 Page",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
}); //
