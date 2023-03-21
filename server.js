const express = require("express");
const app = express();
app.use(express.json());
var mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const userRoutes = require("./routes/userRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/images", express.static(path.join(__dirname, "/images")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} _${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.array("files"), (req, res) => {
  const files = req.files;
  if (Array.isArray(files) && files.length > 0) {
    res.json(files);
    res.status(200).json("file has been uploaded");
  } else {
    throw new Error("files has upload successfully");
  }
});

app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoute);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running  on port ${PORT}`));
//connection to data base
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));
