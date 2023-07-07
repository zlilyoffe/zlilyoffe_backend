const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const viewerSchema = new Schema({
    ip: {
        type: String,
        required: true
    }
},{timestamps:true});


const Viewer = mongoose.model('Viewers', viewerSchema); // need to be according to the Collection name in the cluster
module.exports = Viewer;