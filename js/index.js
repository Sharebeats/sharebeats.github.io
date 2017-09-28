 vex.defaultOptions.className = 'vex-theme-os';

    function load() {
      var config = {
        apiKey: "AIzaSyBbcLi-m0HXKH34_wMwrbS1L9v2qMly7FA",
        authDomain: "sharebeats-a6c19.firebaseapp.com",
        databaseURL: "https://sharebeats-a6c19.firebaseio.com",
        projectId: "sharebeats-a6c19",
        storageBucket: "sharebeats-a6c19.appspot.com",
        messagingSenderId: "36050196872"
      };
      firebase.initializeApp(config);
    }

    function userSignUp() {
      vex.dialog.open({
        message: 'Share some Beats!',
        input: [
          '<input name="username" type="text" placeholder="Your username" required />',
          '<input name="useremail" type="text" placeholder="Your email" required />',
          '<input name="userkey" type="password" placeholder="Your passkey" required />'
        ].join(''),
        buttons: [
          $.extend({}, vex.dialog.buttons.YES, {
            text: 'Share'
          }),
          $.extend({}, vex.dialog.buttons.NO, {
            text: 'Cancel'
          })
        ],
        callback: function(data) {
          if (!data) {
            console.log('Cancelled')
          } else {

            var userEmail = data.useremail;
            var userPassword = data.userkey;
            var userId = data.username;
            var userRef = firebase.database().ref("userData/" + userId);
            userRef.set({
              data: {
                userId,
                userPassword,
                userEmail
              },

              musicData: {
                music: "Music"
              }

            });

            var userList = firebase.database().ref("userList/" + userId);
            userList.set({
              userName: userId
            })
            vex.dialog.alert('Your account has been created');
            window.open("dashboard.html");

            //End of firebase function 

          }
        }
      })
      
      function goTo(){
        window.open("dashboard.html");
      }

    }