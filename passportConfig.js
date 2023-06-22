const LocalStrategy = require("passport-local").Strategy;
const { authenticate } = require("passport");
const {pool} = require("./database");
const bcrypt = require("bcrypt");

function initialize(passport){
    const autheticateUser = (email , password, done) => {
        pool.query(
            `SELECT * FROM user_info WHERE email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    throw err;
                }

                console.log(results.rows);

                if (results.rows.length > 0){
                    const user = results.rows[0];

                    bcrypt.compare(password, user.password, (err, isMatch)=> {
                        if (err){
                            throw err;
                        }

                        if (isMatch){
                            return done(null, user);
                        }else {
                            return done(null, false, {message: "Password is not correct"});
                        }
                    });
                }else{
                    return done(null, false, {message: "Email is not registered"});
                }
            }
        )
    };

    passport.use(
        new LocalStrategy(
           {
                usernameField: 'email',
                passwordField: "password"
            },

            autheticateUser
        )
    );

    passport.serializeUser((user, done) => done(null, user.user_id));

    passport.deserializeUser((user_id, done) =>{
        pool.query(`SELECT * FROM user_info WHERE user_id = $1`, [user_id], (err, results)=>{
            if (err){
                throw err
            }
            return done(null, results.rows[0]);
        });
    });
}

module.exports = initialize;