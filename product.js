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
    min: [0, "Price must be positive yahoooo"],
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
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

// =========================================
// // Define method for Schema
// productSchema.methods.xinchao = function () {
//   console.log("Hello!! Lại là mình đây!!");
//   console.log(`- from ${this.name}`);
// };

// Toggle on/off a property (Sale) method
productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

// Add Category
productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

// Define a Model &
// connect Model-Schema in Mongoose
const Product = mongoose.model("Product", productSchema);

// Define a async function to call Schema/Model method
const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Mountain Bike" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory("Indoors");
  console.log(foundProduct);
};
findProduct();

// =========================================
// // Define a instance in model
// const bike = new Product({
//   name: "Cycling Jersey",
//   // This will turn to number
//   price: 29.5,
//   categories: ["sycling"],
//   size: "XL",
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

// Product.findOneAndUpdate(
//   { name: "Tire Pump" },
//   { price: -99.99 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log("It worked!!!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Oh no error!", err);
//   });
