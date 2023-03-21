const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Restaurant = require("../Models/restaurantModel");
const generateToken = require("../config/generateToken");
const { sendReservationAccept } = require("../nodemailer");

// Add a restaurant by restaurator
const addRestaurant = asyncHandler(async (req, res) => {
  const restaurant = new Restaurant(req.body);
  const createRestaurant = await restaurant.save();
  res.status(201).json(createRestaurant);
});

// Add a reservation by client
const addReservation = asyncHandler(async (req, res) => {
  const Restau = await Restaurant.findById(req.params.id);
  const { date, time, nbPlaces, emaill, userName, phone } = req.body;
  if (Restau) {
    const reservation = {
      date,
      time,
      nbPlaces,
      emaill,
      userName,
      phone,
      user: req.user._id,
    };
    Restau.reservation.push(reservation);
    await Restau.save();
    res.status(201).json({ message: "Reservation added" });
  } else {
    res.status(404);
    throw new Error("restaurant not found");
  }
});
// get all reservation by res
const findReservations = asyncHandler(async (req, res) => {
  const Restau = await Restaurant.findOne({ user: req.params.id });

  res.json(Restau.reservation);
});

// update state  reservation by res
const acceptReservation = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const Restau = await Restaurant.findOne({ user: req.params.id });
  const searchObject = Restau.reservation.find(
    (r) => r._id == req.params.resId
  );
  searchObject.isAccepted = true;
  Restau.save();
  sendReservationAccept(email);
  res.json(searchObject);
});

// delete state  reservation by res
const deleteReservation = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const Restau = await Restaurant.findOne({ user: req.params.id });

  Restau.reservation.forEach((elm, index) => {
    if (elm._id == req.params.resId) {
      Restau.reservation.splice(index, 1);
    }
  });
  Restau.save();
  res.json("successfully deleted");
});

//delete restaurant by admin
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    await restaurant.remove();

    res.json({ message: "restaurant removed" });
  } else {
    res.status(404);
    throw new Error("restaurant not found");
  }
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant);
});
// get all restaurants
const getRestaurants = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const restaurants = await Restaurant.find({ ...keyword });

  res.json(restaurants);
});

//create new review
const createRestaurantReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const Restau = await Restaurant.findById(req.params.id);

  if (Restau) {
    const alreadyReviewed = Restau.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    Restau.reviews.push(review);

    await Restau.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
  createRestaurantReview,
  getRestaurantById,
  addReservation,
  findReservations,
  acceptReservation,
  deleteReservation,
};
