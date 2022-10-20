import jwt from 'jsonwebtoken';

export default function verify (req, res, next){
  const authHeader = req.headers.authorization;
  console.log("verify1: ", authHeader  )
  if (authHeader) {
     const token = authHeader.split(' ')[1];
     console.log("verify2: " , token);
     jwt.verify(token, 'mySecretKey', (err, user) => {
       if (err) {
        console.log("verify3");
        return res.status(403).json('Token is not valid!');
      }
      req.user = user;
      console.log('verify4:', req.user);
      next();
     })
  } else {
    res.status(401).json('You are not authorization')
  }

}