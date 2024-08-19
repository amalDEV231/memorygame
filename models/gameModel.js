const mongoose= require('mongoose');
const Schema = require('mongoose').Schema;
const conn=require('../services/db')

conn.dbConnection();

const gameSchema= new Schema({
    "name":String,
    "score":Number,
    "cards":Number
});

const gameModel=  mongoose.model("memorygames",gameSchema);

module.exports = { gameModel };