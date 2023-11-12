const app = require('express').Router()

app.use("/health", require("./health"));
app.use("/users", require("./users"));
app.use("/books", require("./books"));

module.exports = app