const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const crypto = require('crypto');
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const {parse, stringify} = require('flatted');

const userInfoRoutes = require('./api/routes/userInfoRoutes.tsx');
const userRoutes = require('./api/routes/userRoutes.tsx');

const mongoURI = 'mongodb+srv://dbUser:YN8cDaSJksn8nro6@tmcluster.wbdpu.mongodb.net/UpdateTechLtdAssignment?retryWrites=true&w=majority';

// Create mongo connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
console.log(mongoose.connection.readyState);
mongoose.set('debug', true);

// Middleware
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/api", userInfoRoutes);
app.use("/auth", userRoutes);

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));