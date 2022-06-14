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
    maxLength: 20,
  },
  price: {
    type: Number,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
});

// Define a Model in Mongoose
const Product = mongoose.model("Product", productSchema);

// // Define a instance in model
// const bike = new Product({
//   name: "Tire Pump",
//   // This will turn to number
//   price: 39.5,
//   categories: ["sycling"],
// });

// bike
//   .save()
//   .then((data) => {
//     console.log("It worked!!!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Oh no error!", err);
//   });

Product.findOneAndUpdate(
  { name: "Tire Pump" },
  { price: -99.99 },
  { new: true, runValidators: true }
)
  .then((data) => {
    console.log("It worked!!!");
    console.log(data);
  })
  .catch((err) => {
    console.log("Oh no error!", err);
  });
