



//----------------------------------------------------
// Function to get user's location
// And see if it is within a specified radius, set alert
//----------------------------------------------------
function getGeolocation() {
    if ("geolocation" in navigator) {
        // Check if geolocation is supported
        navigator.geolocation.getCurrentPosition(function (position) {
            // This function is the success callback

            // Get current time
            let now = new Date();
            let time = now.toLocaleTimeString(); // Converts the time to a string using locale conventions.
            console.log(time);

            // Extract lat and long
            var lat = position.coords.latitude;
            var long = position.coords.longitude
            console.log("Latitude: " + lat);
            console.log("Longitude: " + long);

            // Hard code bcit parking lot 7
            // 49.24979458134745, -122.99933056195435
            var targetlat = 49.24979458134745;
            var targetlong = -122.99933056195435;

            // Calculate distance, and get radius input
            var d = getDistanceFromLatLonInKm(lat, long, targetlat, targetlong);
            var radius = document.getElementById("radius").value; 

            // Display it in the DOM
            document.getElementById("your-location").innerHTML +=
                "distance: " + d + "; "+ time + ": " + lat + ", " + long + "<br>";

            // Check if position is within radius
            if (d < radius) {
                alert("bingo");
            }

        }, function (error) {
            // This function is the error callback
            console.error("Error occurred: " + error.message);
        });
    } else {
        // Geolocation isn’t available
        console.error("Geolocation is not supported by this browser.");
    }
}

// Call getGeolocation every 5 seconds
setInterval(getGeolocation, 5000);

//--------------------------------------------------------
// Function takes 2 points (long and lat)
// converts it to distance, and calculates the distance
// (absolute value between the two points)
//--------------------------------------------------------
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}