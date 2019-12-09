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
    new Strategy(async (Sahkoposti, Salasana, done) => {
        const params = [Sahkoposti];
        try {
            const [user] = await userModel.getUserLogin(params);
            console.log("Local Strategy", user);
            if (user === undefined) {
                return done(null, false, { message: "Incorrect Email." });
            }
            if (!bcrypt.compareSync(Salasana, user.Salasana)) {
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
            secretOrKey: "suolattu_avain"
        },
        async (jwtPayload, done) => {
            console.log('payload', jwtPayload);
            try {
                const [user] = await userModel.getUser(jwtPayload.Sahkoposti);
                if (user === undefined) {
                    return done(null, false);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err) 
                    
                
            }
        },
    )
);


module.exports = passport;