const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
},{timestamps:true});


const Blog = mongoose.model('Blog', blogSchema); // need to be according to the Collection name in the cluster
module.exports = Blog;