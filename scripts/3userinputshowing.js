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
    var resultsContainer = document.getElementById('results');
    var user = firebase.auth().currentUser;
  
    if (user) {
      var db = firebase.firestore();
      db.collection('userInput')
        .where('userId', '==', user.uid)
        .orderBy('timestamp', 'desc')
        .limit(1)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            var data = querySnapshot.docs[0].data(); 
            resultsContainer.textContent = 'Your last choice was: ' + data.choice;
          } else {
            resultsContainer.textContent = 'No feedback found.';
          }
        })
        .catch(error => {
          console.error('Error getting documents: ', error);
          resultsContainer.textContent = 'Error loading results.';
        });
    } else {
      resultsContainer.textContent = 'You must be logged in to see the results.';
    }
  });