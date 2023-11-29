var firebaseConfig = {
  apiKey: "AIzaSyAbEG_WCysd29ZE70qa9C2x81dC-bxjEkE",
  authDomain: "simple-park-app.firebaseapp.com",
  projectId: "simple-park-app",
  storageBucket: "simple-park-app.appspot.com",
  messagingSenderId: "114028224169",
  appId: "1:114028224169:web:20f3e3ca8de12df2e453b8"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();

function getQueryStringParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', function() {
  var parkingLotName = getQueryStringParam('lot');  // Get the parking lot name from the URL query string
  var buttons = document.querySelectorAll('.wrapper button');

  buttons.forEach(function(button) {
      button.addEventListener('click', function(event) {
          event.preventDefault();
          var userChoice = event.target.textContent.trim();
          var user = auth.currentUser;

          if (!user || !parkingLotName) {
              console.log('No user is signed in, or no parking lot selected.');
              alert('Please log in and select a parking lot.');
              return;
          }

          db.collection('userInput').add({
              userId: user.uid,
              choice: userChoice,
              parkingLot: parkingLotName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(function(docRef) {
              console.log('Document written with ID: ', docRef.id);
              alert('Your choice has been recorded. Thank you for your feedback!');
              window.location.href = 'landingpage.html';
          })
          .catch(function(error) {
              console.error('Error adding document: ', error);
              alert('There was an error recording your choice. Please try again.');
              window.location.href = 'landingpage.html';
          });
      });
  });
});

function getNameFromAuth() {
  auth.onAuthStateChanged(user => {
      if (user) {
          var userName = user.displayName;
          document.getElementById("name-goes-here").innerText = userName;
      } else {
          console.log('No user is signed in.');
      }
  });
}
getNameFromAuth();
