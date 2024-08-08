import Item from "../models/Item.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import multer from "multer";
import sharp from "sharp";
import * as fs from "fs";
import { env, title } from "process";
import jwt from "jsonwebtoken";

const storageSetting = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("here");
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadItemImage = multer({
  storage: storageSetting,
  fileFilter: (req, file, cb) => {
    const mimetype = file.mimetype;
    if (
      mimetype === "image/png" ||
      mimetype === "image/jpg" ||
      mimetype === "image/jpeg" ||
      mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      //req.flash("error_msg", "Wrong file type for Item image !");
      cb(null, false);
    }
  },
}).single("file");

export const uploadFiles = (req, res) => {
  if (req.file) {
    let itemId = req.params.id;
    const fileName = req.file.path;

    console.log("this is upload files1:::", fileName);
    console.log("this is upload files2:::", req);

    Item.findOne({ _id: req.params.id }).then((item) => {
      item.imagePath = fileName;

      //item.seller = res.locals.user._id
      item
        .save()
        .then(() => {
          // req.flash("success_msg", "Note Updated !");
          // res.redirect("/ideas");
          let VO = {
            success: true,
            message: "Item Updated!",
          };
          res.status(200).json(VO);
          //res.render("ideas"); // cannot use render, must use redirect re-get ideas
        })
        .catch((err) => {
          let VO = {
            success: false,
            message: err,
          };
          res.status(200).json(VO);
        });
    });
  }
};

//Search item by tags or title
export const getSearch = (req, res) => {
  //{
  // 	"title":"book",
  // 	"tags":["Books","Computers & Tech"]
  // }
  let obj = {};

  console.log("search result", req.body);

  console.log(req.body.title);
  if (req.body.title) {
    obj.title = { $regex: req.body.title, $options: "$i" };
  }
  console.log(req.body.tags);
  if (req.body.tags) {
    obj.tag = { $in: req.body.tags };
  }

  console.log(obj);
  Item.find(obj)
    .lean()
    .sort({ date: "desc" })
    .then(async (items) => {
      console.log({items});
      const records = [];

      for (const record of items) {
        const filePath = `./uploads/${record.imagePath}`;
        const data = await fs.promises.readFile(filePath);
        const base64Data = Buffer.from(data).toString("base64");
        record.img = `data:image/jpeg;base64,${base64Data}`;
        records.push(record);
      }
      let rtn = {
        items: records,
      };
      res.status(200).json(rtn);
    })
    .catch((err) => {
      let rtn = {
        errors: "No session!",
        success: null,
      };
      res.status(200).json(rtn);
    });
};

//Get list
export const getItems = (req, res) => {
  if (req.user.id == req.body.seller) {
    Item.find({ seller: { $eq: req.body.seller } })
      .lean()
      .sort({ date: "desc" })
      .then((items) => {
        console.log(items);
        let rtn = {
          items: items,
        };
        res.status(200).json(rtn);
      })
      .catch((err) => {
        let rtn = {
          errors: "No session!",
          success: null,
        };
        res.status(200).json(rtn);
      });
  } else {
    Item.find({
      $and: [
        { seller: { $eq: req.body.seller } },
        { status: { $in: ["ACTIVE", "DEALING"] } },
      ],
    })
      .lean()
      .sort({ date: "desc" })
      .then((items) => {
        console.log(items);
        let rtn = {
          items: items,
        };
        res.status(200).json(rtn);
      })
      .catch((err) => {
        let rtn = {
          errors: "No session!",
          success: null,
        };
        res.status(200).json(rtn);
      });
  }
};

//Get item
export const getItem = async (req, res) => {
  let rtn = {};
  let item = await Item.findOne({ _id: { $eq: req.params.id } });
  const filePath = `./uploads/${item.imagePath}`;
  const data = await fs.promises.readFile(filePath);
  const base64Data = Buffer.from(data).toString("base64");
  const img = `data:image/jpeg;base64,${base64Data}`;
  rtn.item = { ...item._doc, img };
  if (!rtn.item) {
    rtn.errors = "No item found";
    res.status(200).json(rtn);
  } else {
    rtn.messages = await Message.find({ item: { $eq: req.params.id } });
    res.status(200).json(rtn);
  }
};

export const newUpdateStatus = (req, res) => {
  console.log("body", req.body);

  Item.findOne({ _id: req.body.id }).then((newItem) => {
    newItem.status = req.body.status;
    newItem.save().then(() => {
      console.log("success");
      res.json({ success: "true" });
    });
  });
};

