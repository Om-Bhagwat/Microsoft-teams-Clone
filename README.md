## Technolgies used.

**MERN and Websockets**

## Important
**To check Video Calling you need to run on Localhost as netlify is not allowing the Client URL to extend. Also all other Features such as Chat which does not deviate from Netlify's home url Work Fluently.**


## To Run on Localhost
**As backend and Websocket Are already hosted You only need to Run the Client Folder. Three Commands are required for that.**
**If you are using Gitbash Type the follwing commands in the command Line Note Make sure you have NPM installed**

1. In the root directory type `cd client`.
2. After going into Client Folder type `npm install`.
3. After installing the project dependencies type `npm start`.

This will Get your Localhost up and Running.

## For testing You may use the following Credentials.
> Email : testing1@test.com
> Password: 123456

## Folder Structuring.

**Client folder has all the frontend part in which individual components are made and reused ensuring no code is repeated. Also Comments are added for the Entire Project.**

**Websocket or Backend Folder holds the Websockets part of the project where logic for listening for a particular event and emitting after listening is written. This event include A person joining a video call, leaving a video call and chatting. Also Code for Sending Signal and receiving Signal for peer connection is written**

**Mongoserver folder keeps the code and logic related to Mongodb Database which let's the user talk with the Database by creating new teams, see existing teams, Storing user info, Adding users to the team and storing chat's to view history in the teamChannel.**

## Module Decomposition

> **User Authentication**<br>
The user authentication module is made using firebase authentication therefore it covers all the Contraints on email and password such as Not found, already exists, password too small or weak. It also provids jwt type functionality of User able to directly login after a period of time if he has logged on before untill the session expires.

> **Video Call**<br>
This module focuses on starting a event in which multiple users can talk with each other through Peer connections. A mesh Topology is created among the users so that each one is connected to the n-1 users present in the video call. Data flow is from client to Backend or Websockets using the Socket.io at backend and socket.io-client at client side. And Peerjs for establishing and Creating dedicated connections.

> **Chat Module**<br>
This module is made with Socket.io through which i am playing around with the data from client to websockets. This means that when a user sends message the message is listened by my websocket server and in response is emitted to all users present in the room. Note this room is nothing but the Team ID, or while during video call it will be RoomID.

> **Database Module**<br>
This module let's you create new teams add people onto your teams and chat in the team channel also view the chat history. The same chat module is used here also only difference is the message is now not only going through socket's but also to the Database. All the Routes are designed using express.js and the database used is MongoDB which is scalable.



## Agility at it's Core!
The module decomposition explains the  modules i made and completed over this 4 weeks. Every week a Module is developed And was developed in the same sequence i explained them before here in sprints. As exams were ongoing it was difficuilt to entirely focus on here.

## User friendly!!

The Entire Web application is responsive from homepage to video call. The cross and the chat buttons also work. The Video and auid buttons also change red when you stop either. Picture Are shown at the End.

## Better Comments.

All the functions and variables in th project are commented and also made humam readable.

## Software Requirements Specification.

The SRS document is also provided along the extra documents in the typeform in order to understand Data-flow , State Transitionand Functional, non-functional requirements and Various Other Things.


**Any Doubts regarding Project can be addressed to ombhagwat2401@gmail.com**
Any type of suggestions are also Welcomed 😁

___
### Project Screenshots
 You can get All the Project Screen Shots in this [google Document](https://docs.google.com/document/d/1cEtK6ft1GrgTipFoTbY5Cl7NAEY-BVN1OIu7cKfx694/edit?usp=sharing) which not only has images but also how the application interface looks while responsive.