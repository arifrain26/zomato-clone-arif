import express from 'express'
import { MenuModel, ImageModel } from '../../database/allModels';
const Router = express.Router();


/* 
*Route    /:_id
*Des      get menu based on menu id
*Param    none
*access   public
*method   GET
*/
Router.get("/list/:_id", async(req, res) => {
    try{
      const { _id } = req.params;
      const menus = await MenuModel.findById( _id );
      if( !menus ) {
        return res.status(404).json({ error: "No menu present for this restaurant "});
      }
        return res.json({ menus });
    } catch( error ) {
      return res.status(500).json({ error: error.message })
    }
})
/* 
*Route    /image
*Des      get all list of menu images based on restaurant id
*Param    _id
*access   public
*method   GET
*/

Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const menuImages = await ImageModel.findById( _id );
    if(!menuImages){
      return res.status(404).json({ message: "No menu images found "});
    }

    return res.json({ menuImages });
  } catch( error ){
    return res.status(500).json({ error: error.message })
  }
})

/* 
*Route    /:_id
*Des      get menu based on menu id
*Param    none
*access   public
*method   GET
*/

export default Router;