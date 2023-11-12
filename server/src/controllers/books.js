const app = require("express").Router();
const { default: mongoose } = require("mongoose");
const json = require('../../package.json');
const Book = require("../models/Book");

app.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books || []);
});

app.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

app.put("/:id", async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (!book) return res.status(404).send("Book not found");
  delete req.body.id
  await book.updateOne(req.body)
  res.json(book);
});
app.get("/:id", async (req, res) => {
  const book = await Book.findOne({_id: req.params.id});
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});
app.delete("/:id", async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (!book) return res.send('ok');
  await book.deleteOne()
  res.send('ok');
});

module.exports = app;
