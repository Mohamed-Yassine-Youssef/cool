const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  { timestamps: true }
);

const reservationSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    emaill: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    nbPlaces: { type: Number, required: true },
    isAccepted: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  { timestamps: true }
);

const restaurantModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: { type: "String", required: true },
  address: { type: "String", required: "true" },
  telephone: { type: "String", required: "true" },
  image: { type: "String", required: "true" },
  menu: { type: "String", required: "true" },
  reviews: [reviewSchema],
  reservation: [reservationSchema],
  // rating: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // numReviews: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
});

const Restaurant = mongoose.model("Restaurant", restaurantModel);
module.exports = Restaurant;
