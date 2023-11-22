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


document.addEventListener('DOMContentLoaded', function() {

    var buttons = document.querySelectorAll('.wrapper button');
  

    buttons.forEach(function(button) {
      button.addEventListener('click', function(event) {
        event.preventDefault(); 
  

        var userChoice = event.target.textContent.trim();
  
   
        var user = firebase.auth().currentUser;
  
        if (!user) {
          console.log('No user is signed in.');
          return;
        }
  
        var db = firebase.firestore();
  
        db.collection('userInput').add({
          userId: user.uid, 
          choice: userChoice, 
          timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
          alert('Your choice has been recorded. Thank you for your feedback!');
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
          alert('There was an error recording your choice. Please try again.');
        });
      });
    });
  });
  