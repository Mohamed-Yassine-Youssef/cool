const express = require("express");

const {
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
  createRestaurantReview,
  getRestaurantById,
  addReservation,
  findReservations,
  acceptReservation,
  deleteReservation,
} = require("../controllers/restaurantController");
const { protect, admin, restorer } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/:id", protect, getRestaurantById);
router.get("/reservations/:id", protect, restorer, findReservations);
router.post("/createReservation/:id", protect, addReservation);
router.post("/create", protect, restorer, addRestaurant);
router.put("/reservation/:id/:resId", protect, restorer, acceptReservation);
router.delete("/reservation/:id/:resId", protect, restorer, deleteReservation);
router.delete("/:id", protect, admin, deleteRestaurant);

router.get("/", protect, getRestaurants);
router.post("/:id", protect, createRestaurantReview);
module.exports = router;
