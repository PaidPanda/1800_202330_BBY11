var firebaseConfig = {

  apiKey: "AIzaSyAbEG_WCysd29ZE70qa9C2x81dC-bxjEkE",
  authDomain: "simple-park-app.firebaseapp.com",
  projectId: "simple-park-app",
  storageBucket: "simple-park-app.appspot.com",
  messagingSenderId: "114028224169",
  appId: "1:114028224169:web:20f3e3ca8de12df2e453b8"
};


firebase.initializeApp(firebaseConfig);


var auth = firebase.auth();
var db = firebase.firestore(); 

document.getElementById('firebase-auth-container').addEventListener('submit', function(event) {
    event.preventDefault();

    
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password).then(function(userCredential) {
        var user = userCredential.user;

        user.updateProfile({
            displayName: username
        }).then(function() {
            console.log("User profile updated.");

            db.collection("users").doc(user.uid).set({
                username: username,
                email: email,
            }).then(function() {
                console.log("User information saved in Firestore.");
                
                window.location.href = 'landingpage.html';
            }).catch(function(error) {
                console.error("Error saving user information to Firestore:", error);
            });

        }).catch(function(error) {
            console.error("Error updating user profile:", error);
        });

    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error creating new user:", errorCode, errorMessage);
    });
});