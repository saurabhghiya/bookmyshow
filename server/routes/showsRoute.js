const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Shows = require('../models/showsModels');

//add a show
router.post('/add-show', authMiddleware, async(req,res)=>{
    try {
        const newShow = new Shows(req.body);
        await newShow.save();
        res.send({
            success:true,
            message:"Show Added"
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

//get all shows by theatre
router.post('/get-all-shows-by-theatre',authMiddleware, async(req,res)=>{
    try{
        const shows = await Shows.find({theatre:req.body.theatreId}).populate('movie');
        // console.log(res);
        res.send({
            success:true,
            message:"Shows Fetched",
            data:shows
        })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
})

//update shows
router.put('/update-shows', authMiddleware, async(req,res)=>{
    try {
        await Shows.findByIdAndUpdate(req.body.showsId,req.body);
        res.send({
            success:true,
            message:"shows Updated"
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

//delete shows
router.delete('/delete-shows', authMiddleware, async(req,res)=>{
    try {
        await Shows.deleteOne(req.body.showsId);
        res.send({
            success:true,
            message:"shows Deleted"
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

//get all unique theatres which have shows of a movie
router.post('/get-all-theatres-by-movie',authMiddleware,async(req,res)=>{
    try{
        const {movie,date} = req.body;
        //find all the shows of a movie on given date
        const shows = await Shows.find({movie,date}).populate('theatre');
        //get all unique theatres
        let uniqueTheatre = [];
        shows.forEach((show)=>{
            const theatre = uniqueTheatre.find(
                (theatre)=> theatre._id == show.theatre._id
            )
            // console.log(theatre);
            if(!theatre){
                const showsForThisTheatre = shows.filter(
                    (showObj)=>showObj.theatre._id == show.theatre._id
                )
                uniqueTheatre.push({
                    ...show.theatre._doc,
                    shows:showsForThisTheatre
                });
            }
        })
        res.send({
            success:true,
            message:"Unique Data Fetched",
            data:uniqueTheatre
        })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
})

module.exports = router;