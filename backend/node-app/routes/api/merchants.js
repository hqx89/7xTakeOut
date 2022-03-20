// @login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const Merchant = require("../../models/Merchant");

// $route GET api/merchants/test
// @desc  返回的请求的json数据
// @access  public
router.get("/test", (req, res) => {
  res.json({ msg: "merchant works" });
});

// $route POST api/merchants/register
// @desc  返回的请求的json数据
// @access  public
router.post("/register", (req, res) => {
  // 查询数据库中是否拥有账号
  Merchant.findOne({ merchantName: req.body.merchantName }).then((merchant) => {
    if (merchant) {
      return res.json({ code: 0, msg: "账号已被注册!" });
    } else {
      const newMerchant = new Merchant({
        storeName: req.body.storeName,
        merchantName: req.body.merchantName,
        password: req.body.password,
        imgCode: req.body.imgCode,
        storeType: req.body.storeType,
        storeCity: req.body.storeCity,
      });

      // 对密码进行加密
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newMerchant.password, salt, (err, hash) => {
          if (err) throw err;

          newMerchant.password = hash;

          newMerchant
            .save()
            .then((merchant) => res.json(merchant))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// $route POST api/merchants/login
// @desc  返回token jwt passport
// @access  public
router.post("/login", (req, res) => {
  const merchantName = req.body.merchantName;
  const password = req.body.password;
  // 查询数据库
  Merchant.findOne({ merchantName }).then((merchant) => {
    if (!merchant) {
      return res.json({ code: 0, msg: "账号不存在" });
    }
    if (merchant.state == 0) {
      return res.json({ code: 0, msg: "账号还在审核中，请耐心等待" });
    }

    // 密码匹配
    bcrypt.compare(password, merchant.password).then((isMatch) => {
      if (isMatch) {
        const rule = { id: merchant.id, name: merchant.merchantName };
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;

          return res.json({
            code: 1,
            msg: "success",
            token: "Bearer " + token,
          });
        });
      } else {
        return res.json({ code: 0, msg: "账号或密码错误!" });
      }
    });
  });
});

// $route GET api/merchants/store
// @desc  返回的请求的json数据
// @access  public
router.get("/store", (req, res) => {
  Merchant.find().then((merchant) => {
    if (merchant) {
      return res.json({ code: 1, msg: "请求成功", list: merchant });
    } else {
      return res.json({ code: 0, msg: "没有数据" });
    }
  });
});

// $route GET api/merchants/audit
// @desc  返回通过审核的商家json数据
// @access  public
router.post("/audit", (req, res) => {
  Merchant.updateOne(
    { merchantName: req.body.merchantName },
    { $set: { state: 1 } }
  ).then(() => {
    return res.json({ code: 1, msg: "操作成功！已通过商家的注册审核" });
  });
});

// $route post api/merchants/single
// @desc  返回当个商家json数据
// @access  public
router.post("/single", (req, res) => {
  Merchant.findOne({ merchantName: req.body.merchantName }).then((merchant) => {
    if (!merchant) {
      return res.json({ code: 0, msg: "该商店不存在" });
    }

    return res.json({ code: 1, msg: "请求成功", store: merchant });
  });
});

// $route POST api/merchants/delete
// @desc  返回的请求的json数据
// @access  public
router.post("/delete", (req, res) => {
  Merchant.deleteOne({ merchantName: req.body.merchantName }).then(() => {
    return res.json({ code: 1, msg: "删除成功!" });
  });
});

// $route POST api/merchants/add
// @desc  返回的请求的json数据
// @access  public
router.post("/add", (req, res) => {
  Merchant.updateOne(
    { merchantName: req.body.merchantName },
    { $push: { goodsType: { goodsTypeName: req.body.goodsType } } }
  ).then(() => {
    return res.json({ code: 1, msg: "插入成功" });
  });
});

// $route POST api/merchants/unset
// @desc  返回的请求的json数据
// @access  public
router.post("/unset", (req, res) => {
  Merchant.updateOne(
    { merchantName: req.body.merchantName },
    { $set: { goodsType: req.body.goodsType } }
  ).then(() => {
    return res.json({ code: 1, msg: "删除成功" });
  });
});

// $route POST api/merchants/addGoods
// @desc  返回的请求的json数据
// @access  public
router.post("/addGoods", (req, res) => {
  Merchant.updateOne(
    { merchantName: req.body.merchantName },
    {
      $push: {
        goods: {
          goodsName: req.body.goodsName,
          type: req.body.type,
          goodsPrice: req.body.goodsPrice,
          imgCode: req.body.imgCode,
          desc: req.body.desc,
          date: req.body.date,
        },
      },
    }
  ).then(() => {
    return res.json({ code: 1, msg: "插入成功" });
  });
});

// $route POST api/merchants/inGoods
// @desc  返回的请求的json数据
// @access  public
router.post("/inGoods", (req, res) => {
  Merchant.updateOne(
    { merchantName: req.body.merchantName },
    { $set: { goods: req.body.goods } }
  ).then(() => {
    return res.json({ code: 1, msg: "删除成功" });
  });
});

// $route POST api/merchants/consumption
// @desc  返回的请求的json数据
// @access  public
router.post("/consumption", (req, res) => {
  Merchant.update(
    { merchantName: req.body.merchantName },
    { $inc: { number: 1 } }
  ).then(() => {
    return res.json({ code: 1, msg: "修改成功！" });
  });
});

module.exports = router;
