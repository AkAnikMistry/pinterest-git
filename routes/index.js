
var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require('./posts');
const passport = require('passport');
const upload = require("./multer");
const posts = undefined;
 
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req,res){
  res.render('index');
});

router.get('/profile', IsLoggedIn,async function(req,res){
  const user = await userModel.findOne({
    username: req.session.passport.user
  }).populate("posts")
  
  
  
  res.render('profile', {user});
});
router.get('/feed', function(req,res,next){
  res.render("feed");
});

router.post('/upload',IsLoggedIn, upload.single("file"),async function(req, res, next){
  if(!req.file){
    return res.status(404).send("no files were given");
  }
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user: user._id
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");

});

router.get('/login', function(req,res,next){
  res.render("login", {error: req.flash('error')});
});

//register route
router.post('/register', function(req,res){
  var userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullName: req.body.fullName
    
    
  });
  userModel.register(userdata, req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res, function(){
      res.redirect('/profile');
    });
  });
});

//login route
router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}), function(req,res){});

//logout

router.get('/logout', function(req,res, next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/login');
  });
});

//IsLoggedIn Middleware

function IsLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;

