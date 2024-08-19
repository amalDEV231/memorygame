const router=require('express').Router()
const traineeController=require('../controllers/traineeController');



router.post("/setScore",traineeController.setScore)

router.get("/getScore",traineeController.getScores)

module.exports= router