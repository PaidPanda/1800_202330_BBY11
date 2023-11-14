
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