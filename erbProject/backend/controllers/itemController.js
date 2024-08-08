import Item from '../models/Item.js';
import Message from "../models/Message.js";
import User from "../models/User.js";
import multer from "multer";
import sharp from "sharp";
import * as fs from "fs";
import { env, title } from "process";
import jwt from 'jsonwebtoken';

const storageSetting = multer.diskStorage({
    destination : (req, file, cb) =>{
			console.log("here")
        cb(null, "./uploads")
				
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

export const uploadItemImage = multer({
    storage: storageSetting,
    fileFilter: (req, file, cb) =>{
        const mimetype = file.mimetype;
        if(mimetype=== "image/png" || mimetype==="image/jpg" || mimetype ==="image/jpeg" || mimetype === "image/gif"){

            cb(null, true);
        }else{
            //req.flash("error_msg", "Wrong file type for Item image !");
            cb(null, false);
        }
    }
}).single("file");

export const uploadFiles = (req, res) =>{
	
	if(req.file){
		let itemId = req.params.id;
		let fileName = req.file.path;

		Item.findOne({ _id: req.params.id}).then((item) =>{
			
			item.imagePath = fileName;
			
			//item.seller = res.locals.user._id
			item.save().then(() => {
				// req.flash("success_msg", "Note Updated !");
				// res.redirect("/ideas");
				let rtn={
					success: "Item Updated!",
				}
				res.status(200).json(rtn);
				//res.render("ideas"); // cannot use render, must use redirect re-get ideas
			})
			.catch((err)=> {
				let rtn = {
					errors: err,
					success: null
				}
				res.status(200).json(rtn);
			}); 
		});
	}
}

//Search item by tags or title
export const getSearch = (req, res) =>{

	//{
	// 	"title":"book",
	// 	"tags":["Books","Computers & Tech"]
	// }
	let obj = {};

	console.log('search result', req.body)
	
	console.log(req.body.title);
	if (req.body.title){
		obj.title = {$regex:req.body.title, $options: "$i"};
	}
	console.log(req.body.tags);
	if (req.body.tags){
		obj.tag = {$in: req.body.tags}
	}

	console.log(obj);
	Item.find(obj).lean().sort({date: "desc"}).then((items) => {
			console.log(items);
			let rtn ={
                items: items
            }
            res.status(200).json(rtn);
		})
		.catch((err) => {
            let rtn = {
                errors: "No session!",
                success: null
            }
            res.status(200).json(rtn);
		});
}

//Get list 
export const getItems = (req, res) =>{

	if (req.user.id == req.body.seller){
		Item.find({seller: {$eq:req.body.seller}})    
		.lean()
		.sort({date: "desc"})
		.then((items) => {
			console.log(items);
			let rtn ={
                items: items
            }
            res.status(200).json(rtn);
		})
		.catch((err) => {
            let rtn = {
                errors: "No session!",
                success: null
            }
            res.status(200).json(rtn);
		});

	}else{
		Item.find({$and:[{seller:{$eq:req.body.seller}},{status:{$in: ["ACTIVE", "DEALING"]}}]})  
		.lean()
		.sort({date: "desc"})
		.then((items) => {
			console.log(items);
			let rtn ={
                items: items
            }
            res.status(200).json(rtn);
		})
		.catch((err) => {
            let rtn = {
                errors: "No session!",
                success: null
            }
            res.status(200).json(rtn);
		});
	}

	
};

//Get item
export const getItem = async(req, res) =>{
	
	let rtn = {};
	rtn.item = await Item.findOne({_id:{$eq:req.params.id}});
	if (!rtn.item)
	{
		rtn.errors = "No item found";
		res.status(200).json(rtn);
	}
	else{
		rtn.messages = await Message.find({item:{$eq:req.params.id}});
		res.status(200).json(rtn);
	}
}

export const newUpdateStatus = (req, res) => {
	console.log('body', req.body)

	Item.findOne({_id: req.body.id}).then((newItem)=> {
		newItem.status = req.body.status;
		newItem.save().then(() => {
			console.log('success');
			res.json({success: 'true'})
		})

	})
}

//Change Status
export const putEditStatus = async (req, res) =>{

	let errors = [];
	if (!req.body.item){
		errors.push({text: "Please select a item"});
	}
	if(!req.body.status){
		errors.push({text: "Please select a status"});
	}
	if(!req.body.sender){
		errors.push({text: "No logged in sender"});
	}
	//if there are errors, render the page with error message
	if (errors.length > 0){
        let rtn = {
            errors: errors,
            success: null,
            item: req.body.item,
			sender: req.body.sender,
            status: req.body.status
        }
        res.status(200).json(rtn);
	}else{

		let curItem = await Item.findOne({_id: req.body.item});
		if (!curItem){
			let rtn = {
				errors: "No item found",
				success: null
			}
			res.status(200).json(rtn);
		}
		let seller = await User.findOne({_id: curItem.seller});
		if (!seller){
			let rtn = {
				errors: 'No seller found',
				success: null
			}
			res.status(200).json(rtn);
		}

		await Item.updateMany({_id:{$in:[req.body.item, req.body.reqItem]}},{$set:{status: req.body.status, date: new Date()}})

		let content = "";

		switch (req.body.status){
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

		if (req.body.reqItem){
			const msg = {
				sender: req.body.sender,
				item: req.body.reqItem,
				content: "Exchange item has been hold by " + seller.name,
				status: "SENT"
			}
			listmsg.push(msg);
		}
		const newMessage = {
			sender: req.body.sender,
            item: req.body.item,
			content: content,
            status: "SENT"
		};
		listmsg.push(newMessage);

		await Message.insertMany(listmsg).then((item)=>{
			let rtn = {
				success: "Message Sent!"
			}
			res.status(200).json(rtn);
		}).catch((err)=>{
			let rtn = {
				errors: "Message cannot sent",
				success: null
			};
			res.status(200).json(rtn)
		})
	}	
};


// Add item
export const postAddItem = async (req, res) =>{
	
	let errors = [];
	// if (!req.body.title){
	// 	errors.push({text: "Please add a title"});
	// }
	// if(!req.body.description){
	// 	errors.push({text: "Please add some description"});
	// }
	// if(!req.body.seller){
	// 	errors.push({text: "No logged in user"});
	// }
    // if(!req.body.tag){
    //     errors.push({text: "Please selected tag"})
    // }
	//if there are errors, render the page with error message
	if (errors.length > 0){
		// res.render("ideas/add", {
		// 	errors: errors,
		// 	title: req.body.title,
		// 	details: req.body.details
		// });
        let rtn = {
            errors: errors,
            success: null,
            title: req.body.title,
						description: req.body.description,
            imagePath: req.body.imagePath,
            tag: req.body.tag,
            status: req.body.status
        }
        res.status(200).json(rtn);
	}else{

		

		// if(req.file){
		// 	console.log("include file")
		// 	await sharp(req.file.buffer).resize(640,480).jpeg({quality:60})
		// 	.toFile(path.join("./uploads"),file.filename);
		// 	//let imagePath = fs.readFileSync(req.file.path).toString("base64");
		// }else{
		// 	console.log('without file')
		// }
		let fileName;
		let newName = '';
		if(req.file){
			//let itemId = req.params.id;
			fileName = req.file.path;
			console.log("fileName", fileName)
			newName = fileName.toString().slice(35);
			console.log("this is newName", newName)
			console.log("this is newName",  typeof newName)
	
		}

		const user =await User.findOne({_id: req.user.id})
		if(user){
			const newItem ={
				name: user.name,
				title: req.body.title,
				description: req.body.description,
				seller: req.user.id,
				tag: req.body.tag,
				imagePath : newName,
				status: req.body.status
			};

			new Item(newItem).save().then((item) => {  
	
				let rtn = {
						
						success: "Item Added!",
						title: req.body.title,
						description: req.body.description,
						tag: req.body.tag,
						imagePath: fileName,
						status: req.body.status,
						seller: req.body.seller
				}
				console.log('success')
				res.status(200).json(rtn);
		}).catch((err) => {
			let rtn = {
					errors: "Item cannot be added!",
					success: null
			}
			res.status(200).json(rtn);
	});

	
		} else res.status(400).send("");
			
			
	}
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
export const putEditItem = (req, res) =>{
	Item.findOne({ _id: req.params.id}).then((item) =>{
		item.title = req.body.title;
		item.description = req.body.description;
        item.tag = req.body.tag;
        item.imagePath = req.body.imagePath;
        item.seller = req.body.seller;
        //item.seller = res.locals.user._id
		item.save().then(() => {
			// req.flash("success_msg", "Note Updated !");
			// res.redirect("/ideas");
            let rtn={
                success: "Item Updated!",
            }
            res.status(200).json(rtn);
			//res.render("ideas"); // cannot use render, must use redirect re-get ideas
		})
		.catch((err)=> {
            let rtn = {
                errors: err,
                success: null
            }
            res.status(200).json(rtn);
		}); 
	});
};


//DELETE (II)
export const deleteItem = (req, res)=>{

	Item.deleteOne({ _id: req.params.id}).then(()=> {
		
        let rtn={
            success: "Item Deleted!",
        }
        res.status(200).json(rtn);

	}).catch((err)=> {
        let rtn = {
            errors: err,
            success: null
        }
        res.status(200).json(rtn);
    });
};


export const getRecords = (req, res) =>{
	//mongo db operators
	Item.aggregate([
		{ $lookup: {
			from : "users",
			localField: "seller",
			foreignField: "_id",
			as: "userInfo",
		} },
		{ $unwind: {
			path: "$userInfo",
			preserveNullAndEmptyArrays: true,
		}},
		{ $sort: {
			"date": -1
		}}
	]).then( recordsDB =>{
		// console.log(recordsDB[10]);
		// res.render("ideas/records",{records: recordsDB});
        let rtn={
            success: "Get success!",
            records: recordsDB
        }
        res.status(200).json(rtn);


	}).catch((err) => {
		// req.flash("error_msg","No session");
		// res.redirect("/users/login")
        let rtn = {
            errors: err,
            success: null
        }
        res.status(200).json(rtn);
	});
}

export const newGetRecord = (req, res) => {
	// Item.find({}).then((item) => {
	// 	console.log("im in here newRecord")
	// 	res.status(200).json(item)
	// }).catch(err => {
		// 	console.log("new record err", error)
		// })
		res.send("hi")
			console.log("im in here newRecord")
}




//#endregion
