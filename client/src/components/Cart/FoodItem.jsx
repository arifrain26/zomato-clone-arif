import React from "react";
import { BsTrashFill } from "react-icons/bs";

//redux action
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  deleteCart,
} from "../../redux/reducers/cart/cart.action";

const FoodItem = (props) => {
  const dispatch = useDispatch();
  const deleteFoodFromCart = () => dispatch(deleteCart(props._id));

  const increment = () => dispatch(incrementQuantity(props._id));

  const decrement = () => {
    if (props.quantity === 1) return;
    dispatch(decrementQuantity(props._id));
  };

  return (
    <div className="flex items-center justify-between">
      <h5>{props.name}</h5>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-end">
          <small>₹ {parseInt(props.price) * parseInt(props.quantity)}</small>
          <div className="px-1 bg-zomato-400 text-white rounded flex items-center gap-1">
            <button
              className="text-white p-1 bg-zomato-400 rounded"
              onClick={decrement}
            >
              -
            </button>
            <small>{props.quantity}</small>
            <button
              className="text-white p-1 bg-zomato-400 rounded"
              onClick={increment}
            >
              +
            </button>
          </div>
        </div>

        <BsTrashFill
          onClick={deleteFoodFromCart}
          className="text-lg cursor-pointer md:text-xl bg-zomato-400 text-white rounded"
        />
      </div>
    </div>
  );
};

export default FoodItem;
