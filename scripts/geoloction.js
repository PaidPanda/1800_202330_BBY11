// // Define the locations of parking lots
// const parkingLots = {
//     'Parking Lot A': { lat: 49.25240573955513, lon: -122.99937079258694 },//  'Parking Lot A': { lat: 49.25240573955513, lon: -122.99937079258694 }
//     'Parking Lot B': { lat: 49.25204066616602, lon: -122.99825499535372 },//'Parking Lot B': { lat: 49.25204066616602, lon: -122.99825499535372 },
//     'Parking Lot D': { lat: 49.248329660179316, lon: -122.99925640279429},// 'Parking Lot D': { lat: 49.248329660179316, lon: -122.99925640279429 },
//     'Parking Lot E': { lat: 49.24901577828027, lon: -122.99837663870316 },//'Parking Lot E': { lat: 49.24901577828027, lon: -122.99837663870316 }
//     'Parking Lot F': { lat: 49.247314689881904, lon: -122.99869926231959 },//'Parking Lot F': { lat: 49.247314689881904, lon: -122.99869926231959 }
//     'Parking Lot N': { lat: 49.2447230116984, lon: -123.00251872815622 },//   'Parking Lot N': { lat: 49.2447230116984, lon: -123.00251872815622 },
//     'Parking Lot Q': { lat: 50.119275422466785, lon: -122.94474360303957 }//'Parking Lot Q': { lat: 49.2542336214432, lon: -123.0030943972222 }
//     //test home: { lat: 49.26564156690797, lon: -123.00389431601982 } 
//     // sw 1 49.25113627947013, -123.00334181473046
//     // 50.119275422466785, -122.94474360303957
//   };

//   function checkUserProximityToParkingLots() {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by this browser.");
//       return;
//     }
  
//     navigator.geolocation.getCurrentPosition(function(position) {
//       const userLat = position.coords.latitude;
//       const userLon = position.coords.longitude;
      
//       Object.entries(parkingLots).forEach(([lotName, coordinates]) => {
//         const distance = getDistanceFromLatLonInM(userLat, userLon, coordinates.lat, coordinates.lon);
//         if (distance < 200) {
//           const isUserWilling = confirm(`You are within 200 meters of ${lotName}. Would you like to provide input for this parking lot?`);
//           if (isUserWilling) {
//             window.location.href = `eachHike.html?lot=${encodeURIComponent(lotName)}`; // from url to store the lot name
//           }
//         }
//       });
//     }, function(error) {
//       alert('Error getting location: ' + error.message);
//     });
//   }
  
//   function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
//     var R = 6371e3;
//     var dLat = deg2rad(lat2 - lat1);
//     var dLon = deg2rad(lon2 - lon1); 
//     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
//     return R * c; 
//   }
  
//   function deg2rad(deg) {
//     return deg * (Math.PI / 180);
//   }
  
//   document.addEventListener('DOMContentLoaded', function() {
//     checkUserProximityToParkingLots();
//   });
  

// //   function saveLotDocumentIDAndRedirect(){
// //     let params = new URL(window.location.href) //get the url from the search bar
// //     let ID = params.searchParams.get("docID");
// //     localStorage.setItem('lotDocID', ID);
// //     window.location.href = 'review.html';
// // }


const parkingLots = {
  'Parking Lot A': { lat: 49.25240573955513, lon: -122.99937079258694 },
  'Parking Lot B': { lat: 49.25204066616602, lon: -122.99825499535372 },
  'Parking Lot D': { lat: 49.248329660179316, lon: -122.99925640279429},
  'Parking Lot E': { lat: 49.24901577828027, lon: -122.99837663870316 },
  'Parking Lot F': { lat: 49.247314689881904, lon: -122.99869926231959 },
  'Parking Lot N': { lat: 49.2447230116984, lon: -123.00251872815622 },
  'Parking Lot Q': { lat: 49.26568711492164, lon: -123.00386245142634 } //test home: { lat: 49.26568711492164, -123.00386245142634 } 
  //'Parking Lot Q': {49.2542336214432, -123.0030943972222

};

const parkingLotIDs = {
  'Parking Lot A': 'pHjbxNd6rI42yWNTUMvc',
  'Parking Lot B': 'AtIU6C1nVnoaX8k72ROn',
  'Parking Lot D': 'jgypFDbzmsbsroLLol7s',
  'Parking Lot E': 'pc7LPy2blLkGmMD8kZIc',
  'Parking Lot F': 'pzdTAhp0Zao4SO3zbo89',
  'Parking Lot N': 'Oi3Usu7bU2giGtJbL0vO',
  'Parking Lot Q': 'e7pT5RAdBz3jwGB6C5rS'
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
              const isUserWilling = confirm(`You are within 200 meters of${lotName} Would you like to provide input for this parking lot?`);
              if (isUserWilling) {
                  const lotID = parkingLotIDs[lotName]; 
                  window.location.href = `eachHike.html?docID=${encodeURIComponent(lotID)}`; // from url to store the lot name
              }
          }
      });
  }, function(error) {
      alert('error: ' + error.message);
  });
}

// calculate the distance between two points
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  var R = 6371e3;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1); 
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// when the page is loaded, check if the user is near a parking lot
document.addEventListener('DOMContentLoaded', function() {
  checkUserProximityToParkingLots();
});