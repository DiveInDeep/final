import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcryptjs";
import User from "./../models/User.js"; 


export default function(passport) {
    passport.use(new LocalStrategy(
        {usernameField : "emailInput", passwordField: "passwordInput"}, function(emailInput,passwordInput, done){
                //done: callback function
                //console.log("inside config: " + emailInput, passwordInput);
                console.log(`inside config: ${0}, ${1}` , emailInput, passwordInput); //passwordInput is not hashed
                User.findOne({email: emailInput})
                    .then((user) =>{
                        //if user not found
                        if(!user){
                            return done (null, false, {
                                type: "fail_passport",
                                message:"No User Found"
                            });
                        }
                        //user found -> check password
                        //err -> js global system object
                        bcrypt.compare(passwordInput, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user);
                                //explaination on done fuction: there are 3params in done function:
                                //error: set null since there is no error 
                                //user: set user, to return user information
                                //options: can be ignored
                            } else {
                                return done (null, false,{
                                    type: "fail_passport",
                                    message:"Password Incorrect",
                                });
                            }
                        });
                    })
            }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}

