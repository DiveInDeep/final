import mongoose from "mongoose";
const {Schema} = mongoose;


// const tags = new Schema({
//     strings: [String]
//   });

const ItemSchema = new Schema(
    {   name: {
            type: String,
            required:true,
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        imagePath:{
            type: String,
            required: false,
        },
        seller:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            enum:["ACTIVE", "HIDDEN", "ON_HOLD", "DEALING", "CLOSED"],
            required: true,
        },
        tag:{
            type: [String],
            enum:[
                "Following",
                "Services",
                "Computers & Tech",
                "Mobile Phones & Gadgets", 
                "Women's Fashion", 
                "Property", 
                "Men's Fashion", 
                "Cars", 
                "Beauty & Personal Care", 
                "Luxury", 
                "Free Items", 
                "Video Gaming", 
                "Audio", 
                "Books",
                "Photography", 
                "Furniture & Home Living", 
                "TV & Home Appliances", 
                "Babies & Kids", 
                "Hobbies & Toys", 
                "Health & Nutrition",
                "Sports Equipment", 
                "Food & Drinks", 
                "Pet Supplies", 
                "Tickets & Vouchers", 
                "Motorbikes", 
                "Auto Accessories",
                "Jobs",
                "Community",
                "Preorders",
                "Looking For", 
                "Everything Else",
                "Announcements"],
            required: true
        },
        date:{
            type: Date,
            default: Date.now,
        },
    }
);

const Item = mongoose.model("items", ItemSchema);
export default Item;
