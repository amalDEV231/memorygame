const traineeModel=require('../models/gameModel');

function readDetails() {
    try{
        return (fs.readFileSync("./details.json", "utf8"));
    }
    catch(err){
        console.log({"data":"","msg":"","err":err.message});
    }
}

const readTrainee=(req,res)=>{
    try{
        res.status(200).json(JSON.parse(readDetails()));
    }
    catch(err){
        res.status(500).json(err.message);
    }
    
}

const readSpecificDetails=(req,res)=>{
    try{
        let data = readDetails();
        let resultData = JSON.parse(data).filter(v => v.id === req.body.id);
        if (Object.keys(resultData).length !== 0) {
            console.log({"data":resultData,"msg":"Read success","err":""});
            res.status(200).json(resultData)
        } else {
            console.log(req.body)
            res.status(500).json({"data":resultData,"msg":"","err":"read failed in"});
            
        }
    }
    catch(err){
        res.status(500).json({"data":"","msg":"","err":err.message});
    }
}

const updateTrainee= (req,res)=>{
    try{
        let arr = JSON.parse(readDetails());
        let Updates=req.body;
        let t = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == req.body.id) {
                arr[i] = { ...arr[i], ...Updates };
                fs.writeFileSync("./details.json", JSON.stringify(arr));
                t = 1;
                break;
            }
        }
        if (t) {
            res.json({"data":readDetails(),"msg":"Updated succesfully","err":""});
        } else {
            res.status(400).json({"data":"","msg":"","err":"Update Failed"});
        }
    }
    catch(err){
        res.json({"data":"","msg":"","err":err.message});
    }
}

const createTrainee= async (req,res)=>{
    try{
    let data=req.body;
    const trainee= new traineeModel.gameModel(data);
    await trainee.save();
    res.status(201).send("created trainee");
    }
    catch(err){
        res.status(500).json(err.message);
    }
}


const deleteTrainee= (req,res)=>{
    try{
        let data = readDetails();
        let resultData = JSON.parse(data).filter(v => v.id !== req.body.id);
        if (Object.keys(resultData).length !== 0) {
            console.log({"data":resultData,"msg":"Delete success","err":""});
            fs.writeFileSync("./details.json", JSON.stringify(resultData));
            res.json(resultData)
        } else {
            console.log(req.body)
            console.log({"data":resultData,"msg":"","err":"delete failed in"});
            
        }
    }
    catch(err){
        console.log({"data":"","msg":"","err":err.message});
    }
}

const getScores= async (req,res)=>{
    try{
        const resultData= await traineeModel.gameModel.find();
        console.log(resultData);
        res.json(resultData);
    }
    catch(err){
        console.log(err.message);
    }
}

const setScore= async(req,res)=>{
    try{
        let data=req.body;
        const trainee= new traineeModel.gameModel(data);
        await trainee.save();
        res.status(201).send("created trainee");
        }
        catch(err){
            res.status(500).json(err.message);
        }
}

module.exports={
    readTrainee,
    readSpecificDetails,
    updateTrainee,
    createTrainee,
    deleteTrainee,
    getScores,
    setScore,
}