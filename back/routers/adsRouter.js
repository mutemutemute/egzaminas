const express = require("express");
const validate = require("../validators/validate");
const { protect } = require("../controllers/authController");
const {
    createNewAd,
    getAllAds,
    deleteUserAdsController
  } = require("../controllers/adsController");


  const router = express.Router();

  router
  .route("/")
  .post(protect, validate, createNewAd)
  .get(validate, getAllAds)

  router
  .route("/:id")
  .delete(protect, validate, deleteUserAdsController);



  module.exports = router;