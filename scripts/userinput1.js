var lotDocID = localStorage.getItem("lotDocID");    //visible to all functions on this page

function getLotName(id) {
    db.collection("lots")
      .doc(id)
      .get()
      .then((thisLot) => {
        var lotName = thisLot.data().name;
        document.getElementById("lotName").innerHTML = lotName;
          });
}

getLotName(lotDocID);

function writeInput() {
    console.log("inside write input");
    let lotTitle = document.getElementById("title").value;
    let lotLevel = document.getElementById("level").value;
    let lotSeason = document.getElementById("season").value;
    let lotDescription = document.getElementById("description").value;
    let lotFlooded = document.querySelector('input[name="flooded"]:checked').value;
    let lotScrambled = document.querySelector('input[name="scrambled"]:checked').value;

    // Get the star rating
		// Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
		// Initialize a variable 'hikeRating' to keep track of the rating count
    let lotRating = 0;
		// Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
				// Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
						// If the condition is met, increment the 'hikeRating' by 1
            lotRating++;
        }
    });

    console.log(lotTitle, lotLevel, lotSeason, lotDescription, lotFlooded, lotScrambled, lotRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("userinput").add({
            lotDocID: lotDocID,
            userID: userID,
            title: lotTitle,
            level: lotLevel,
            season: lotSeason,
            description: lotDescription,
            flooded: lotFlooded,
            scrambled: lotScrambled,
            rating: lotRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "3.thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'userinput1.html';
    }
}