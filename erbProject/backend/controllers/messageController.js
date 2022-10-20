import Message from "../models/Message.js";

// Add item
export const postAddMessage = (req, res) =>{
	
	let errors = [];
	if(!req.body.sender){
		errors.push({text: "No sender"});
	}
	if (!req.body.item){
		errors.push({text: "No item"});
	}
	if(!req.body.content){
		errors.push({text: "Please add some content"});
	}
	//if there are errors, render the page with error message
	if (errors.length > 0){

        let rtn = {
            errors: errors,
            success: null,
            sender: req.body.sender,
            item: req.body.item,
			content: req.body.content
        }
        res.status(200).json(rtn);
	}else{
		//Step 2: CREATE
		const newMessage = {
			sender: req.body.sender,
            item: req.body.item,
			content: req.body.content,
            status: "SENT"
		};

		new Message(newMessage).save().then((item) => {  
            let rtn = {
                success: "Message Sent!"
            }
            res.status(200).json(rtn);
		}).catch((err) => {
        let rtn = {
            errors: "Message cannot sent",
            success: null
        }
        res.status(200).json(rtn);
    });
	}
};