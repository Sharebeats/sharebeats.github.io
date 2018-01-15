

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

   

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      $("#login_div").append("<h2>Hey <b>"+ email_id + "</b>! Let's make some noise</h2><br><br>");

    }

  } else {
    // No user is signed in.

 vex.dialog.open({
    message: 'Enter your username and password:',
    input: [
        '<input name="email" type="text" placeholder="Email" required />',
        '<input name="password" type="password" placeholder="Password" required />'
    ].join(''),
    buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: 'Login' }),
        $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
    ],
    callback: function (data) {
        if (!data) {
window.location.href="details.html"        
        } else {
          var userEmail = data.username;
  var userPass = data.password;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    
    var errorMessage = error.message;
    //auth/wrong-password
//Error : The password is invalid or the user does not have a password.
    
 
    
   
      
alert("Error - Please try again");
    location.reload();
    

    // ...
  });
          $("#login_div").append("<h2>Hey <b>"+ data.username + "</b>! Let's make some noise</h2><br><br>");
        }
    }
})

  }
});




function logout(){
  firebase.auth().signOut();
    location.reload();

}

/*
var fb_username = "@djsnake";
function share_music(){
    var username = document.getElementById("user_name").value;

    firebase.database().ref('users/' + username ).once('value').then(function(snapshot) {
var song = document.getElementById("track_name").value;

  var songList = snapshot.val().songNames;
  songList.push(song); 
    console.log(songList); 
        
        var userList = snapshot.val().sharerList; 
        userList.push(fb_username); 
        console.log(userList);
    firebase.database().ref('users/'+username).set({
    songNames: songList, 
        sharerList: userList
  });
});

}


     firebase.database().ref('users/@harsithr').set({
    songNames: ["Dusk till Dawn", "Look what you made me do"],
    sharerList:["@sharebeats","@sharebeats"]
  });
console.log("Success");



/*firebase.database().ref('users/test1').once('value').then(function(snapshot) {
  var ar = snapshot.val().test.songNames;
    document.write(JSON.stringify(ar));
    for(i=0; i<ar.length; i++){
        console.log(ar[i]);
    }
 });
 
 
 gapi.load('auth2', function() {
            gapi.auth2.init({
                client_id: "797428156625-bdcm4pn4gdslofiplg4451lc7rp1t4j8.apps.googleusercontent.com",
                scope: "profile email" // this isn't required
            }).then(function(auth2) {
                console.log( "signed in: " + auth2.isSignedIn.get() );  
                auth2.isSignedIn.listen(onSignIn);
                function onSignIn(googleUser) {
            console.log( "signedin");
            // Useful data for your client-side scripts:
            var profile = googleUser.getBasicProfile();
            console.log("Name: " + profile.getName());
        };
                
                  auth2.signIn();
              
              
            });
        });
 
 */