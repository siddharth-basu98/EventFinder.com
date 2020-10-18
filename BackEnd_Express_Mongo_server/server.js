require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const utils = require("./utils");
const Event = require("./app/models/event.model");


const app = express();
const port = process.env.PORT || 4000;

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });




//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

// request handlers
app.get("/hello", (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid user to access it." });
  res.send("Welcome to the Node.js Tutorial! - " + req.user.name);
});


app.get("/init", function(req, res){
  const event1 = new Event({
    title: "IPL KKR vs DD",
    domain: "sports",
    price: 2500,
    location: "Maharashtra",
    startDate: "2020-10-21",
    endDate: "2020-10-22",
    photoPath: "www.demo_path.jpeg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    organizerName: "91 Events",
  });


  const event2 = new Event({
    title: "ZomatoLand Food Fest",
    domain: "culinary",
    price: 1900,
    location: "Delhi",
    startDate: "2020-11-19",
    endDate: "2020-11-20",
    photoPath: "www.demo_path.jpeg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    organizerName: "Zomato",
  });

  const event3 = new Event({
    title: "Coldplay Live",
    domain: "music concerts",
    price: 4500,
    location: "Goa",
    startDate: "2021-01-10",
    endDate: "2021-01-11",
    photoPath: "www.demo_path.jpeg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    organizerName: "Coldplay",
  })

  const event4 = new Event({
    title: "Cricket WC Finals",
    domain: "sports",
    price: 4200,
    location: "Maharashtra",
    startDate: "2021-10-20",
    endDate: "2021-10-20",
    photoPath: "www.demo_path.jpeg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    organizerName: "BCCI",
  });

  const event5 = new Event({
    title: "TedX Talk",
    domain: "workshop",
    price: 600,
    location: "Gujarat",
    startDate: "2021-05-19",
    endDate: "2021-05-19",
    photoPath: "www.demo_path.jpeg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    organizerName: "TedX Gujarat",
  });

  const event6 = new Event({
    title: "career fair 2020",
    domain: "workshop",
    price: 300,
    location: "Bihar",
    startDate: "2020-12-02",
    endDate: "2020-12-03",
    photoPath: "www.demo_path.jpeg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    organizerName: "Phoenix Consultants",
  });

  const event7 = new Event({
    title: "English drama event",
    domain: "arts & theatre",
    price: 1900,
    location: "Puducherry",
    startDate: "2020-12-19",
    endDate: "2020-12-20",
    photoPath: "www.demo_path.jpeg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    organizerName: "Akshara Theatre",
  });


  event1.save().then(()=>{
    event2.save().then(()=>{
      event3.save().then(()=>{
        event4.save().then(()=>{
          event5.save().then(()=>{
            event6.save().then(()=>{
              event7.save().then(()=>{
                res.send("All data has been initialised successfully. Navigate to '/' to now use the app") ; 
              })
            })
          })
        })
      })
    })
  }).catch(err=>{
    res.send("Some error occured while initialising. You may still navigate to '/' to continue using the app, or try again") ; 
  })
})


require("./app/routes/auth.routes.js")(app);

require("./app/routes/event.routes.js")(app);


app.listen(port, () => {
  console.log("Server started on: " + port);
});
