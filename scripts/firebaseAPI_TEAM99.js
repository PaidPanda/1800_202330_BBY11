//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {

    apiKey: "AIzaSyAbEG_WCysd29ZE70qa9C2x81dC-bxjEkE",
    authDomain: "simple-park-app.firebaseapp.com",
    projectId: "simple-park-app",
    storageBucket: "simple-park-app.appspot.com",
    messagingSenderId: "114028224169",
    appId: "1:114028224169:web:20f3e3ca8de12df2e453b8"
    
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); //create a new database for us, "db"