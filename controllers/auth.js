import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const auth = {
    register: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(), //Encrypt Password
            email: req.body.email,
        });
        try{
            const user = await newUser.save();
            res.status(201).json(user);
        }catch(e){
            res.status(500).json(e)
        }
    },
    login: async (req, res) => {
        try{
            const user =await User.findOne({email: req.body.email});
            if(!user){
               return res.status(401).json("Email does not exist");
            }
            
            // Decrypt Password
            const bytes  = CryptoJS.AES.decrypt(user?.password, process.env.SECRET_KEY);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            //Compare Passwords
            if(originalPassword !== req.body.password) {
               return res.status(401).json("Password does not match");
            }
            const accessToken = jwt.sign(
                {id: user._id, isAdmin: user.isAdmin},
                process.env.SECRET_KEY,
                {expiresIn: '5d'}
            )
            const {password, ...info} = user._doc;
            console.log('user', info, password);
            res.status(200).json({ ...info, accessToken });

        }catch(e){
            console.log('error', e)
            res.status(500).json(e);
        }
    }
}

export default auth;