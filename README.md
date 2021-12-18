# Life on the Node

> Direct Link: https://lifeonthenode.herokuapp.com/

## Creator
> Tiffany Tran: https://github.com/trantiffany21
> 

## Project Description
A web app that stores a user's upcoming travel trips and points of interest and can optimize the route for the user to efficiently travel. The route will be the fastest and shortest route to go and displays an interactive map with stop markers. Data for addresses, mapping, and optimization routes utilize Mapbox's Map, Search, and Navigation APIs. 

### Technology Used and Approaches
- The website was built using React, Flask, Node.js, Python, Javascript, HTML, and CSS
- React was used to build the frontend and a Flask backend. 
- The backend contains a user model storing a user's login information, trips, and points of interest. Bcrypt was used to maintain security for user passwords.
- The Semantic UI React framework was used for styling of the app.
- The app is being hosted using PostGres deployed on Heroku for both frontend and backend.
- Third Party APIs used was Mapbox to fetch address information, maps, and optimization routes. 

### Installation Steps
- Fork and Clone both frontend and backend repos into separate folders. 
  - Frontend: https://github.com/trantiffany21/LifeOTNode-Frontend
  -  Backend: https://github.com/trantiffany21/LifeOTNode
- Create react app and install npm packages on the frontend
- Install flask requirements on the backend

### Wireframes
Add Trip Details Page: 
![image](https://media.git.generalassemb.ly/user/37228/files/9e433d00-520a-11ec-9ef7-7da37d4d0db7)

Route Page:
![image](https://media.git.generalassemb.ly/user/37228/files/f24d2200-5208-11ec-87c4-f9a4b7f604d4)

### ERD
![image](https://user-images.githubusercontent.com/80294899/146647048-970cd33c-9f37-41d0-aa30-d22c8070dbb2.png)

## User Stories

### MVP Goals
> As a user, I would like to be able to signup and login easily
> As a user, I would like to be able to enter my trip details such as destination, lodging information, and points of interest.
> As a user, I would like to be able to see an optimized route of my trip so I can have an itinerary planned for me. 
> As a user, I would like to have a visually appealing website

### Stretch Goals
> Integrate 3rd party login
> As a user, I would like to be emailed my trip details. 

### Upcoming features
- Send emails to a user about route
- Enhanced capabilities of routing for multiple days
