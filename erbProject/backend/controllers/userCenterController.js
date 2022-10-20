import User from '../models/User.js';


export const getUserCenter = (req, res) => {
  // console.log("user:", req.user)
  const { id } = req.params;
  console.log(id);
  User.findOne({_id: id}).then((item) => {
    const { _id, name, email, date} = item;
    const user = {
      id: _id,
      name: name,
      email: email,
      date: date
    }

    res.json(item);
  }).catch(err => {
      console.log("this is", err)
  })
}