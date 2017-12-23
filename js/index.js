
       
    
function onSignIn(googleUser) {
    
    var profile = googleUser.getBasicProfile();    
    
    var userEmail = profile.getEmail();
    var userId = profile.getName();
         
}