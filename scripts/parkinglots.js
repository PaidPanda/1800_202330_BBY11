

function writeLots() {
    //define a variable for the collection you want to create in Firestore to populate data
    var lotsRef = db.collection("lots");

    lotsRef.add({
        code: "BBYA",
        name: "Parking Lot A", 
        city: "Burnaby",
        province: "BC",
        status: "Full",
		details: "A lovely place for lunch walk",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()   //current system time
    });
    lotsRef.add({
        code: "BBYB",
        name: "Parking Lot B", 
        city: "Burnaby",
        province: "BC",
        status: "Busy",
        details: "Close to town, and relaxing",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    lotsRef.add({
        code: "BBYC",
        name: "Parking Lot C", 
        city: "Burnaby",
        province: "BC",
        status: "Vacant",
        details:  "Amazing ski slope views",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
    lotsRef.add({
        code: "BBYD",
        name: "Parking Lot D", 
        city: "Burnaby",
        province: "BC",
        status: "Full",
		details: "A lovely place for lunch walk",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    lotsRef.add({
        code: "BBYE",
        name: "Parking Lot E", 
        city: "Burnaby",
        province: "BC",
        status: "Full",
		details: "A lovely place for lunch walk",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    lotsRef.add({
        code: "BBYF",
        name: "Parking Lot F", 
        city: "Burnaby",
        province: "BC",
        status: "Busy",
		details: "A lovely place for lunch walk",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    lotsRef.add({
        code: "BBYG",
        name: "Parking Lot G", 
        city: "Burnaby",
        province: "BC",
        status: "Vacant",
		details: "A lovely place for lunch walk",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
}