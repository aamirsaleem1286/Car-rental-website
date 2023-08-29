const GoogleStrategy=require("passport-google-oauth20").Strategy
const FacebookStrategy=require("passport-facebook").Strategy
const GitHubStrategy=require("passport-github2").Strategy

const passport=require("passport")
const User=require("./models/user")
passport.use(
 new GoogleStrategy(
   { clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"http://localhost:4000/auth/google/callback",
    scope:["profile","email"],  
     passReqToCallback:true},
     
     function(request, accessToken, refreshToken, profile, done) {
      done(null,profile)
   
      
    }
    )

)

passport.use(new GitHubStrategy({
  clientID:process.env.GITHUB_CLIENT_ID,
  clientSecret:process.env.GITHUB_CLIENT_SECRET,
  callbackURL:"http://localhost:4000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
  // });
}
));
passport.use(new FacebookStrategy({
  clientID:process.env.FB_CLIENT_ID,
  clientSecret:process.env.FB_CLIENT_SECRET,
  callbackURL: "http://localhost:4000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    done(null,profile);
//  });
}
));


passport.serializeUser((user,done)=>{
        done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)

})