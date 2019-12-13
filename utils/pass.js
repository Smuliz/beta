"use strict";
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");


// Local strategy for E-mail&password login

passport.use(
    new Strategy({   usernameField: 'Sahkoposti',   passwordField: 'Salasana'  }, async (username, password, done) => {
        const params = [username];
        console.log("pass.js local", params, password);
        try {
            const [user] = await userModel.getUserLogin(params);
            console.log("Local Strategy", user.Salasana);
            if (user === undefined) {
                return done(null, false, { message: "Incorrect Email." });
            }
            if (!bcrypt.compareSync(password, user.Salasana)) {
                return done(null, false, { message: "Incorrect Password" });
            }
            delete user.Salasana // salasanan poisto ennen returnia
            return done(null, { ...user }, { message: "Logged in succesfully" });
        } catch (e) {
            return done(e);
        }
    })
);

// JWT
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "x"
        },
        async (jwtPayload, done) => {
            console.log('payload', jwtPayload);
             //return done(null,jwtPayload);
            try {
                const [user] = await userModel.getUser(jwtPayload.Sahkoposti);
                console.log("USER", user);
                if ([user] === undefined) {
                    console.log("ei toimi");
                    return done(null, false);
                } else {
                    console.log("jwt toimii");  
                    return done(null, {...user});
                }
            } catch (err) {
                console.log("error in jwt")
                return done(err) 
                    
                
            }
        },
    )
);


module.exports = passport;