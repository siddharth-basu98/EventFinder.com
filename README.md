# EventFinder.com

## Project details: 

FindMyEvents is aiming to digitise a product which is an online  system capable of performing operations such as managing events for  example adding, deleting, updating, retrieving, sorting on various conditions etc. The admin of the site can also define and redefine the events in the system. The admin requires a login username and password for performing all these activities. The admin can logout as well. 

**Currently the system performs admin specific functionalities (as mentioned in the problem statement). Only the home page is visible for a non admin. To access the events you must click events on the top navbar. 

**All the functionalities have the prerequisite that an admin MUST first log in (“/login”).

Admin username and password (to be entered on the login page)

{
	“username”:”admin”
	“password”:”admin”
}


## How to run the app

- Step 1: Clone the project. 
- Step 2: (Activating Express APIs and MondoDB database) -> Using any IDE of choice, open the cloned project in the workspace. MongoDB needs to be installed for the user and it is from where the backend is connected and the APIs manipulate. After doing that run “cd BackEnd_Express_Mongo_server” and run “npm install” and then  “npm start”. This starts the backend server which starts listening to port 4000 where the react app sends its request to.
- Step 3: (Starting the React Development Server) -> On the root directory of the application, just run the command “npm install” and then“npm start”, it automatically starts the react development server on port 3000 which is default. 
- Step 4: (Load initial data for protype demo) -> The home page is what opens upon starting the react project. On the home page navigation bar, there is an option to “Load initial data (For prototype demo purposes)”
- Step 5: The app majorly as required were to perform admin related tasks, so to access the functionalities of the application it sends you to a login page when you click to access the login page, the user saved as of now is “admin” and “admin” with the name “siddharth”. SO on the login page enter the following username and password, 
{
	“username”:”admin”
	“password”:”admin”
}

- Step 6: Enjoy all the functionalities of the app from here on. 

_
_


![alt-text](https://github.com/siddharth-basu98/EventFinder.com/blob/master/gifs/app_gif.gif)




## Some key concepts used in the Application

- React states and classful components
- React Hooks and functional components
- Express JS for API endpoints (backend development)
- NodeJS
- JWT authentication for Login
- React component lifecycle methods
- Bootstrap and CSS for styling
- ES6 JavaScript features
- React Router
- Google Maps API for showing event location map


 
_
_

![alt-text](https://github.com/siddharth-basu98/EventFinder.com/blob/master/gifs/functionality_gif.gif)




