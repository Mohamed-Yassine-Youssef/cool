const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  registerUser,
  authUser,
  updateUserIfo,
  updateUserPassword,
  getUsers,
  VerifyUserAccount,
  deleteUserAccount,
  getUserAccount,
  updateUserAccountByAdmin,
} = require("../controllers/userControllers");

const router = express.Router();
router.get("/allusers", protect, admin, getUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/:id", protect, admin, getUserAccount);
router.put("/admin/updateinfo/:id", protect, admin, updateUserAccountByAdmin);
router.put("/:id/updateInfo", protect, updateUserIfo);
router.delete("/:id/deleteUser", protect, admin, deleteUserAccount);
router.put("/:id/updatePassword", protect, updateUserPassword);

router.put("/auth/verifyuser/:activationcode", VerifyUserAccount);

module.exports = router;
