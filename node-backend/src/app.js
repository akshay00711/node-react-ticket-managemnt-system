const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const appConfig = require("./config/app.config");
const errorHandler = require("./middlewares/error.middleware");
const notFound = require("./middlewares/notFound.middleware");
const ticketRoutes = require("./routes/ticket.routes");

const app = express();

app.use(cors({ origin: appConfig.corsOrigin }));
app.use(express.json());
app.use(morgan(appConfig.env === "production" ? "combined" : "dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "ticketing-system-node-api" });
});

app.use("/api/tickets", ticketRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
