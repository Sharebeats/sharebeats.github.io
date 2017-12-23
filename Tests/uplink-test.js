alert(".js connected");
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




firebase.database().ref('users/test1').once('value').then(function(snapshot) {
var song = prompt("Song?");

  var ar = snapshot.val().test.songNames;
  ar.push(song); 
    console.log(ar);
    firebase.database().ref('users/test1/test').set({
    songNames: ar
  });
});

 /*firebase.database().ref('users/test1/test').set({
    songNames: ["Saab", "Volvo", "BMW"]
  });

firebase.database().ref('users/test1').once('value').then(function(snapshot) {
  var ar = snapshot.val().test.songNames;
    document.write(JSON.stringify(ar));
    for(i=0; i<ar.length; i++){
        console.log(ar[i]);
    }
});*/