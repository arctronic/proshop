import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desccreate new Order
// @route POST /api/orders
// @access Private route
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shipping,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice,
      taxPrice,
      shipping,
      totalPrice,
    });
    console.log(req.body);
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});



// @desc getOrder By ID
// @route GET /api/orders/:id
// @access Private route
const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if(order){
    res.json(order)
  }else{
    res.status(404);
    throw new Error("Order not found");
  }
});

export { addOrderItems,getOrderByID };
