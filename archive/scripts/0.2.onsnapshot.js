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


const parkingLotElements = {
    'Parking Lot A': 'parklota',
    'Parking Lot B': 'parklotb',
    'Parking Lot D': 'parklotd',
    'Parking Lot E': 'parklote',
    'Parking Lot F': 'parklotf',
    'Parking Lot N': 'parklotn',
    'Parking Lot Q': 'parklotq'
};

Object.keys(parkingLotElements).forEach(lotName => {
    db.collection("userInput")
        .where("parkingLot", "==", lotName)
        .orderBy("timestamp", "desc")
        .limit(1)
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added" || change.type === "modified") {
                    const data = change.doc.data();
                    document.getElementById(parkingLotElements[lotName]).textContent = data.choice;
                }
            });
        }, error => {
            console.error("Error fetching updates: ", error);
        });
});
