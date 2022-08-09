import List from "../models/List.js";

const lists = {
    create: async(req, res) => {
        if(req.user.isAdmin){
            const newList = new List(req.body);
            try {
                const savedList = await newList.save();
                res.status(201).json(savedList);

            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(403).json("You don't have access to create a list");
        }
    },
    delete: async(req, res) => {
        if(req.user.isAdmin){
            try {
                await List.findByIdAndDelete(req.params.id);
                res.status(200).json("List has been deleted");

            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(403).json("You don't have access to delete a list");
        }
    },
    // get: async(req, res) => {
    //     const type = req.query.type;
    //     const genre = req.query.genre;
    //     if(req.user.isAdmin){
    //         try {
    //             const list = await List.findById(req.params.id);
    //             res.status(200).json(list);

    //         } catch (error) {
    //             res.status(500).json(error);
    //         }
    //     }else{
    //         res.status(403).json("You don't have access to get a list");
    //     }
    // },
    get: async(req, res) => {
        const type = req.query.type;
        const genre = req.query.genre;
        let list =[];
            try {
                if(type){
                    if(genre){
                        list = await List.aggregate([
                            {$sample: { size: 10 }},
                            { $match: { type, genre } }
                        ]);
                    }else {
                        list = await List.aggregate([
                            {$sample: { size: 10 }},
                            { $match: { type } }
                        ]);
                    }
                }else{
                    list = await List.aggregate([{ $sample : { size: 10 } }]);
                }
                res.status(200).json(list);
            } catch (error) {
                res.status(500).json(error);
            }
    }
};

export default lists;