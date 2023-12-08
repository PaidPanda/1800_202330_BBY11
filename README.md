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
* Sometimes, through JavaScript, the auto-populated name on a page would not update and would show a previous lot (caching issue?).
* Creating an account using an email address previously used would sometimes not work even after clearing the users collection on the Firestore database.

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
├── favourites.html          #
├── index.html               # landing HTML file, this is what users see when you come to url
├── input.html               #
├── login.html               #
├── lots.html                #
├── main.html                #
├── thanks.html              #
└── README.md                #

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /BBYA.jpg                # Acknowledge source
    /BBYB.jpg                #
    /BBYD.jpg                #
    /BBYE.jpg                #
    /BBYF.jpg                #
    /BBYN.jpg                #
    /BBYQ.jpg                #
    /location.png            #
    /parkinglot.jpg          #
    
├── scripts                  # Folder for scripts
    /authentication.js       # 
    /favourites.js           #
    /geolocation.js          #
    /input.js                #
    /lots.js                 #
    /main.js                 #
    /script.js               #
    /skeleton.js             #

├── styles                   # Folder for styles
    /style.css               # 

├── text                     # Folder for text html files that a reused in multiple pages
    /footer.html             #
    /nav_after_login.html    #
    /nav_before_login.html   #



```


