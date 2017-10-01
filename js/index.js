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
        var userList = firebase.database().ref("userList");
    }
  

    function userSignUp() {
   
      vex.dialog.open({
        
        message: 'Create an account: ',
        input: [
          '<input name="username" type="text" placeholder="Your username" list="mylist" />',
          '<input name="useremail" type="text" placeholder="Your email" required />',
          '<input name="userkey" type="password" placeholder="Your passkey" required />'
        ].join(''),
        buttons: [
          $.extend({}, vex.dialog.buttons.YES, {
            text: 'Create my account'
          })
          
        ],
        
        callback: function(data) {
          var str = localStorage.getItem("userListDB");
var n = str.indexOf(data.username);
          if((/^[\w\-\s]+$/.test(data.username)!==false)&&(/^[\w\-\s]+$/.test(data.userkey)!==false)){
             if(n==-1){
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
              xox: "xox"
            })
            vex.dialog.confirm({
              message: "Your account has been created with the username: "+data.username + " and password: "+data.userkey,
              callback: function (value) {
                if (value) {
                  window.location.href = ("dashboard.html");
                } else {
                  
                  window.location.href = ("index.html");
                }
              }
            })
           
          }
          else{
            vex.dialog.alert("Please chose a different username. Yours has already been taken");
          }
             }
             else{
               vex.dialog.alert("Your account hasn't been created. Please enter only alphanumeric characters and underscores");
             }
          

            

            //End of firebase function 

          }
        }
      )}
      
      function goTo(){
        window.location.href = ("dashboard.html");
      }

    


/*
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
          text: 'Share some Beats!'
        }),
          $.extend({}, vex.dialog.buttons.NO, {
          text: 'Cancel'
        })
        ],
         callback: function (data) {
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
             
             var nameIndex = d.indexOf(data.username);
             alert(nameIndex);


               if (nameIndex > -1) {
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

                 var userListDB = firebase.database().ref("userList/" + userId);
                 userListDB.set({
                   xox: "xox"
                 })
                 vex.dialog.confirm({
                   message: "Your account has been created",
                   callback: function (value) {
                     if (value) {
                       window.location.href = ("dashboard.html");
                     } else {

                       window.location.href = ("index.html");
                     }
                   }
                 })
               } else {
                 vex.dialog.alert("Your account couldn't be created as your username repeated. Please chose a different one");
               }
             }
             //End of firebase function 
           
         )
       }})}
*/