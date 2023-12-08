// Description: This file contains the code for the geolocation feature.

// Define the locations of parking lots with their latitude and longitude
const parkingLots = {
  // 'Parking Lot A': { lat: 49.25240573955513, lon: -122.99937079258694 },
  'Parking Lot A': { lat: 49.25004329145184, lon: -123.00152491909238 }, //Test-SW12 Building's latitude and longitude: { lat: 49.26568711492164, lon: -123.00386245142634 }
  'Parking Lot B': { lat: 49.25204066616602, lon: -122.99825499535372 },
  'Parking Lot D': { lat: 49.248329660179316, lon: -122.99925640279429 },
  'Parking Lot E': { lat: 49.24901577828027, lon: -122.99837663870316 },
  'Parking Lot F': { lat: 49.247314689881904, lon: -122.99869926231959 },
  'Parking Lot N': { lat: 49.2447230116984, lon: -123.00251872815622 },
  'Parking Lot Q': { lat: 49.2542336214432,  lon: -123.0030943972222 }  
  // Test Home's latitude and longitude: { lat: 49.26568711492164, -123.00386245142634 } 
};

// Map parking lot names to their unique IDs in the Firestore database
const parkingLotIDs = {
  'Parking Lot A': 'KWHgQ4jl8zJk821lhIWu',
  'Parking Lot B': '4zLzx1p8CbUr88BTpMZE',
  'Parking Lot D': 'XBxuMOn0ILLVSWE22Y7h',
  'Parking Lot E': 'luypfSHUQwZ0vK8ANA9t',
  'Parking Lot F': 'sTXCIgGIWVD6lt0WHaxP',
  'Parking Lot N': 'oeD5QOEXRvb3Nr7KtnpO',
  'Parking Lot Q': 'MmANPGFzOAmtkx2jGuM2'
};

// Function to check the user's proximity to the parking lots
function checkUserProximityToParkingLots() {
    // Check if the browser supports geolocation
  if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
  }

  // Get the current position of the user
  navigator.geolocation.getCurrentPosition(function(position) {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      // Loop function to go through each parking lot to check the distance from the user
      Object.entries(parkingLots).forEach(([lotName, coordinates]) => {
          const distance = getDistanceFromLatLonInM(userLat, userLon, coordinates.lat, coordinates.lon);
          // If the user is within 200 meters of a parking lot
          if (distance < 200) {
              const isUserWilling = confirm(`You are within 200 meters of ${lotName}. Would you like to provide input for this parking lot?`);
              if (isUserWilling) {
                  const lotID = parkingLotIDs[lotName]; 
                  // Redirect to a specific URL with the parking lot's ID
                  window.location.href = `lots.html?docID=${encodeURIComponent(lotID)}`; 
              }
          }
      });
  }, function(error) {
      alert('error: ' + error.message);
  });
}

// Function to calculate the distance between two points given their latitudes and longitudes
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  var R = 6371e3; // Radius of the Earth in meters
  var dLat = deg2rad(lat2 - lat1); // Convert degrees to radians
  var dLon = deg2rad(lon2 - lon1); 
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c;  // Distance in meters
}

// Function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Event listener to check the user's proximity to parking lots when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  checkUserProximityToParkingLots();
});
