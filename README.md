# Simple Park

## 1. Project Description
Simple Park is a web-based application to enhance the parking experience for daily drivers who park on the BCIT Burnaby campus
by utilizing geolocation services to provide informative and up-to-date parking lot statuses.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Nathan! I am excited to learn web apps.
* Hi, My name is Niko Wang. I like our project.
* Hi, my name's William. I like ice cream.

	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Google Fonts (Fonts & icons)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Access the web app via URL.
* Register for an account and login.
* Scroll through the list of various parking lots.
* Select a parking lot.
* View the status.
* Favourite the lot for easier access in the future.
* Park with efficiency.

## 5. Known Bugs and Limitations
Here are some known bugs:
* Unable to remove favourites after favouriting a parking lot.
* Sometimes, through JavaScript, the auto-populated lot  on a page would not update and would show a previous lot (caching issue?).
* Creating an account using an email address previously used, would sometimes not work even after clearing the users collection on the Firestore database.
* Geolocation prompt overlaps if user is within the radius of multiple lots. For example, if user is within the radius of lots A and B, user receives the prompt for both A and B.

## 6. Features for Future
What we'd like to build in the future:
* Implement a map view to allow users to scan through a map and search for their desired parking lot of choice.
* Implement a notifications feature that would alert users of any changes to the parking status of their lot of interest.
* Implement a profile feature to allow users to save personal information and to interact or friend other users.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── favourites.html          # favourite parking lots HTML file, this is where users view their favourited parking lots
├── index.html               # landing HTML file, this is what users see when you come to url
├── input.html               # user input HTML file, this is where users provide their feedback regarding the status and other aspects of the lots
├── login.html               # login HTML file, this is where users register and login to the application
├── lots.html                # parking lot HTML file, this is where users view the specific details asscoiated with a desired lot
├── main.html                # main HTML file, this is the main page where users view the extensive list of lots on the BCIT Burnaby campus
├── thanks.html              # thanks HTML file, this is where users are redirected too after providing input and provides confirmation of submission
└── README.md                # Read me file

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /BBYA.jpg                # image of Parking Lot A on the BCIT Burnaby Campus (https://www.bcit.ca/parking/campus-parking/)
    /BBYB.jpg                # image of Parking Lot B on the BCIT Burnaby Campus (https://www.bcit.ca/parking/campus-parking/)
    /BBYD.jpg                # image of Parking Lot D on the BCIT Burnaby Campus (https://www.bcit.ca/parking/campus-parking/)
    /BBYE.jpg                # image of Parking Lot E on the BCIT Burnaby Campus (https://www.bcit.ca/parking/campus-parking/)
    /BBYF.jpg                # image of Parking Lot F on the BCIT Burnaby Campus (https://www.bcit.ca/parking/campus-parking/)
    /BBYN.jpg                # image of Parking Lot N on the BCIT Burnaby Campus (https://www.bcit.ca/parking/campus-parking/)
    /BBYQ.jpg                # image of Parking Lot Q on the BCIT Burnaby Campus (https://www.bcit.ca/parking/campus-parking/)
    /location.png            # image for the logo of our app (https://www.flaticon.com/free-icon/parking_2503520?term=parking&page=2&position=50&origin=search&related_id=2503520)
    /parkinglot.jpg          # image for the background of our app (https://unsplash.com/photos/aerial-view-of-cars-parked-on-parking-lot-yvfp5YHWGsc)
    
├── scripts                  # Folder for scripts
    /authentication.js       # this file contains the code for detailing personal information for the user collection in the Firestore database, as well as the widget for the Firebase login 
    /favourites.js           # this file contains the code for favouriting/bookmarking a parking lot.
    /geolocation.js          # this file contains the code for the geolocation feature.
    /input.js                # this file contains the code to allow users to provide input regarding lot details, which stored in the Firestore database
    /lots.js                 # this file contains the code for populating the specific lot information into a card displayed on lots.html, ordered by descending timestamp to provide latest information to user.
    /main.js                 # this file contains the hardcoded information for all parking lots and dynamically generates and populates information for each lot.
    /script.js               # this file contains the code for the logout function.
    /skeleton.js             # this file contains the code for the navbar and footer, differentiating between what the user sees before and after logging into the system.

├── styles                   # Folder for styles
    /style.css               # this file contains all the styling and css code for all pages

├── text                     # Folder for text html files that a reused in multiple pages
    /footer.html             # this file contains the html for the footer section
    /nav_after_login.html    # this file contains the html for the navbar after user login
    /nav_before_login.html   # this file contains the html for the navbar before user login

├── archive                  # Folder of older files that have been replaced to newer versions (for our reference) 



```


