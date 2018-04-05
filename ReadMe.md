Chat Application using Socket.io and Firestore(Firebase):
This application is similar to my old project https://github.com/san-pblr-gct/socket-mongo-chat where i have used mongo db and i have replaced mongodb with Firestore in this project.

Before you start:
Register with firebase and create a project. Download service account json from the project settings
service account tab. This file will have details about firebase service account which is highly confidential and shouldnt be checked in public repositories. Thats the reason you dont see the file in this repository.

To run the application
1. install npm
2. Also install nodemon globally "npm install nodemon -g"
3. run npm start in cmd
4. Browse the html page in firefox or host it in IIS or other web server using parcel/webpack/express. Running file directly in chrome will mess up with connecting socket and it won't work
