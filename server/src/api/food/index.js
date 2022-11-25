import express from 'express';
import { FoodModel } from '../../database/allModels';
import { validateCategory, validateId } from '../../validation/common.validation';

const Router = express.Router();

/* 
*Route    /:_id
*Des      create new food item
*Param    none
*access   public
*method   post
*/

/* 
*Route    /:_id
*Des      Get food based on ids
*Param    _id
*access   public
*method   get
*/

Router.get("/:_id", async(req, res) => {
    try {

      const { _id } = req.params;
      await validateId(req.params);
      const foods = await FoodModel.findById(_id);
      return res.json({ foods });

    } catch(error){
      return res.status(500).json({ error: error.message });
    }
});

/* 
*Route    /r/:_id
*Des      Get all food based on particular restaurant
*Param    _id
*access   public
*method   get
*/

Router.get("/r/:_id", async(req, res) => {
  try {
    
    const { _id } = req.params;
    await validateId(req.params);
    const foods = await FoodModel.find({restaurant: _id});
    return res.json({ foods });

  } catch(error){
    return res.status(500).json({ error: error.message });
  }
})

/* 
*Route    /c/:_id
*Des      Get all food based on category
*Param    _id
*access   public
*method   get
*/

Router.get("/c/:category", async (req, res) => {
  try {
    const { category } = req.params;
    await validateCategory(req.params);
    const foods = await FoodModel.find({
                                    //for case in sensetivity
      category: { $regex: category, $options: "i"}
    });
    if(!foods) return res.status(404).json({ error: `no food with ${category}`});

    return res.json({ foods });

  } catch(error){
    return res.status(500).json({error: error.message });
  }
})


export default Router;