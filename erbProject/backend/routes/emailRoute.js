import express from 'express';
import nodeMail from '../helpers/nodeMailer.js';
import { encrypt, decrypt } from '../helpers/crypto.js';
import User from '../models/User.js';
import bcrypt from "bcryptjs";


const router = express.Router();


router.post('/api/send', async (req, res) => {
	console.log(req.body);
	const email = req.body.email
  const hash = encrypt(email.toString());
  const { iv, content } = hash;

	const mail = {
			from: 'erousell2022@gmail.com',
			subject: 'Erousell Reset your password',
			to: email.toString(),
      html: `<p>your password has been reset!</p><p>Please use blow password to login</p><p>${iv}</p>`
	};

	User.findOne({email: email}).then((user) => {
		console.log('this is user', user)
		if (!user) {
			return  res.status(400).json({msg: "user not find"})
		}
		bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(iv, salt, async (err, hash) =>{
          if(err) throw err;
          user.password = hash;
          user.save().then(async () => {
						await nodeMail.sendMail(mail, (err, info) => {
							if (!err) {
									res.json({msg: "success"})
							} else {
									res.json({msg: "fail"})
							}
					})
        }).catch((err) =>{
            res.status(500).json({msg: 'fail'});
          });
      })
  })
	}) 
});

export default router;