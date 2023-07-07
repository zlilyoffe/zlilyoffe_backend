const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/viewer.js');
const Viewer = require('./models/viewer.js');

// express app
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

let dbKey = '';
fs.readFile('dbkey.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    dbKey = data.slice();
    // connect to mongoDB
    const dbURI = `mongodb+srv://zlilvedaniel:${dbKey}@cluster0.wwotvq1.mongodb.net/node-tuts?retryWrites=true&w=majority`;
    mongoose.connect(dbURI,{useUnifiedTopology:true}).then(
    (result) => {
        console.log('connected to db');
        app.listen(4000);
        console.log('start listenning on port 4000');
    })
    .catch((err)=> console.log(err));

  });



// app.post('')

// console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   console.log('ip:', req.ip);
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

app.get('/viewers', (req, res) => {
    const viewer = new Viewer({
                ip: req.ip
            });
    viewer.save()
        .then((result) => {
                console.log('viwer saved');
                console.log(result);
            })
        .catch((err) => {
                console.log(err);
            });

    let viewersCount = 0;
    Viewer.count()
    .then((count) => {
        console.log( "Number of viewers:", count );
        viewersCount = count;
        res.send(`${viewersCount}`);
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
