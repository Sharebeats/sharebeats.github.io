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
var userList = firebase.database().ref("userList");
userList.on('value', snap => {
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function replaceAll(str, term, replacement) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
  }
  var userListJSON = JSON.stringify(snap.val());
  console.log(userListJSON); 
  var z = userListJSON.replace('{"', "<option>")
  var a = replaceAll(z, '":{"xox":"xox"}', "</option><option>");
  var b = a.replace('}', "</option>");
  var c = replaceAll(b, ',"', '');
  var d = replaceAll(c, '<option></option>', " ")
  console.log(d);
  localStorage.setItem("userListDB", d);
})

function load() {
  
  vex.dialog.confirm({
    message: "Hey there! This a short user tour of the ShareBeats dashboard. You may skip it if this isn't your first time. Click 'Ok' to proceed",
    callback: function (value) {
        if (value) {
            vex.dialog.alert("Please tweet your feedback and help us share the word");
  vex.dialog.alert("Instantaneously listen to a 30 sec preview with Apple Music");
  vex.dialog.alert("Click 'Get Music' update the list of beats your friends have shared with you, and check the list below");

            vex.dialog.alert("Click on 'Share Beats' to share some beats with your friends. Remember to enter on alphanumeric characters and underscores only");

  
        } else {
            console.log('Chicken.');
        }
    }
})
  var userNameModal = '<input name="username" type="text" placeholder="Username" required />';

  vex.dialog.open({
    message: 'Enter your username and password: (Wait for the confirmation before using our service)',
    input: [
          userNameModal,
          '<input name="password" type="password" placeholder="Password" required />'
        ].join(''),
    buttons: [
          $.extend({}, vex.dialog.buttons.YES, {
        text: 'Login'
      }),
          $.extend({}, vex.dialog.buttons.NO, {
        text: 'Cancel'
      })
        ],
    callback: function (data) {
      if (!data) {
        window.location.href = ("index.html");
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
            var nameFromDB = document.getElementById('project-name');
      nameFromDB.innerHTML = "Hey, "+data.username;
            var textFromDB = document.getElementById('project-tagline');
            textFromDB.innerHTML="Get on to share some music!";
            
          } else {
            vex.dialog.confirm({
              message: "Your credentials don't match",
              callback: function (value) {
                if (value) {
                  window.location.href = ("index.html");
                } else {
                  window.location.href = ("dashboard.html");
                }
              }
            })

          }
        });
        //End of firebase function 
      }
    }
  })
}

function shareMusic() {
  var userList = firebase.database().ref("userList");

  userList.on('value', snap => {
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function replaceAll(str, term, replacement) {
      return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
    }
    var userListJSON = JSON.stringify(snap.val());
    console.log(userListJSON); //{"Ravichandran":{"xox":"xox"},"harsith2002":{"xox":"xox"},"jack_dorsey":{"xox":"xox"}}
    var z = userListJSON.replace('{"', "<option>")
    var a = replaceAll(z, '":{"xox":"xox"}', "</option><option>");
    var b = a.replace('}', "</option>");
    var c = replaceAll(b, ',"', '');
    var d = replaceAll(c, '<option></option>', " ")
    console.log(d);

    var friendName = '<input name="friendname" type="text" placeholder="Your friends username" class="awesomplete" list="mylist" /><datalist id="mylist">' + d + '</datalist>'

    console.log(userList);
    vex.dialog.open({
      message: 'Share some Beats!',
      input: [
          friendName,
          '<input name="trackname" type="text" placeholder="The beats you want to share" required />',
        ].join(''),
      buttons: [
          $.extend({}, vex.dialog.buttons.YES, {
          text: 'Share some Beats!'
        }),
          $.extend({}, vex.dialog.buttons.NO, {
          text: 'Cancel'
        })
        ],
      callback: function (data) {

        if (!data) {
          console.log('Cancelled')
        } else {
          var str = localStorage.getItem("userListDB");
    var n = str.indexOf(data.friendname);
          if((/^[\w\-\s]+$/.test(data.friendname)!==false)&&(/^[\w\-\s]+$/.test(data.trackname)!==false)){
             if (n !== -1) {
            var friendName = data.friendname;
            var myName = localStorage.getItem("myUserName");
            var trackName = data.trackname;
            var userRef = firebase.database().ref("userData/" + friendName + "/musicData/" + myName + "/" + trackName);
            userRef.set({
              x: "x",
            });
            vex.dialog.alert('Your song has been shared');

          } else {
            vex.dialog.alert("You song is not shared. Enter a valid friends username");
          }

             }
        else{vex.dialog.alert("Your song hasn't been shared. Please enter only alphanumeric characters and underscores");}
          
          //End of firebase function 
        }
      }
    })
  })
}

function getMusic() {
  var musicRef = firebase.database().ref("userData/" + localStorage.getItem("myUserName") + "/musicData/");
  musicRef.on('value', snap => {
    console.log(snap.val());
    var musicData = snap.val();

    var processData = JSON.stringify(musicData);
    console.log(processData);

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function replaceAll(str, term, replacement) {
      return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
    }
    if (processData == '{"music":"Music"}') {
      var audioList = document.getElementById('music_list');
      audioList.innerHTML = "   You don't have any shared music as of now. Go to <a>Get my Beats!</a> to check your beats";
      vex.dialog.alert('Sorry! No one has shared any beats with you.');
    } else {
      var r1 = replaceAll(processData, '":{"x":"x"}', '</li><li>');
      var r0 = replaceAll(r1, "}}", "__");
      var r2 = replaceAll(r0, ":", "<ul>");
      var r3 = replaceAll(r2, ',"', "");
      var r4 = replaceAll(r3, '{"', '<li>');
      var r5 = replaceAll(r4, '<li>}', '</ul><li>');
      var r6 = replaceAll(r5, '"', "");
      var r7 = replaceAll(r6, "}", "");
      var r8 = replaceAll(r7, '<li>__', '</ul>');
      var r9 = replaceAll(r8,"<li>music<ul>Music","");
      console.log(r9);
      var audioList = document.getElementById('music_list');
      audioList.innerHTML = r9;
      vex.dialog.alert('Check out your shared beats here!');
    }


  });
}