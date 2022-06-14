const mongoose = require("mongoose");

// Use try-catch for Promise
mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("CONNECTION OPEN!!!!");
  })
  .catch((err) => {
    console.log("Oh no error!!!!!");
    console.log(err);
  });

// Define a Schema in Mongoose
// = Define a class in JS
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

// Define a Model in Mongoose
const Product = mongoose.model("Product", productSchema);

// Define a instance in model
const bike = new Product({
  name: "Mountain Bike",
  price: 599,
});

bike
  .save()
  .then((data) => {
    console.log("It worked!!!");
    console.log(data);
  })
  .catch((err) => {
    console.log("Oh no error!", err);
  });
