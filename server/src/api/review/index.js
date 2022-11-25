import express from "express";
import passport from "passport";
import { ReviewModel } from "../../database/allModels";
const Router = express.Router();

/*
 *Route    /:resId
 *Des      get all review for a perticular restaurant
 *Param    resId
 *access   public
 *method   GET
 */
Router.get("/:resId", async (req, res) => {
  try {
    const { resId } = req.params;
    const reviews = await ReviewModel.find({ restaurant: resId }).sort({
      createdAt: -1,
    });

    if (!reviews) {
    }
    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
 *Route    /new
 *Des      add new food/restaurant review and rating
 *Param    none
 *access   private
 *method   POST
 */

Router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.user;
      const { reviewData } = req.body;
      const review = await ReviewModel.create({ ...reviewData, user: _id });

      return res.status(200).json({ review });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/*
 *Route    /delete/:_id
 *Des      delete a specific review
 *Param    _id
 *access   private
 *method   Delete
 */
Router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const { id } = req.params;
      const data = await ReviewModel.findOneAndDelete({
        _id: id,
        user: user._id,
      });
      if (!data) {
        return res.status(200).json({ message: "not deleted the review " });
      }
      return res
        .status(200)
        .json({ message: "Successfully deleted the review ", data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
