import express from "express";
import { RestaurantModel } from "../../database/allModels";
import {
  validateRestaurantCity,
  validateSearchString,
} from "../../validation/restaurant.validation";

const Router = express.Router();

/*
 *Route    /:_id
 *Des      get all the restaurant based on city
 *Param    none
 *access   public
 *method   GET
 */

Router.get("/", async (req, res) => {
  try {
    //query http://localhost:4000/restaurant/?city=ncr
    const { city } = req.query;

    //problem with joi validation
    // await validateRestaurantCity(req.query);

    const restaurants = await RestaurantModel.find({ city });
    if (!restaurants.length === 0) {
      return res
        .status(404)
        .json({ error: "no restaurant found in this city " });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
 *Route    /search/:searchString
 *Des      get restaurants based on search String
 *Param    searchString
 *access   public
 *method   GET
 */

Router.get("/search/:searchString", async (req, res) => {
  /*
   *searchString = Raj
   *results ={
   * RajHotel
   *Rajrow
   * RonRaj
   * Rajrow
   *}
   */

  try {
    const { searchString } = req.params;
    //some problem in joi validation
    // await validateSearchString(req.params);

    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" },
    });
    if (!restaurants.length === 0) {
      return res
        .status(404)
        .json({ error: `no Restaurant matched with ${searchString}` });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /:_id
 * Des       Get individual restuarant details based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findById(_id);

    if (!restaurant) {
      return res.status(400).json({ error: "Restaurant not found" });
    }

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
