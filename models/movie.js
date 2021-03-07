const mongoose= require('mongoose');

const movieSchema = new mongoose.Schema({

movieDirector:{
    type:String,
    require:true
},
movieTitle:{
    type:String,
    require:true
},
movieDate:{
    type:Date,
    require:true,
    default:Date.now
}

})

module.exports = mongoose.model('Movie',movieSchema);