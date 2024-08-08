import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from "body-parser";
import session from "express-session";
import usersRoute from "./routes/usersRoute.js"
import itemsRoute from "./routes/itemsRoute.js"
import messagesRoute from "./routes/messagesRoute.js"
import methodOverride from "method-override";
import cors from 'cors';
// import verify from './helpers/verify.js';
import emailRoute from './routes/emailRoute.js';
import userCenterRoute from './routes/userCenterRoute.js';


dotenv.config();
const app = express();
app.use(morgan("tiny"));
app.use(express.static('uploads'))

mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log('mongodb connected !')
}).catch((err) => {
	console.log('mongodb connect error !', err)
})

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use('/userCenter', userCenterRoute);
app.use('/email', emailRoute);
app.use("/users", usersRoute);
app.use("/items", itemsRoute);
app.use("/messages", messagesRoute)

app.listen(8081, () => {
  console.log(`server started on port ${process.env.PORT}!`)
})