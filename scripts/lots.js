function displayLotInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "lots" )
        .doc( ID )
        .get()
        .then( doc => {
            thisLot = doc.data();
            lotCode = thisLot.code;
            lotName = doc.data().name;
            
            // only populate title, and image
            document.getElementById( "lotName" ).innerHTML = lotName;
            let imgEvent = document.querySelector( ".lot-img" );
            imgEvent.src = "../images/" + lotCode + ".jpg";
        } );
}
displayLotInfo();

function saveLotDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('lotDocID', ID);
    window.location.href = 'input.html';
}

function populateInput() {
    // console.log("test");
    let lotCardTemplate = document.getElementById("inputCardTemplate");
    let lotCardGroup = document.getElementById("inputCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let lotID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("input")
        .where("lotDocID", "==", lotID)
        .orderBy("timestamp", "desc")
        .limit(1)
        .get()
        .then((allInput) => {
            input = allInput.docs;
            console.log(input);
            input.forEach((doc) => {
                var title = doc.data().title;
                var status = doc.data().status;
                var vehicle = doc.data().vehicle;
                var description = doc.data().description;
                var ev = doc.data().ev;
                var pay = doc.data().pay;
                var time = doc.data().timestamp.toDate();
                var rating = doc.data().rating; // Get the rating value
                console.log(rating)

                console.log(time);

                let inputCard = lotCardTemplate.content.cloneNode(true);
                inputCard.querySelector(".title").innerHTML = title;
                inputCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                inputCard.querySelector(".status").innerHTML = `Status: ${status}`;
                inputCard.querySelector(".vehicle").innerHTML = `Types of Vehicle: ${vehicle}`;
                inputCard.querySelector(".pay").innerHTML = `Pay Station: ${pay}`;
                inputCard.querySelector(".ev").innerHTML = `EV Charging Station: ${ev}`;
                inputCard.querySelector( ".description").innerHTML = `Description: ${description}`;

                // Populate the star rating based on the rating value
                
	              // Initialize an empty string to store the star rating HTML
								let starRating = "";
								// This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                for (let i = 0; i < rating; i++) {
                    starRating += '<span class="material-icons">star</span>';
                }
								// After the first loop, this second loop runs from i=rating to i<5.
                for (let i = rating; i < 5; i++) {
                    starRating += '<span class="material-icons">star_outline</span>';
                }
                inputCard.querySelector(".star-rating").innerHTML = starRating;

                lotCardGroup.appendChild(inputCard);
            });
        });
}

populateInput();