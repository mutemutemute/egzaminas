const { createAd, getAds } = require("../models/adsModel");

exports.createNewAd = async (req, res, next) => {
  try {
    const newAd = {
        ...req.body,
        user_id: req.user.id, 
      };
    const ad = await createAd(newAd);

    res.status(201).json({
      status: "success",
      data: ad,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllAds = async (req, res, next) => {
  try {
    let { name, sortColumn } = req.query;

    const allAds = await getAds(name, sortColumn);

    if (!Array.isArray(allAds)) {
      throw new Error("Database query did not return an array");
    }

    res.status(200).json({
      status: "success",
      data: allAds,
    });
  } catch (error) {
    next(error);
  }
};
