const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors")
const morgan = require("morgan");
const config = require("./config/config");
const errorHandler = require("./utils/middlewares/errorHandler");
const AppError = require("./utils/error/AppError");
const httpStatus = require("./config/httpStatus");
const routes = require("./routes");
const connectToDB = require("./database/connection");

// Created express instance
const app = express();

// Server instance has been created

// Using Global middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan("dev"));
app.use(helmet());



// Connecting to database
connectToDB();


// Api routes
routes(app)

app.get("/", (req, res) => {
    res.status(200).json({ status: "success", message: "This is a sample api for Fele Fashion" })
})

app.all("*", (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on the server`, httpStatus.NOT_FOUND);
    next(err)
})

// Global error handler
app.use(errorHandler)


// Server is listening ...
const PORT = config.PORT;
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server is started at PORT: ${PORT}`);
});
