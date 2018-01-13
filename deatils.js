alert("Link successful");
 var config = {
    apiKey: "AIzaSyDO3TPoh5XNX0zHIvaYm_UqMXZdDg5WO4M",
    authDomain: "newagent-7ef9c.firebaseapp.com",
    databaseURL: "https://newagent-7ef9c.firebaseio.com",
    projectId: "newagent-7ef9c",
    storageBucket: "newagent-7ef9c.appspot.com",
    messagingSenderId: "198210573822"
  };
  firebase.initializeApp(config);
function twitter_signin(){  
    alert("clicked");
var provider = new firebase.auth.TwitterAuthProvider();

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    var token = result.credential.accessToken;
    var secret = result.credential.secret;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});}