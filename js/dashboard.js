vex.defaultOptions.className = 'vex-theme-os';
var config = {
  apiKey: "AIzaSyBbcLi-m0HXKH34_wMwrbS1L9v2qMly7FA",
  authDomain: "sharebeats-a6c19.firebaseapp.com",
  databaseURL: "https://sharebeats-a6c19.firebaseio.com",
  projectId: "sharebeats-a6c19",
  storageBucket: "sharebeats-a6c19.appspot.com",
  messagingSenderId: "36050196872"
};
firebase.initializeApp(config);

function getUserName() {
  vex.dialog.open({
    message: 'Enter your username and password: (Wait for the confirmation before using our service)',
    input: [
          '<input name="username" type="text" placeholder="Username" required />',
          '<input name="password" type="password" placeholder="Password" required />'
        ].join(''),
    buttons: [
          $.extend({}, vex.dialog.buttons.YES, {
        text: 'Login'
      }),
          $.extend({}, vex.dialog.buttons.NO, {
        text: 'Back'
      })
        ],
    callback: function (data) {
      if (!data) {
        console.log('Cancelled')
      } else {
        var userDetails = "userData/" + data.username + "/data/userPassword";
        //Create a database reference 
        const dbRef = firebase.database().ref(userDetails);
        console.log('Username', data.username, 'Password', data.password);
        //Start
        dbRef.on('value', snap => {
          console.log(snap.val())
          //Check if passwords are the same 
          if (data.password == snap.val()) {
            vex.dialog.alert("Hey " + data.username + ". You have logged in");
            localStorage.setItem("myUserName", data.username);
            //window.location.href = "test.html";
          } else {
            vex.dialog.alert("Sorry. Your credentials don't match");
            window.location.href = ("index.html");
          }
        });
        //End of firebase function 
      }
    }
  })
}

function shareMusic() {
  vex.dialog.open({
    message: 'Share some Beats!',
    input: [
          '<input name="friendname" type="text" placeholder="Your friends user name" required />',
          '<input name="trackname" type="text" placeholder="The beats you want to share" required />',
        ].join(''),
    buttons: [
          $.extend({}, vex.dialog.buttons.YES, {
        text: 'Share'
      }),
          $.extend({}, vex.dialog.buttons.NO, {
        text: 'Cancel'
      })
        ],
    callback: function (data) {
      if (!data) {
        console.log('Cancelled')
      } else {
        var friendName = data.friendname;
        var myName = localStorage.getItem("myUserName");
        var trackName = data.trackname;
        var userRef = firebase.database().ref("userData/" + friendName + "/musicData/" + myName);
        userRef.set({
          songName: trackName,
        });
        vex.dialog.alert('Your song has been shared');
        //End of firebase function 
      }
    }
  })
}

function getMusic() {
  var musicRef = firebase.database().ref("userData/" + localStorage.getItem("myUserName") + "/musicData/");
  musicRef.on('value', snap => {
    console.log(snap.val());
    var musicData = snap.val();
    
    var processData = JSON.stringify(musicData);

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function replaceAll(str, term, replacement) {
      return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
    }
    var res = processData.replace('"', "___");
    var result = replaceAll(res, "{", "");
    var result1 = replaceAll(result, "}", "");
    var result2 = replaceAll(result1, '"', "");
    var result3 = replaceAll(result2, '"', "");
    var result4 = replaceAll(result3, "songName", "");
    var result5 = replaceAll(result4, "::", " - ");
    var result6 = replaceAll(result5, '___', "<ol><li>")
    var finalResult = replaceAll(result6, ",", "</li><li>");
    var audioList = document.getElementById('music_list');
    audioList.innerHTML = finalResult;
  });
}