//Change Status
export const putEditStatus = async (req, res) => {
  let errors = [];
  if (!req.body.item) {
    errors.push({ text: "Please select a item" });
  }
  if (!req.body.status) {
    errors.push({ text: "Please select a status" });
  }
  if (!req.body.sender) {
    errors.push({ text: "No logged in sender" });
  }
  //if there are errors, render the page with error message
  if (errors.length > 0) {
    let rtn = {
      errors: errors,
      success: null,
      item: req.body.item,
      sender: req.body.sender,
      status: req.body.status,
    };
    res.status(200).json(rtn);
  } else {
    let curItem = await Item.findOne({ _id: req.body.item });
    if (!curItem) {
      let rtn = {
        errors: "No item found",
        success: null,
      };
      res.status(200).json(rtn);
    }
    let seller = await User.findOne({ _id: curItem.seller });
    if (!seller) {
      let rtn = {
        errors: "No seller found",
        success: null,
      };
      res.status(200).json(rtn);
    }

    await Item.updateMany(
      { _id: { $in: [req.body.item, req.body.reqItem] } },
      { $set: { status: req.body.status, date: new Date() } }
    );

    let content = "";

    switch (req.body.status) {
      case "ACTIVE":
        content = curItem.title + " is available now!";
        break;
      case "HIDDEN":
        break;
      case "DEALING":
        content = `Please visit <a href='${process.env.HTTP}:${process.env.PORT}/items/${sender._id}'>${sender.name}'s shop</a> and select an exchange item in 3 days!`;
        break;
      case "ON_HOLD":
        content = seller.name + " accepted your request.";
        break;

      case "CLOSED":
        content = "Congratulations, your trade is success and closed.";
        break;
    }

    let listmsg = [];

    if (req.body.reqItem) {
      const msg = {
        sender: req.body.sender,
        item: req.body.reqItem,
        content: "Exchange item has been hold by " + seller.name,
        status: "SENT",
      };
      listmsg.push(msg);
    }
    const newMessage = {
      sender: req.body.sender,
      item: req.body.item,
      content: content,
      status: "SENT",
    };
    listmsg.push(newMessage);

    await Message.insertMany(listmsg)
      .then((item) => {
        let rtn = {
          success: true,
          message: "Message Sent!",
        };
        res.status(200).json(rtn);
      })
      .catch((err) => {
        let rtn = {
          success: false,
          message: "Message cannot sent",
        };
        res.status(200).json(rtn);
      });
  }
};

// Add item
export const postAddItem = async (req, res) => {
  let VO = {
    message: null,
    success: false,
  };

  const user = await User.findOne({ _id: req.user.id });

  if (!user) {
    VO.message = "User Not Found";
    return res.status(400).json(VO);
  }

  const newItem = {
    name: user.name,
    title: req.body.title,
    description: req.body.description,
    seller: req.user.id,
    tag: req.body.tag,
    imagePath: req.body.imagePath,
    status: req.body.status,
  };

  new Item(newItem)
    .save()
    .then((item) => {
      console.log("This is saved item", item);
      VO.success = true;
      VO.message = "Upload Successful";
      res.status(200).json(VO);
    })
    .catch((err) => {
      VO.message = err;
      res.status(400).json(VO);
    });
};

//EDIT (II): triggle in list page when "edit" button click
// export const getEditItem = (req,res) =>{
// 	Idea.findOne({ _id: req.params.id})
// 			.lean()
// 			.then((idea) => {
// 			res.render("ideas/edit", {idea: idea});
// 		}).catch((err) => {
// 			req.flash("error_msg","No session");
// 			res.redirect("/users/login")
// 		});
// };

//PUT (II) : trigger by button Save in edit page
export const putEditItem = (req, res) => {
  Item.findOne({ _id: req.params.id }).then((item) => {
    item.title = req.body.title;
    item.description = req.body.description;
    item.tag = req.body.tag;
    item.imagePath = req.body.imagePath;
    item.seller = req.body.seller;
    //item.seller = res.locals.user._id
    item
      .save()
      .then(() => {
        // req.flash("success_msg", "Note Updated !");
        // res.redirect("/ideas");
        let rtn = {
          success: "Item Updated!",
        };
        res.status(200).json(rtn);
        //res.render("ideas"); // cannot use render, must use redirect re-get ideas
      })
      .catch((err) => {
        let rtn = {
          errors: err,
          success: null,
        };
        res.status(200).json(rtn);
      });
  });
};

//DELETE (II)
export const deleteItem = (req, res) => {
  Item.deleteOne({ _id: req.params.id })
    .then(() => {
      let rtn = {
        success: "Item Deleted!",
      };
      res.status(200).json(rtn);
    })
    .catch((err) => {
      let rtn = {
        errors: err,
        success: null,
      };
      res.status(200).json(rtn);
    });
};

export const getRecords = async (req, res) => {
  try {
    const recordsDB = await Item.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: {
          path: "$userInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          date: -1,
        },
      },
    ]);

    const records = [];

    for (const record of recordsDB) {
      const filePath = `./uploads/${record.imagePath}`;
      const data = await fs.promises.readFile(filePath);
      const base64Data = Buffer.from(data).toString("base64");
      record.img = `data:image/jpeg;base64,${base64Data}`;
      records.push(record);
    }
    const VO = {
      success: true,
      message: "success",
      data: records,
    };

    res.status(200).json(VO);
  } catch (err) {
    const rtn = {
      errors: err,
      success: null,
    };
    res.status(500).json(rtn);
  }
};

export const newGetRecord = (req, res) => {
  // Item.find({}).then((item) => {
  // 	console.log("im in here newRecord")
  // 	res.status(200).json(item)
  // }).catch(err => {
  // 	console.log("new record err", error)
  // })
  res.send("hi");
  console.log("im in here newRecord");
};

//#endregion
