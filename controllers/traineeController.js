const traineeModel=require('../models/gameModel');



const getScores= async (req,res)=>{
    try{
        const resultData= await traineeModel.scoreModel.find();
        console.log(resultData);
        res.json(resultData);
    }
    catch(err){
        console.log(err.message);
    }
}

const setScore = async (req, res) => {
    try {
        let data = req.body;
        const { name, score, cards } = data;

        // Save the new player's score
        const trainee = new traineeModel.gameModel(data);
        await trainee.save();

        // Determine which high score field to check/update
        const cardField = `${cards}cards`;
        
        // Find the existing high score or create a new one if it doesn't exist
        let highScore = await traineeModel.scoreModel.findOne();
        if (!highScore) {
            highScore = new traineeModel.scoreModel({
                "20cards": { name: "", score: Infinity },
                "36cards": { name: "", score: Infinity },
                "50cards": { name: "", score: Infinity }
            });
        }

        // Check if the new score is lower (better) than the current high score
        if (highScore[cardField] && (highScore[cardField].score > score || highScore[cardField].score === undefined)) {
            highScore[cardField] = { name, score };
            await highScore.save();
            console.log(`High score updated for ${cards} cards!`);
        }

        res.status(201).send("created player");
    } catch (err) {
        res.status(500).json(err.message);
    }
};


module.exports={
    getScores,
    setScore,
}