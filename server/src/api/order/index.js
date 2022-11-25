import express from 'express';
import passport from 'passport';
import { OrderModel } from '../../database/allModels';
const Router = express.Router();

/* 
*Route    /
*Des      get all order based on user id
*Param    none
*access   private
*method   GET
*/

Router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) =>{
  try{
    const { user } = req;
    const getOrders = await OrderModel.findOne({ user:user._id });
    if(!getOrders){
      return res.status(404).json({ error: "User's Order Not Found" });
    }

    return res.status(200).json({ orders: getOrders });
  } catch (error){
    return res.status(500).json({ error: error.message })
  }
});

/* 
*Route    /new
*Des      Add new Order
*Param    none
*access   private
*method   POST or PUT
*/

Router.put("/new", passport.authenticate("jwt", { session: false }), async(req, res) =>{
  try{
    const { user } = req;
    const { orderDetails } = req.body;

    const addNewOrder = await OrderModel.findOneAndUpdate(
      {
        user:user._id,
      },{
        $push:{
          orderDetails: orderDetails, //update orderdetail array in db
        }
      },
      {
        new:true,
      }
    )

  } catch(error) {
    return res.status(500).json({ error: error.message });
  }
})




export default Router;