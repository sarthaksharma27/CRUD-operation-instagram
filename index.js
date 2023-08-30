const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'))

let users =  [
    {
      id: uuidv4(),
      username: "Harry potter",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SX9B49bv1yhPTT3zTSerDv4-jDoT2SN975WZ_dEEGqHaI9U09woZkiJej2vxeqUypeY&usqp=CAU",
      title: "I solemnly swear I am up to no good ― Harry Potter"
    },
    {
      id: uuidv4(),
      username: "Thor",
      photo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Chris_Hemsworth_as_Thor.jpg/220px-Chris_Hemsworth_as_Thor.jpg",
      title: "I'm Still Worthy"
    },
    {
     "id": uuidv4(),
      username: "Caption America",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrSRSFMuK7IPuP6R6whAvt5upCHP5k4dBGoxaiWJlhlNhq52re58PkBRHX9sYCRV900U&usqp=CAU",
      title: "I can do this all day"
    },
  ]

// To get the data

app.get('/instagram', (req, res) => {
    res.render('index.ejs', { users })
});

// To create a new post

app.get('/instagram/post', (req, res) => {
    res.render('newpost.ejs');
});

app.post('/new', (req, res) => {
    let { username, photo, title } = req.body;
    let id = uuidv4();
    users.push({ id, username, photo, title });
    res.redirect('/instagram');

});

// To edit the post

app.get('/instagram/:id/edit', (req, res) => {
    const { id } = req.params;
    const post = users.find((p) => id === p.id);
    res.render('edit.ejs', { user: post }); 
});

app.patch('/instagram/:id', (req, res) => {
    const { id } = req.params;
    const post = users.find((p) => id === p.id);

    if (post) {
        if (req.body.username) {
            post.username = req.body.username;
        }
        if (req.body.photo) {
            post.photo = req.body.photo;
        }
        if (req.body.title) {
            post.title = req.body.title;
        }
        res.redirect('/instagram');
    }    
});

// To delete the post

app.delete('/instagram/:id', (req, res) => {
    const idToDelete = req.params.id;
    users = users.filter((p) => p.id !== idToDelete);
    res.redirect('/instagram');
});


app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});
