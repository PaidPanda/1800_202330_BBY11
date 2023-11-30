// old code
// // Define the locations of parking lots
// const parkingLots = {
//     'Parking Lot A': { lat: 49.25240573955513, lon: -122.99937079258694 },
//     'Parking Lot B': { lat: 49.25204066616602, lon: -122.99825499535372 },
//     'Parking Lot D': { lat: 49.248329660179316, lon: -122.99925640279429 },
//     'Parking Lot E': { lat: 49.24901577828027, lon: -122.99837663870316 },
//     'Parking Lot F': { lat: 49.247314689881904, lon: -122.99869926231959 },
//     'Parking Lot N': { lat: 49.2447230116984, lon: -123.00251872815622 },
    // 'Parking Lot Q': { lat: 49.26564156690797, lon: -123.00389431601982 }
    // //test: { lat: 49.26564156690797, lon: -123.00389431601982 }  'Parking Lot Q': { lat: 49.2542336214432, lon: -123.0030943972222 }
    // // sw 1 49.25113627947013, -123.00334181473046
    
// };

// // Function to get user's location
// function getUserLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(checkClosestParkingLot, showError);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }

// // Function to handle errors
// function showError(error) {
//     alert("Error occurred: " + error.message);
// }

// // Function to check the closest parking lot and show a prompt
// function checkClosestParkingLot(position) {
//     const userLat = position.coords.latitude;
//     const userLon = position.coords.longitude;
//     let closestLot = null;
//     let minDistance = 200; // Set max distance

//     for (let lot in parkingLots) {
//         let distance = getDistance(userLat, userLon, parkingLots[lot].lat, parkingLots[lot].lon);
//         if (distance < minDistance) {
//             closestLot = lot;
//             minDistance = distance;
//         }
//     }

//     if (closestLot) {
//         if (confirm(`You are within 200m of ${closestLot}. Would you like to provide input for this parking lot?`)) {
//             window.location.href = '2.userinput.html'; // Redirect to index.html if user agrees
//         }
//         // Stay on the current page if user disagrees
//     }
// }

// // Function to calculate distance
// function getDistance(lat1, lon1, lat2, lon2) {
//     function toRad(x) {
//         return x * Math.PI / 180;
//     }

//     const R = 6371e3; // Earth radius in meters
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Returns distance in meters
// }

// // Execute location retrieval when the page is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     getUserLocation();
// });

//new code
  
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   const db = firebase.firestore();
  
  // Define the locations of parking lots
  const parkingLots = {
    'Parking Lot A': { lat: 49.25240573955513, lon: -122.99937079258694 },//  'Parking Lot A': { lat: 49.25240573955513, lon: -122.99937079258694 }
    'Parking Lot B': { lat: 49.25204066616602, lon: -122.99825499535372 },//'Parking Lot B': { lat: 49.25204066616602, lon: -122.99825499535372 },
    'Parking Lot D': { lat: 49.248329660179316, lon: -122.99925640279429},// 'Parking Lot D': { lat: 49.248329660179316, lon: -122.99925640279429 },
    'Parking Lot E': { lat: 49.24901577828027, lon: -122.99837663870316 },//'Parking Lot E': { lat: 49.24901577828027, lon: -122.99837663870316 }
    'Parking Lot F': { lat: 49.247314689881904, lon: -122.99869926231959 },//'Parking Lot F': { lat: 49.247314689881904, lon: -122.99869926231959 }
    'Parking Lot N': { lat: 49.2447230116984, lon: -123.00251872815622 },//   'Parking Lot N': { lat: 49.2447230116984, lon: -123.00251872815622 },
    'Parking Lot Q': { lat: 49.25113627947013, lon: -123.00334181473046 }//'Parking Lot Q': { lat: 49.2542336214432, lon: -123.0030943972222 }
    //test home: { lat: 49.26564156690797, lon: -123.00389431601982 } 
    // sw 1 49.25113627947013, -123.00334181473046
  };

  function checkUserProximityToParkingLots() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(function(position) {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      
      Object.entries(parkingLots).forEach(([lotName, coordinates]) => {
        const distance = getDistanceFromLatLonInM(userLat, userLon, coordinates.lat, coordinates.lon);
        if (distance < 200) {
          const isUserWilling = confirm(`You are within 200 meters of ${lotName}. Would you like to provide input for this parking lot?`);
          if (isUserWilling) {
            window.location.href = `2.userinput.html?lot=${encodeURIComponent(lotName)}`; // from url to store the lot name
          }
        }
      });
    }, function(error) {
      alert('Error getting location: ' + error.message);
    });
  }
  
  function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    var R = 6371e3;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1); 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; 
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    checkUserProximityToParkingLots();
  });
  