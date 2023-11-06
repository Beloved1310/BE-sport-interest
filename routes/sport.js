const express = require("express");
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const multer = require('multer');
const router = express.Router();

const sportController = require("../controller/sports.controller");
const storage = require('../utilis/multer');

const upload = multer({ storage });


router.post("/", upload.single('image'), asyncMiddleware(sportController.createSport));
router.get("/", auth, asyncMiddleware(sportController.getSports));

module.exports = router;
