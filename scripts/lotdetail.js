function displayLotInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

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
            imgEvent.src = "../images/" + lotCode + ".png";
        } );
}
displayLotInfo();

function saveLotDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('lotDocID', ID);
    window.location.href = '2.userinput.html';//////////// switch with User Input html from Niko
}

function populateInputs() {
    console.log("test");
    let lotCardTemplate = document.getElementById("inputCardTemplate");
    let lotCardGroup = document.getElementById("lotCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let lotID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("userInput")
        .where("lotDocID", "==", lotID)
        .get()
        .then((allinputs) => {
            inputs = allinputs.docs;
            // console.log(reviews);
            inputs.forEach((doc) => {
                var title = doc.data().title;
                var level = doc.data().level;
                var season = doc.data().season;
                var description = doc.data().description;
                var flooded = doc.data().flooded;
                var scrambled = doc.data().scrambled;
                var time = doc.data().timestamp.toDate();
                var rating = doc.data().rating; // Get the rating value
                console.log(rating)

                console.log(time);

                let inputCard = lotCardTemplate.content.cloneNode(true);
                inputCard.querySelector(".title").innerHTML = title;
                inputCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                inputCard.querySelector(".level").innerHTML = `Level: ${level}`;
                inputCard.querySelector(".season").innerHTML = `Season: ${season}`;
                inputCard.querySelector(".scrambled").innerHTML = `Scrambled: ${scrambled}`;
                inputCard.querySelector(".flooded").innerHTML = `Flooded: ${flooded}`;
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

                document.getElementById(userInput + "-go-here").appendChild(newcard);

                lotCardGroup.appendChild(inputCard);
            });
        });
}

populateInputs();