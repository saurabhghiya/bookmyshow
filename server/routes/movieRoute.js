const router = require('express').Router();
const Movie = require('../models/movieModels');
const authMiddleware = require('../middlewares/authMiddleware');

//add a movie
router.post('/add-movie', authMiddleware, async(req,res)=>{
    try {
        const newMovie = await Movie(req.body);
        await newMovie.save();
        // console.log(newMovie);
        res.send({
            success:true,
            message:"Movie Added"
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

//get all movies
router.get('/get-all-movies', authMiddleware, async(req,res)=>{
    try {
        const movies = await Movie.find();
        res.send({
            success:true,
            message:"All movies fetched",
            data: movies,
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

//update movies
router.put('/update-movie', authMiddleware, async(req,res)=>{
    try {
        await Movie.findByIdAndUpdate(req.body.movieId,req.body);
        res.send({
            success:true,
            message:"Movie Updated"
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

//delete movie
router.delete('/delete-movie', authMiddleware, async(req,res)=>{
    try {
        await Movie.deleteOne(req.body.movieId);
        res.send({
            success:true,
            message:"Movie Deleted"
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})


module.exports = router;


/* 

"title": "Jawan",
"description": "A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society.",
"duration": "170",
"genre": "Action",
"language": "Hindi",
"releaseDate": "2023",
"poster": "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jawan-et00330424-1693892482.jpg",

*/