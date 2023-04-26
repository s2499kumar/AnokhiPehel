const express = require("express");
const bodyParser= require("body-parser")
const mongoose = require('mongoose');
const config = require('./config');
const app= express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const { MentorLogin } = require('./views/user');
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + 'views/assets'));
app.use(express.static('assets'))

// database connection
// mongoose.set("strictQuery", false);
// mongoose.connect(config.url, config.options)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error(err));
const uri = "mongodb://0.0.0.0:27017/Anokhi_Pehel_Working";
mongoose.connect(uri).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ");
});


app.get("/", function(req, res){
    res.render("index");
})

app.get("/student", function(req, res){
    res.render("student");
})
app.get("/mentors", function(req, res){
    res.render("mentors");
})
app.get("/classes", function(req, res){
    res.render("classes");
})
app.get("/events", function(req, res){
    res.render("events");
})
app.get("/navodaya", function(req, res){
    res.render("navodaya");
})
app.get("/location", function(req, res){
    res.render("location");
})







// app.get("/cordinator", function(req, res){
//     res.render("cordinator");
// })



// to fetch class cordinator
const { MongoClient } = require('mongodb');


const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // Code to fetch data and render EJS template goes here
  });
  
const db = client.db('Anokhi_Pehel_Working');
const collection = db.collection('classCordinator');
collection.find({}).toArray((err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
  
    // Code to render EJS template with data goes here
  });
app.get('/cordinator', (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
  
      res.render('cordinator', { data });
    });
  });
  


const collection1 = db.collection('student');
collection1.find({}).toArray((err, data) => {
    if (err) {
      console.error(err);
      return;
    }
});
  app.get('/studentsnavodaya', (req, res) => {
    collection1.find({}).toArray((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.render('student', { data, class: 'navodaya' });
 
        // res.render('student', { data });
      });
    });





app.get("/mentorLogin", function(req, res){
    res.render("mentorLogin");
})

app.get("/adminlogin", function(req, res){
    res.render("adminlogin");
})
app.get("/locationcordi", function(req, res){
    res.render("locationcordi");
})
app.get("/classcordi", function(req, res){
    res.render("classcordi");
})

app.post('/mentorLogin', (req, res) => {
    const { email, password } = req.body;
  
    mongoose.connect(url, (err, client) => {
      if (err) throw err;
  
      const db = client.db("Anokhi_Pehel_Working");
      const mentorsCollection = db.collection('mentorLogin');
  
      mentorsCollection.findOne({ email }, (err, mentor) => {
        if (err) throw err;
  
        if (!mentor) {
          req.flash('error', 'Invalid email or password');
          res.redirect('/mentor/login');
        } else if (mentor.password !== password) {
          req.flash('error', 'Invalid email or password');
          res.redirect('/mentorLogin');
        } else {
          req.session.user = mentor;
          res.redirect('/');
        }
      });
    });
  });
  


app.listen(4050, function(){
    console.log("Server is started on port : 4050");
})