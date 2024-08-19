const mongoose= require('mongoose');
const Schema = require('mongoose').Schema;
const conn=require('../services/db')

conn.dbConnection();

const gameSchema= new Schema({
    "name":String,
    "score":Number,
    "cards":Number
});
const scoreSchema= new Schema({
    "20cards":{
        "name":String,
        "score":Number
    },
    "36cards":{
        "name":String,
        "score":Number
    },
    "50cards":{
        "name":String,
        "score":Number
    }
});

const gameModel=  mongoose.model("players",gameSchema);
const scoreModel=mongoose.model("highscores",scoreSchema);

module.exports = { gameModel , scoreModel};