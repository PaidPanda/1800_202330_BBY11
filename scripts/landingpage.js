function writeLots() {
  //define a variable for the collection you want to create in Firestore to populate data
  var lotsRef = db.collection("lots");

  lotsRef.add({
    code: "BBYA",
    name: "Parking Lot A",
    city: "Burnaby",
    province: "BC",
    status: "Full",
    details: "Accessible Parking, Motorcylce Area",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });
  lotsRef.add({
    code: "BBYB",
    name: "Parking Lot B",
    city: "Burnaby",
    province: "BC",
    status: "Busy",
    details: "N/A",
    last_updated: firebase.firestore.Timestamp.fromDate(
      new Date("March 10, 2022")
    ),
  });
  lotsRef.add({
    code: "BBYD",
    name: "Parking Lot D",
    city: "Burnaby",
    province: "BC",
    status: "Vacant",
    details: "Accessible Parking, Pay Station",
    last_updated: firebase.firestore.Timestamp.fromDate(
      new Date("January 1, 2023")
    ),
  });
  lotsRef.add({
    code: "BBYE",
    name: "Parking Lot E",
    city: "Burnaby",
    province: "BC",
    status: "Full",
    details: "Carshare Parking",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  lotsRef.add({
    code: "BBYF",
    name: "Parking Lot F",
    city: "Burnaby",
    province: "BC",
    status: "Full",
    details: "Accessible Parking",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  lotsRef.add({
    code: "BBYN",
    name: "Parking Lot N",
    city: "Burnaby",
    province: "BC",
    status: "Busy",
    details: "Pay Station",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  lotsRef.add({
    code: "BBYQ",
    name: "Parking Lot Q",
    city: "Burnaby",
    province: "BC",
    status: "Vacant",
    details: "Carshare Parking",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("lotCardTemplate"); // Retrieve the HTML element with the ID "lotCardTemplate" and store it in the cardTemplate variable.

  db.collection(collection)
    .orderBy("name")
    .get() //the collection called "lots"
    .then((allLots) => {
      // var i = 1;  //Optional: if you want to have a unique ID for each hike
      allLots.forEach((doc) => {
        //iterate thru each doc
        var title = doc.data().name; // get value of the "name" key
        var details = doc.data().details; // get value of the "details" key
        var lotCode = doc.data().code; //get unique ID to each lot to be used for fetching right image
        var lotStatus = doc.data().status; //gets the length field
        var lastupdated = doc.data().last_updated; // get value of the "details" key
        var docID = doc.id;
        let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

        //update title and text and image
        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-status").innerHTML = lotStatus;
        newcard.querySelector(".card-lastupdate").innerHTML = lastupdated;
        newcard.querySelector(".card-text").innerHTML = details;
        newcard.querySelector(".card-image").src = `./images/${lotCode}.jpg`; //Example: NV01.jpg
        newcard.querySelector("a").href = "lotdetail.html?docID=" + docID;

        // this line sets the id attribute for the <i> tag in the format of "save-lotID"
        // so later we know which lot to favourite based on which lot was clicked
        newcard.querySelector("i").id = "save-" + docID; //guaranteed to be unique

        // this line will call a function to save the lots to the user's document
        newcard.querySelector("i").onclick = () => saveFavourite(docID);

        // // ensure that the favourite displays correctly as filld if it is already in favourites
        currentUser.get().then((userDoc) => {
          //get the user name
          var favourites = userDoc.data().favourites;
          if (favourites.includes(docID)) {
            document.getElementById("save-" + docID).innerText = "favourite";
          }
        });

        //Optional: give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery, Example: "lots-go-here"
        document.getElementById(collection + "-go-here").appendChild(newcard);

        //i++;   //Optional: iterate variable to serve as unique ID
      });
    });
}

// displayCardsDynamically("lots"); //input param is the name of the collection

//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page
function doAll() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //global
      console.log(currentUser);

      // // figure out what day of the week it is today
      // const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      // const d = new Date();
      // let day = weekday[d.getDay()];

      // the following functions are always called when someone is logged in
      // readQuote(day);
      // insertNameFromFirestore();
      displayCardsDynamically("lots");
    } else {
      // BREAKS PROGRAM UNLESS LINKED PROPERLY************************
      // // No user is signed in.
      console.log("No user is signed in");
      window.location.href = "1.login.html";
    }
  });
}
doAll();

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version.
//-----------------------------------------------------------------------------
function saveFavourite(lotDocID) {
  // Manage the backend process to store the hikeDocID in the database, recording which hike was bookmarked by the user.
  currentUser
    .update({
      // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
      // This method ensures that the ID is added only if it's not already present, preventing duplicates.
      favourites: firebase.firestore.FieldValue.arrayUnion(lotDocID),
    })
    // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
    .then(function () {
      console.log("favourite has been saved for" + lotDocID);
      var iconID = "save-" + lotDocID;
      //console.log(iconID);
      //this is to change the icon of the hike that was saved to "filled"
      document.getElementById(iconID).innerText = "favourite";
    });
}
