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

document.getElementById('firebase-auth-container').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log("Trying to log in with", email, password); 

    auth.signInWithEmailAndPassword(email, password).then(function() {
        console.log("Login successful");
        window.location.href = 'landingpage.html';
    }).catch(function(error) {
        console.error("Login failed: ", error.code, error.message);

        var userFriendlyMessage = '';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            userFriendlyMessage = "The email address or password you entered is incorrect. Please try again.";
        } else if (error.code === 'auth/internal-error') {
            userFriendlyMessage = "An internal error occurred. Please try again later.";
        } else {
            userFriendlyMessage = "An unexpected error occurred. Please try again.";
        }

        console.log(userFriendlyMessage); 
        alert(userFriendlyMessage);
    });
});