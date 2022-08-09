import Movie from "../models/Movie.js";

const movies = {
    create: async(req, res) => {
        if(req.user.isAdmin){
            const newMovie = new Movie(req.body);
            console.log('newmov', newMovie);
            console.log('req.b', req.body)
            try {
                const savedMovie = await newMovie.save();
                console.log('saved', savedMovie);
                res.status(201).json(savedMovie);

            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(403).json("You don't have access to create a movie");
        }
    },
    update: async(req, res) => {
        if(req.user.isAdmin){
            try {
                const updatedMovie = await Movie.findByIdAndUpdate(
                    req.params.id, 
                    {$set: req.body}, 
                    {new: true});
                res.status(200).json(updatedMovie);

            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(403).json("You don't have access to update a movie");
        }
    },
    delete: async(req, res) => {
        if(req.user.isAdmin){
            try {
                await Movie.findByIdAndDelete(req.params.id);
                res.status(200).json("Movie has been deleted");

            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(403).json("You don't have access to delete a movie");
        }
    },
    get: async(req, res) => {
            try {
                const movie = await Movie.findById(req.params.id);
                res.status(200).json(movie);

            } catch (error) {
                res.status(500).json(error);
            }
    },
    getRandom: async(req, res) => {
        const type = req.query.type;
        let movie;
        try {
            if(type === "series"){
                movie = await Movie.aggregate([
                    { $match: { isSeries: true } }, 
                    { $sample: {size: 1} }
                ]);
            }else{
                movie = await Movie.aggregate([
                    { $match: { isSeries: false } }, 
                    { $sample: {size: 1} }
                ]);
            }
            res.status(200).json(movie);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async(req, res) => {
        if(req.user?.isAdmin){
            try {
                const movies = await Movie.find();
                return res.status(200).json(movies.reverse());

            } catch (error) {
                return res.status(500).json(error);
            }
        }else{
            return res.status(403).json("You don't have access to get all movies");
        }
    },   
    upload: async(req, res) => {
        console.log('route', req.body);
            try {
                res.status(200).json("File has been uploaded successfully");
            } catch (error) {
                res.status(500).json(error);
            }
    }, 
};

export default movies;