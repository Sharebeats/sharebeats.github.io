/*
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
*/


vex.dialog.open({
    message: 'Create your ShareBeats account',
    input: [
        '<input name="username" type="text" placeholder="Username" required />',
      '<input name="email" type="text" placeholder="Email" required />',
        '<input name="password" type="password" placeholder="Password" required />'
    ].join(''),
    buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: 'Sign Up' }),
        $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
    ],
    callback: function (data) {
        if (!data) {
            location.reload(); //details.html
        } else {
            //console.log('Username', data.username, 'Password', data.password)
          var userEmail = data.email;
          
  var userPass = data.password;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    document.write("Error : " + errorMessage);
    alert("Error : " + errorMessage);
    location.reload()

    // ...
  });
          
          
        }
    }
})
