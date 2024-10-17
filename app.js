// Package third party
const morgan = require('morgan');
const express = require("express");
const expressEJSLayout = require('express-ejs-layouts')

// Package kita sendiri
const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");
const dashboardRoutes = require("./routes/dashboardRoute");

const app = express();
const port = 3000;

// Reading json from body (client)
app.use(express.json()); // Contoh Build in express

app.use(express.urlencoded({extended: false}))

// Middleware: Logging!! Third party
app.use(morgan());

// Contoh Middleware
app.use((req, res, next) => {
  console.log('Incomming request . . .'); // Salah satu contoh logging

  // Better logging
  next();
});

app.use((req, res, next) => {
  req.requestTime= new Date().toISOString();
  // Better logging
  next();
});

app.use((req, res, next) => {
  req.username= "FSW2"
  // Better logging
  next();
});

// middleware : bisa membuat express aplication bisa membaca static file
app.use(express.static(`${__dirname}/public`))

// Panggil view engine
app.set("view engine", "ejs");
app.use(expressEJSLayout);
app.set("layout", "layout");

app.get("/dashboard/admin/", async (req, res) => {
  try {
    res.render("index", {
      greeting: "Hello FSW 2 dengan data dinamis"
    })
  }catch(error){
    console.log(error)
  }
});

// Health Check
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

// Dashboard routes
app.use("/dashboard/admin", dashboardRoutes);

// API Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// Middleware to handle page not found
app.use((req, res, next) => {
  console.log("Proses saat ada yang request : ")
  console.log(req.requestTime)
  console.log("Proses siapa yang request : ")
  console.log(req.username)
  console.log("Proses apa yang diminta : ")
  console.log(req.originalUrl)

  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
