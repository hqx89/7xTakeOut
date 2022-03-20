// @login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");

// $route GET api/users/test
// @desc  返回的请求的json数据
// @access  public
router.get("/test", (req, res) => {
  res.json({ msg: "login works" });
});

// $route POST api/users/register
// @desc  返回的请求的json数据
// @access  public
router.post("/register", (req, res) => {
  // 查询数据库中是否拥有手机号
  User.findOne({ phone: req.body.phone }).then((user) => {
    if (user) {
      return res.json({ code: 0, msg: "手机号已被注册!" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
      });

      // 对密码进行加密
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// $route POST api/users/login
// @desc  返回token jwt passport
// @access  public
router.post("/login", (req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;
  // 查询数据库
  User.findOne({ phone }).then((user) => {
    if (!user) {
      return res.json({ code: 0, msg: "手机号不存在" });
    }

    // 密码匹配
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const rule = { id: user.id, name: user.username };
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;

          return res.json({
            code: 1,
            msg: "success",
            token: "Bearer " + token,
          });
        });
      } else {
        return res.json({ code: 0, msg: "密码错误!" });
      }
    });
  });
});

// $route GET api/users/current
// @desc  return current user
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      phone: req.user.phone,
    });
  }
);

// $route GET api/users/list
// @desc  返回的请求的json数据
// @access  public
router.get("/list", (req, res) => {
  User.find().then((user) => {
    if (user) {
      return res.json({ code: 1, msg: "请求成功", list: user });
    } else {
      return res.json({ code: 0, msg: "没有数据" });
    }
  });
});

// $route POST api/users/delete
// @desc  返回的请求的json数据
// @access  public
router.post("/delete", (req, res) => {
  User.deleteOne({ phone: req.body.phone }).then(() => {
    return res.json({ code: 1, msg: "删除成功!" });
  });
});

// $route POST api/users/information
// @desc  返回的请求的个人数据
// @access  public
router.post("/information", (req, res) => {
  User.findOne({ phone: req.body.phone }).then((user) => {
    if (!user) {
      return res.json.code(400);
    }
    return res.json({ code: 1, msg: "请求成功", user: user });
  });
});

// $route POST api/users/nickname
// @desc  返回的请求的json数据
// @access  public
router.post("/nickname", (req, res) => {
  User.updateOne(
    { phone: req.body.phone },
    { $set: { username: req.body.username } }
  ).then(() => {
    return res.json({ code: 1, msg: "修改昵称成功！" });
  });
});

// $route POST api/users/consumption
// @desc  返回的请求的json数据
// @access  public
router.post("/consumption", (req, res) => {
  User.update(
    { phone: req.body.phone },
    { $inc: { number: 1, total: +req.body.total } }
  ).then(() => {
    return res.json({ code: 1, msg: "修改成功！" });
  });
});

module.exports = router;
