const express = require("express");

const logger = require("./middleware/logger");
const notFoundHandler = require('./middleware/not-found');
const errorHandler = require('./middleware/error');

const server = express();

const port = process.env.PORT || 3000;

const jobRoutes = require("./routes/JobRoutes");

//Body parser middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//Logger Middleware
server.use(logger);

//Job Routes
server.use("/api/jobs", jobRoutes);

//Error Middleware
server.use(notFoundHandler);
server.use(errorHandler);

server.listen(port, () => console.log("Server is running in port: " + port));
