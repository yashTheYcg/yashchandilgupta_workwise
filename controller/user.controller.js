const pool = require('../database/db.connection');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');
const dotenv = require("dotenv");
const uuid4 = require('uuid4');
const queries = require('../database/queries');
const {validationResult} = require('express-validator');

// path to config.env file
dotenv.config({ path: path.join(__dirname ,"../config.env")});

// for signing up the user
const signupUser = async (req,res)=> {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password,type } = req.body;
 
        // creating new user
            if (!email || !password || !type) {
                return res
                    .status(404)
                    .json({ message: "Please fill the required field" });
            }
            
            // checking whether email is exist
            await pool.query(queries.checkEmailExist,[email.toLowerCase()],async (error,result)=> {
                if(result.rows.length){
                    return res.status(400).json({message:"Email Already Exist"});
                }
                const userid = uuid4();
                const salt = await bcrypt.genSalt(10);
                // now we set user password to hashed password
                const hashedPassword = await bcrypt.hash(password, salt);
                // add user to database
                pool.query(queries.signup,[userid,email.toLowerCase(),hashedPassword,type],(error,result)=> {
                    if (error) throw error;
                    res.status(201).json({message:"User Registered sucessfully"});  
                })
            })
    } catch (error) {
        console.error(error);
    }
}


// for logging up the user
const loginUser = async (req,res)=> {
    const { email, password } = req.body;

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!email || !password) {
            return res.status(422).json({ message: "Please fill the required field" });
        }

        pool.query(queries.checkEmailExist,[email.toLowerCase()],async (error,result)=> {
            if (result.rows.length) {
                const user = result.rows[0]
                const validPassword = await bcrypt.compare(password, user.password);
                if (validPassword) {
                    const data = {
                        user: {
                            id: user.userid,
                            type: user.type,
                        },
                    };
                    const authtoken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '48hr' });
                    res.status(201).json({ message: "Login Successfully", authtoken: authtoken });
                } else {
                    return res.status(400).json({ message: "Wrong credentials" });
                }
            } else {
                return res.status(400).json({ message: "User does not exit" });
            }
        })

       
    } catch (error) {
        console.error(error);
    }
}



module.exports={signupUser,loginUser}