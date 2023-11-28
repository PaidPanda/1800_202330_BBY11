// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAbEG_WCysd29ZE70qa9C2x81dC-bxjEkE",
    authDomain: "simple-park-app.firebaseapp.com",
    projectId: "simple-park-app",
    storageBucket: "simple-park-app.appspot.com",
    messagingSenderId: "114028224169",
    appId: "1:114028224169:web:20f3e3ca8de12df2e453b8"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
var db = firebase.firestore();

// Helper function to capture the first uppercase letter and all characters following it
function getCharactersFromFirstUppercase(str) {
    const result = str.match(/[A-Z].*/);
    return result ? result[0] : '';
}

// Function to get the latest 'choice' and update the div
function updateLatestChoice() {
    // Reference to your collection, ordered by timestamp descending
    db.collection("userInput").orderBy("timestamp", "desc").limit(1)
    .onSnapshot((querySnapshot) => {
        // Assuming there is at least one document
        if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            const data = latestDoc.data();
            // Assuming the structure is { choice: "yourChoiceValue" }
            // Extract from the first uppercase letter
            const charactersFromUppercase = getCharactersFromFirstUppercase(data.choice);
            // Update the div with the extracted characters, including the first uppercase letter
            document.getElementById('choice').innerText = charactersFromUppercase;
        }
    }, (error) => {
        console.error("Error fetching latest choice:", error);
    });
}

// Start listening for updates
window.onload = updateLatestChoice;