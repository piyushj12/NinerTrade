const express = require("express");
const controller = require("../controllers/storyController");
const multer = require("multer");
const uploadDestination = multer({ dest: "./public/uploads/images/" });
const router = express.Router();
const { isLoggedIn, isAuthor } = require("../middleware/auth");
const { validateId } = require("../middleware/validator");

router.get("/", controller.index);
const storage = multer.diskStorage({
  //destination for files
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },

  //add back the extension
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
});
router.get("/new", isLoggedIn, controller.new);

router.post(
  "/",
  isLoggedIn,
  upload.fields([
    { name: "sampleImage1", maxCount: 1 },
    { name: "sampleImage2", maxCount: 1 },
  ]),
  controller.create
);

router.get("/:id", validateId, controller.show);

router.get("/:id/edit", validateId, isLoggedIn, isAuthor, controller.edit);

router.put(
  "/:id",
  validateId,
  isLoggedIn,
  isAuthor,
  upload.fields([
    { name: "sampleImage1", maxCount: 1 },
    { name: "sampleImage2", maxCount: 1 },
  ]),
  controller.update
);

router.delete("/:id", validateId, isLoggedIn, isAuthor, controller.delete);

module.exports = router;
