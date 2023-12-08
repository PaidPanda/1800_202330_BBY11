//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page
function doAll() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //global
      console.log(currentUser);

      insertNameFromFirestore();
      displayCardsDynamically("lots");
    } else {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = "login.html";
    }
  });
}
doAll();

// Insert name function using the global variable "currentUser"
function insertNameFromFirestore() {
  currentUser.get().then((userDoc) => {
    //get the user name
    var user_Name = userDoc.data().name;
    console.log(user_Name);
    $("#name-goes-here").text(user_Name); //jquery
  });
}

// Generates the lots collection on Firestore database with the attributes below
function writeLots() {
  //define a variable for the collection you want to create in Firestore to populate data
  var lotsRef = db.collection("lots");

  lotsRef.add({
    code: "BBYA",
    name: "Parking Lot A",
    city: "Burnaby",
    province: "BC",
    level: "Full",
    details: "Accessible Parking, Motorcylce Area",
    lat: 49.25240573955513,
    lng: -122.99937079258694,
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });
  lotsRef.add({
    code: "BBYB",
    name: "Parking Lot B",
    city: "Burnaby",
    province: "BC",
    level: "Busy",
    details: "N/A",
    lat: 49.25204066616602,
    lng: -122.99825499535372,
    last_updated: firebase.firestore.Timestamp.fromDate(
      new Date("March 10, 2022")
    ),
  });
  lotsRef.add({
    code: "BBYD",
    name: "Parking Lot D",
    city: "Burnaby",
    province: "BC",
    level: "Vacant",
    details: "Accessible Parking, Pay Station",
    lat: 49.248329660179316,
    lng: -122.99925640279429,
    last_updated: firebase.firestore.Timestamp.fromDate(
      new Date("January 1, 2023")
    ),
  });
  lotsRef.add({
    code: "BBYE",
    name: "Parking Lot E",
    city: "Burnaby",
    province: "BC",
    level: "Full",
    details: "Carshare Parking",
    lat: 49.24901577828027,
    lng: -122.99837663870316,
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  lotsRef.add({
    code: "BBYF",
    name: "Parking Lot F",
    city: "Burnaby",
    province: "BC",
    level: "Full",
    details: "Accessible Parking",
    lat: 49.247314689881904,
    lng: -122.99869926231959,
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  lotsRef.add({
    code: "BBYN",
    name: "Parking Lot N",
    city: "Burnaby",
    province: "BC",
    level: "Busy",
    details: "Pay Station",
    lat: 49.2447230116984,
    lng: -123.00251872815622,
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  lotsRef.add({
    code: "BBYQ",
    name: "Parking Lot Q",
    city: "Burnaby",
    province: "BC",
    level: "Vacant",
    details: "Carshare Parking",
    lat: 49.2542336214432,
    lng: -123.0030943972222,
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
// Dynamically generates lot cards
function displayCardsDynamically(collection) {
  // Retrieve the HTML element with the ID "lotCardTemplate" and store it in the cardTemplate variable.
  let cardTemplate = document.getElementById("lotCardTemplate"); 

  db.collection(collection)
    .orderBy("name") //sort by name
    .get() //the collection called "lots"
    .then((allLots) => {
      allLots.forEach((doc) => {
        //iterate thru each doc
        var title = doc.data().name; // get value of the "name" key
        var details = doc.data().details; // get value of the "details" key
        var lotCode = doc.data().code; //get unique ID to each hike to be used for fetching right image
        var docID = doc.id;
        let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

        //update title and text and image
        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-text").innerHTML = details;
        newcard.querySelector(".card-image").src = `./images/${lotCode}.jpg`;
        newcard.querySelector("a").href = "lots.html?docID=" + docID;

        //assigning the uniqle id to the bookmarrk icon
        //attatching the onclick, calling callback fucntion with lot's id
        newcard.querySelector("i").id = "save-" + docID; //guaranteed to be unique
        newcard.querySelector("i").onclick = () => saveBookmark(docID);
        // "Length: " +
        //   doc.data().length +
        //   " km <br>" +
        //   "Duration: " +
        //   doc.data().hike_time +
        //   "min <br>" +
        //   "Last updated: " +
        //   doc.data().last_updated.toDate().toLocaleDateString();

        currentUser.get().then((userDoc) => {
          //get the user name
          var bookmarks = userDoc.data().bookmarks;
          if (bookmarks.includes(docID)) {
            document.getElementById("save-" + docID).innerText = "bookmark";
          }
        });
        //attach to gallery, "lots-go-here"
        document.getElementById(collection + "-go-here").appendChild(newcard);

      });
    });
}


//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the lot to the "bookmarks" array found in the user collection
// Then it will change the bookmark icon from the hollow to the solid version.
//-----------------------------------------------------------------------------
function saveBookmark(lotDocID) {
  // Manage the backend process to store the lotDocID in the database, recording which lot was bookmarked by the user.
  currentUser
    .update({
      // 'arrayUnion' is used to add the new bookmark ID to the 'bookmarks' array and ensure 
      // that the ID is added only if it's not already present, preventing duplicates.
      bookmarks: firebase.firestore.FieldValue.arrayUnion(lotDocID),
    })
    // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
    .then(function () {
      console.log("bookmark has been saved for" + lotDocID);
      var iconID = "save-" + lotDocID;
      //this is to change the icon of the hike that was saved to "filled"
      document.getElementById(iconID).innerText = "bookmark";
    });
}
