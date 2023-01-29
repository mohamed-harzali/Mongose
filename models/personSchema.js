const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const personSchema = {
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: Array,
};

const person = mongoose.model("person", personSchema);
module.exports = person;
