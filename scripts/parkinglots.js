
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
        last_updated: firebase.firestore.FieldValue.serverTimestamp()   //current system time
    });
    lotsRef.add({
        code: "BBYB",
        name: "Parking Lot B", 
        city: "Burnaby",
        province: "BC",
        status: "Busy",
        details: "N/A",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    lotsRef.add({
        code: "BBYD",
        name: "Parking Lot D", 
        city: "Burnaby",
        province: "BC",
        status: "Vacant",
        details:  "Accessible Parking, Pay Station",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
    lotsRef.add({
        code: "BBYE",
        name: "Parking Lot E", 
        city: "Burnaby",
        province: "BC",
        status: "Full",
		details: "Carshare Parking",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    lotsRef.add({
        code: "BBYF",
        name: "Parking Lot F", 
        city: "Burnaby",
        province: "BC",
        status: "Full",
		details: "Accessible Parking",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    lotsRef.add({
        code: "BBYN",
        name: "Parking Lot N", 
        city: "Burnaby",
        province: "BC",
        status: "Busy",
		details: "Pay Station",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    lotsRef.add({
        code: "BBYQ",
        name: "Parking Lot Q", 
        city: "Burnaby",
        province: "BC",
        status: "Vacant",
		details: "Carshare Parking",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("lotDetailsTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable.
  
    db.collection(collection)
    //   .orderBy("hike_time")
    //   .limit(2)
      .get() //the collection called "lots"
      .then((allLots) => {
        //var i = 1;  //Optional: if you want to have a unique ID for each hike
        allLots.forEach((doc) => {
          //iterate thru each doc
          var title = doc.data().name; // get value of the "name" key
          var details = doc.data().details; // get value of the "details" key
          var lotCode = doc.data().code; //get unique ID to each hike to be used for fetching right image
          var hikeLength = doc.data().length; //gets the length field
          var docID = doc.id;
          let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
  
          //update title and text and image
          newcard.querySelector(".card-title").innerHTML = title;
          // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
          newcard.querySelector(".card-text").innerHTML = details;
          newcard.querySelector(".card-image").src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
          newcard.querySelector("a").href = "lotdetail.html?docID=" + docID;
          newcard.querySelector(".card-length").innerHTML =
            "Length: " +
            doc.data().length +
            " km <br>" +
            "Duration: " +
            doc.data().hike_time +
            "min <br>" +
            "Last updated: " +
            doc.data().last_updated.toDate().toLocaleDateString();
  
          // assigning unique id to the bookmark icon
          // attaching an onclick, clalling callback function with the hike's docID
          newcard.querySelector("i").id = "save-" + docID; //guaranteed to be unique
          newcard.querySelector("i").onclick = () => saveBookmark(docID);
  
          //Optional: give unique ids to all elements for future use
          // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
          // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
          // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
  
          currentUser.get().then((userDoc) => {
            //get the user name
            var favourites = userDoc.data().favouritess;
            if (favourites.includes(docID)) {
              document.getElementById("save-" + docID).innerText = "favourite";
            }
          });
  
          //attach to gallery, Example: "hikes-go-here"
          document.getElementById(collection + "-go-here").appendChild(newcard);
  
          //i++;   //Optional: iterate variable to serve as unique ID
        });
      });
  }

// Function to read the name of the parking lot from Firestore "lots" collection
// Input param is the String representing the parking lot, aka, the document name
function readName(parkinglot) {
    db.collection("lots").doc(parkinglot)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(parkinglotDoc => {                                                               //arrow notation
           console.log("current document data: " + parkinglotDoc.data());                          //.data() returns data object
           document.getElementById("name-goes-here").innerHTML = parkinglotDoc.data().name;      //using javascript to display the data on the right place
           
           //Here are other ways to access key-value data fields
           //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
           //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
		       //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
      })
}
readName("LoNPtlttHuemMG8tcrEa");        //calling the function


// Function to read the lots details from Firestore "lots" collection
// Input param is the String representing the parking lot, aka, the document name
function readDetails(parkinglot) {
    db.collection("lots").doc(parkinglot)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(parkinglotDoc => {                                                               //arrow notation
           console.log("current document data: " + parkinglotDoc.data());                          //.data() returns data object
           document.getElementById("details-goes-here").innerHTML = parkinglotDoc.data().details;      //using javascript to display the data on the right place
           
           //Here are other ways to access key-value data fields
           //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
           //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
		       //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
      })
}
readDetails("LoNPtlttHuemMG8tcrEa");        //calling the function


// Function to read the lot availability status from Firestore "lots" collection
// Input param is the String representing the parking lot, aka, the document name
function readStatus(parkinglot) {
    db.collection("lots").doc(parkinglot)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(parkinglotDoc => {                                                               //arrow notation
           console.log("current document data: " + parkinglotDoc.data());                          //.data() returns data object
           document.getElementById("status-goes-here").innerHTML = parkinglotDoc.data().status;      //using javascript to display the data on the right place
           
           //Here are other ways to access key-value data fields
           //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
           //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
		       //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
      })
}
readStatus("LoNPtlttHuemMG8tcrEa");        //calling the function


// Function to read the when the status was last updated from Firestore "lots" collection
// Input param is the String representing the parking lot, aka, the document name
function readLastUpdate(parkinglot) {
    db.collection("lots").doc(parkinglot)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(parkinglotDoc => {                                                               //arrow notation
           console.log("current document data: " + parkinglotDoc.data());                          //.data() returns data object
           document.getElementById("lastupdate-goes-here").innerHTML = parkinglotDoc.data().last_updated;      //using javascript to display the data on the right place
           
           //Here are other ways to access key-value data fields
           //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
           //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
		       //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
      })
}
readLastUpdate("LoNPtlttHuemMG8tcrEa");        //calling the function