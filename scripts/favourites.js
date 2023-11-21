//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version.
//-----------------------------------------------------------------------------
function saveFavourite(lotsDocID) {
  // Manage the backend process to store the hikeDocID in the database, recording which hike was bookmarked by the user.
  currentUser
    .update({
      // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
      // This method ensures that the ID is added only if it's not already present, preventing duplicates.
      favourites: firebase.firestore.FieldValue.arrayUnion(lotsDocID),
    })
    // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
    .then(function () {
      console.log("bookmark has been saved for" + lotsDocID);
      var iconID = "save-" + lotsDocID;
      //console.log(iconID);
      //this is to change the icon of the hike that was saved to "filled"
      document.getElementById(iconID).innerText = "favourite";
    });
}

newcard.querySelector("i").id = "save-" + docID; //guaranteed to be unique
newcard.querySelector("i").onclick = () => saveBookmark(docID);
