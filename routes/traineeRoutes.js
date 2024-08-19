const router=require('express').Router()
const traineeController=require('../controllers/traineeController');

router.get("/readTrainee",traineeController.readTrainee);

router.get("/readSpecificTrainee",traineeController.readSpecificDetails);

router.put("/updateTrainee",traineeController.updateTrainee)

router.post("/createTrainee",traineeController.createTrainee)

router.delete("/deleteTrainee",traineeController.deleteTrainee)

router.post("/setScore",traineeController.setScore)

router.get("/getScore",traineeController.getScores)

module.exports= router