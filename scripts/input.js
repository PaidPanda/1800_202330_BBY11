var lotDocID = localStorage.getItem("lotDocID");    //visible to all functions on this page

function getLotName(id) {
    db.collection("lots")
      .doc(id)
      .get()
      .then((thislot) => {
        var lotName = thislot.data().name;
        document.getElementById("lotName").innerHTML = lotName;
          });
}

getLotName(lotDocID);

// Add this JavaScript code to make stars clickable

// Select all elements with the class name "star" and store them in the "stars" variable
const stars = document.querySelectorAll('.star');

// Iterate through each star element
stars.forEach((star, index) => {
    // Add a click event listener to the current star
    star.addEventListener('click', () => {
        // Fill in clicked star and stars before it
        for (let i = 0; i <= index; i++) {
            // Change the text content of stars to 'star' (filled)
            document.getElementById(`star${i + 1}`).textContent = 'star';
        }
    });
});

function writeInput() {
    console.log("inside write input");
    let lotTitle = document.getElementById("title").value;
    let lotStatus = document.getElementById("status").value;
    let lotVehicle = document.getElementById("vehicle").value;
    let lotDescription = document.getElementById("description").value;
    let lotEV = document.querySelector('input[name="ev"]:checked').value;
    let lotPay = document.querySelector('input[name="pay"]:checked').value;

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

    // console.log(hikeTitle, hikeLevel, hikeSeason, hikeDescription, hikeFlooded, hikeScrambled, hikeRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("input").add({
            lotDocID: lotDocID,
            userID: userID,
            title: lotTitle,
            status: lotStatus,
            vehicle: lotVehicle,
            description: lotDescription,
            ev: lotEV,
            pay: lotPay,
            rating: lotRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'index.html';
    }
}