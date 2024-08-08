import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Item from "../models/Item.js";
import fs from 'fs';

export const postIsLogin = (req, res) => {
  const authHeader = req.headers.accessToken;
};

export const postLogin = async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    //if user not exist
    let resObj = {
      errors: "User not found!",
      success: null,
    };
    return res.status(400).json(resObj);
  }

  const accessToken = jwt.sign(
    { id: user._id, name: user.name },
    "mySecretKey",
    { expiresIn: "2d" }
  );

  bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
    if (err) throw err;
    console.log("login err", err);
    if (isMatch) {
      console.log("match?");
      let resObj = {
        errors: null,
        success: "Login successful!",
        user: user.name,
        accessToken: accessToken,
        userId: user._id,
      };

      user.isLogin = true;

      user
        .save()
        .then(() => {
          res.status(200).json(resObj);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let resObj = {
        errors: "Password Incorrect!",
        success: null,
      };
      res.status(400).json(resObj);
    }
  });
};

export const getLogout = (req, res) => {
  req.logout((err) => {
    if (err) throw err;
    let resObj = {
      errors: err,
      success: "Logout successful!",
    };
    res.status(200).json(resObj);
  });
};

//未test，return {user,items}
export const getProfile = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  console.log(user);
  let items = await Item.find({});
  items = items.filter((item) => item.seller.includes(userId));
  const records = [];

  for (const item of items) {
    const filePath = `./uploads/${item.imagePath}`;
    const data = await fs.promises.readFile(filePath);
    const base64Data = Buffer.from(data).toString("base64");
    const img = `data:image/jpeg;base64,${base64Data}`;
    records.push({...item._doc, img});
  }

  if (user) {
    res.status(200).send({ user, items: records });
  } else res.status(400).send("cannot get profile");
};

export const postProfile = (req, res) => {
  let { userId } = req.params;
  console.log(req.body);
  // console.log(userId);

  User.findOneAndUpdate(
    { _id: userId },
    { $set: req.body },
    { returnDocument: "after" }
  )
    .then(() => {
      // console.log(user);
      res.status(200).send("Profile update success!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Profile update fail");
    });

  // User.findOne({_id: res.locals.user._id})
  //     .then((user) => {
  //     user.email = req.body.email;
  //     user.save().then(() => {
  //         // res.redirect("/users/profile");
  //     }).catch((err) => {
  //         console.log(err);
  //     });
  //     ;
  // });
};

export const postRegister = async (req, res) => {
  // console.log(req.body);
  let errors = [];
  if (!req.body.name) {
    errors.push({ text: "Name is missing!" });
  }
  if (!req.body.email) {
    errors.push({ text: "Email is missing!" });
  }
  if (errors.length > 0) {
    let resObj = {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
    };
    return res.status(200).json(resObj);
  }
  //check if user already exist
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("user already exist!");
  }

  //else
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(() => {
          let resObj = {
            errors: null,
            success: "Register Done!",
          };
          res.status(200).json(resObj);
        })
        .catch((err) => {
          console.log(err);
          let resObj = {
            errors: "Sign-up fail, please try again later.",
            success: null,
          };
          res.status(500).json(resObj);
        });
    });
  });
};

export const postTest = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newUser
    .save()
    .then(() => {
      res.status(200).json({ newUser: newUser });
    })
    .catch((err) => {
      if (err) throw err;
      res.status(500).json({ newUser: null });
      return;
    });
};
