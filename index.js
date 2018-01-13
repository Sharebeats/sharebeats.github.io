var config = {
    apiKey: "AIzaSyDO3TPoh5XNX0zHIvaYm_UqMXZdDg5WO4M",
    authDomain: "newagent-7ef9c.firebaseapp.com",
    databaseURL: "https://newagent-7ef9c.firebaseio.com",
    projectId: "newagent-7ef9c",
    storageBucket: "newagent-7ef9c.appspot.com",
    messagingSenderId: "198210573822"
  };
  firebase.initializeApp(config);
var database = firebase.database();

gapi.load('auth2', function() {
            gapi.auth2.init({
                client_id: "797428156625-d95c3j7d1u70tst4t45m8sc18usd6792.apps.googleusercontent.com",
                scope: "profile email" // this isn't required
            }).then(function(auth2) {
                console.log( "signed in: " + auth2.isSignedIn.get() );  
                auth2.isSignedIn.listen(onSignIn);
                
                
                  auth2.signIn();
              
            });
        });
function onSignIn(googleUser) {
            console.log( "signedin");
            // Useful data for your client-side scripts:
            var profile = googleUser.getBasicProfile();
            console.log("Name: " + profile.getName());
        };


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
 });*/