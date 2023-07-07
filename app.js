const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

// express app
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// connect to mongoDB
const dbURI = "mongodb+srv://zlilvedaniel:Yatir1411@cluster0.wwotvq1.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useUnifiedTopology:true}).then(
    (result) => {
        console.log('connected to db');
        app.listen(4000);
        console.log('start listenning on port 4000');
    })
    .catch((err)=> console.log(err));


    
// listen for requests
// app.listen(3000);

// register view engine
// app.set('view engine', 'ejs');

// middleware & static files
// app.use(express.static('public'));


// store a blog in database:
// app.get('/add-blog', (req,res) => {
//     const blog = new Blog({
//         title: 'Blogtitle2',
//         snippet: 'Blogsnippet2',
//         body: 'Blogbody2'
//     });
//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// app.get('/all-blogs',(req, res) => {
    
// });

// app.get('/single-blog',(req, res) => {
//     Blog.findById('64a707751af67a1ff8ca3e7c')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// });

// app.use((req, res, next) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   console.log('ip:', req.ip);
//   next();
// });

// app.use(morgan('dev'));

// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

// // routes
// app.get('/', (req, res) => {
//   res.redirect('/blogs');
// });

// app.get('/about', (req, res) => {
//   res.render('about', { title: 'About' });
// });


// blog routes

app.get('/blogs', (req, res) => {
    let blogsCount = 0;
    Blog.count()
    .then((count) => {
        console.log( "Number of blogs:", count );
        blogsCount = count;
        res.send(`${blogsCount}`);
    })
    .catch((err) => {
        console.log(err);
    })

    // Blog.find().sort({createdAt: -1})
    // .then((result) => {
    //     res.render('index', { title: 'All Blogs', blogs: result, count: blogsCount });
    // })
    //     .catch((err)=> {
    //     console.log(err)
    // })
      
})
// app.get('/blogs/create', (req, res) => {
//   res.render('create', { title: 'Create a new blog' });
// });





// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
