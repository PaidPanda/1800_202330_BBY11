//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {

    apiKey: "AIzaSyCtV6Fp3uJ5cxNuTHDHs0xZpMTHAi3pj1Y",
    authDomain: "comp1800-202330-demo-32270.firebaseapp.com",
    projectId: "comp1800-202330-demo-32270",
    storageBucket: "comp1800-202330-demo-32270.appspot.com",
    messagingSenderId: "412683305128",
    appId: "1:412683305128:web:0ba11a2f6a72a3c82b829d"

};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); //create a new diatabase for us, "db"