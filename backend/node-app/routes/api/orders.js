const express = require("express");
const router = express.Router();

const Order = require("../../models/Order");

// $route GET api/orders/test
// @desc  返回的请求的json数据
// @access  public
router.get("/test", (req, res) => {
  res.json({ msg: "orders works" });
});

// $route GET api/orders/save
// @desc  返回的请求的json数据
// @access  public
router.post("/save", (req, res) => {
  const newOrder = new Order({
    id: req.body.id,
    storeName: req.body.storeName,
    merchantName: req.body.merchantName,
    phone: req.body.phone,
    orderName: req.body.orderName,
    total: req.body.total,
    takeName: req.body.takeName,
    takePhone: req.body.takePhone,
    address: req.body.address,
  });

  newOrder
    .save()
    .then(() => res.json({ code: 1, msg: "订单提交成功" }))
    .catch((err) => console.log(err));
});

// $route GET api/orders/search
// @desc  返回的请求的json数据
// @access  public
router.post("/search", (req, res) => {
  Order.findOne({ id: req.body.id }).then((order) => {
    if (!order) return res.json({ code: 0, msg: "请求失败" });

    return res.json({ code: 1, msg: "请求成功", order: order });
  });
});

// $route GET api/orders/pay
// @desc  返回的请求的json数据
// @access  public
router.post("/pay", (req, res) => {
  Order.updateOne({ id: req.body.id }, { $set: { state: 1 } }).then(() => {
    return res.json({ code: 1, msg: "修改成功" });
  });
});

// $route GET api/orders/cancel
// @desc  返回的请求的json数据
// @access  public
router.post("/cancel", (req, res) => {
  Order.deleteOne({ id: req.body.id }).then(() => {
    return res.json({ code: 1, msg: "取消成功" });
  });
});

// $route GET api/orders/change
// @desc  返回的请求的json数据
// @access  public
router.post("/change", (req, res) => {
  Order.update(
    { id: req.body.id },
    {
      $set: {
        takeName: req.body.takeName,
        takePhone: req.body.takePhone,
        address: req.body.address,
      },
    }
  ).then(() => {
    return res.json({ code: 1, msg: "修改成功" });
  });
});

// $route GET api/orders/orders
// @desc  返回的请求的json数据
// @access  public
router.get("/orders", (req, res) => {
  Order.find().then((order) => {
    if (order) {
      return res.json({ code: 1, msg: "请求成功", list: order });
    } else {
      return res.json({ code: 0, msg: "没有数据" });
    }
  });
});

// $route POST api/orders/pick
// @desc  返回的请求的json数据
// @access  public
router.post("/pick", (req, res) => {
  Order.updateOne({ id: req.body.id }, { $set: { state: 2 } }).then(() => {
    return res.json({ code: 1, msg: "修改成功" });
  });
});

// $route POST api/orders/evaluation
// @desc  返回的请求的json数据
// @access  public
router.post("/evaluation", (req, res) => {
  Order.updateOne(
    { id: req.body.id },
    {
      $push: {
        evaluation: {
          content: req.body.content,
          score: req.body.score,
          date: req.body.date,
          state: req.body.state,
        },
      },
    }
  ).then(() => {
    return res.json({ code: 1, msg: "插入成功" });
  });
});

module.exports = router;
