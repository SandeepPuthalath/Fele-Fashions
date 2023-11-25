const express = require("express");
const http = require("http");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("./config/config");
const errorHandler = require("./utils/middlewares/errorHandler");
const AppError = require("./utils/error/AppError");
const httpStatus = require("./config/httpStatus");
const routes = require("./routes");

// Created express instance
const app = express();

// Server instance has been created
const server = http.createServer(app);

// Using Global middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

// Global error handler
app.use(errorHandler)

// Api routes
routes(app)

app.all("*", (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on the server`, httpStatus.NOT_FOUND);
    next(err)
})

// Server is listening ...
const PORT = config.PORT;

server.listen(PORT, () => {
    console.log(`Server is started at PORT: ${PORT}`);
});
