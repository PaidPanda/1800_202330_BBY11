//----------------------------------------------------------
// This function is the only function that's called.
//----------------------------------------------------------
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            insertNameFromFirestore(user);
            getBookmarks(user)
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();

//----------------------------------------------------------
// Inserts user's name on favourites page header.
//----------------------------------------------------------/
function insertNameFromFirestore(user) {
    db.collection("users").doc(user.uid).get().then(userDoc => {
        console.log(userDoc.data().name)
        userName = userDoc.data().name;
        console.log(userName)
        document.getElementById("name-goes-here").innerHTML = userName;
    })

}

//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------
function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {

            // Get the Array of bookmarks
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            // Get pointer the new card template
            let newcardTemplate = document.getElementById("savedCardTemplate");

            // Iterate through the ARRAY of bookmarked lots (document ID's)
            bookmarks.forEach(thisLotID => {
                console.log(thisLotID);
                db.collection("lots").doc(thisLotID).get().then(doc => {
                    var title = doc.data().name; // get value of the "name" key
                    var lotCode = doc.data().code; //get unique ID to each lot to be used for fetching right image
                    var docID = doc.id;  //this is the autogenerated ID of the document

                    //clone the new card
                    let newcard = newcardTemplate.content.cloneNode(true);

                    //update title and some pertinant information
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-image').src = `./images/${lotCode}.jpg`;
                    newcard.querySelector('a').href = "lots.html?docID=" + docID;

                    //Finally, attach this new card to the gallery
                    savedCardGroup.appendChild(newcard);
                })
            });
        })
}