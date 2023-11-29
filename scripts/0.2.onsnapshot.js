    // // Firebase configuration
    // var firebaseConfig = {
    //     apiKey: "AIzaSyAbEG_WCysd29ZE70qa9C2x81dC-bxjEkE",
    //     authDomain: "simple-park-app.firebaseapp.com",
    //     projectId: "simple-park-app",
    //     storageBucket: "simple-park-app.appspot.com",
    //     messagingSenderId: "114028224169",
    //     appId: "1:114028224169:web:20f3e3ca8de12df2e453b8"
    // };
    
    // // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);

    // // Initialize Firestore
    // var db = firebase.firestore();

    // // Helper function to capture the first uppercase letter and all characters following it
    // function getCharactersFromFirstUppercase(str) {
    //     const result = str.match(/[A-Z].*/);
    //     return result ? result[0] : '';
    // }

    // // Function to get the latest 'choice' and update the div
    // function updateLatestChoice() {
    //     // Reference to your collection, ordered by timestamp descending
    //     db.collection("userInput").orderBy("timestamp", "desc").limit(1)
    //     .onSnapshot((querySnapshot) => {
    //         // Assuming there is at least one document
    //         if (!querySnapshot.empty) {
    //             const latestDoc = querySnapshot.docs[0];
    //             const data = latestDoc.data();
    //             // Assuming the structure is { choice: "yourChoiceValue" }
    //             // Extract from the first uppercase letter
    //             const charactersFromUppercase = getCharactersFromFirstUppercase(data.choice);
    //             // Update the div with the extracted characters, including the first uppercase letter
    //             document.getElementById('parklotq').innerText = charactersFromUppercase;
    //         }
    //     }, (error) => {
    //         console.error("Error fetching latest choice:", error);
    //     });
    // }

    // // Start listening for updates
    // window.onload = updateLatestChoice;



// Firebase配置初始化
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

// 各个停车场的ID映射
const parkingLotIds = {
    'Parking Lot A': 'parklota',
    'Parking Lot B': 'parklotb',
    'Parking Lot D': 'parklotd',
    'Parking Lot E': 'parklote',
    'Parking Lot F': 'parklotf',
    'Parking Lot N': 'parklotn',
    'Parking Lot Q': 'parklotq'
};

// 监听所有停车场的状态更新
Object.keys(parkingLotIds).forEach(lotName => {
    db.collection("userInput")
        .where("parkingLot", "==", lotName)
        .orderBy("timestamp", "desc")
        .limit(1)
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added" || change.type === "modified") {
                    const data = change.doc.data();
                    // 直接将状态更新到对应的HTML元素
                    document.getElementById(parkingLotIds[lotName]).textContent = data.choice;
                }
            });
        });
});
