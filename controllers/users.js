import User from "../models/User.js";

const users = {
    update: async(req, res) => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            if(req.body.password){
                //Encrypt Password
                req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                    },
                    { new: true }
                    );
                console.log('updated', updatedUser);
                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(403).json("You can only update your account");
        }
    },
    delete: async(req, res) => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            try{
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("The user has been deleted.");
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(403).json("You can delete only your account");
        }
    },
    get: async(req, res) => {
        try{
            const user = await User.findById(req.params.id);
            const {password, ...info} = user._doc;
            res.status(200).json(info);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getAll: async(req, res) => {
        const query = req.query.limit;
        if(req.user?.isAdmin){
            try {
                const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
                return res.status(200).json(users);
            } catch (error) {
                res.status(500).json(error);
            }
        }else{
             res.status(403).json("You are not authorized to see all users");
        }
        
    },
    stats: async (req, res) => {
        const today = new Date();
        const lastYear = today.setFullYear(today.getFullYear() - 1);
        try {
            const data = await User.aggregate([
                {
                    $project: {
                        month: {$month: "$createdAt"}
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: {$sum: 1}
                    }
                }
            ]);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default users;