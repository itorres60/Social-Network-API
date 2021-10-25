Here we have a Social Network API

We have used the Mongoose package to connect to the MongoDB database.  
![Sever Screenshot](/server_ss.png "Mongoose server")

The database uses the proper Model structure utilising documents and subdocuments to structure data recieved through CRUD methods.  

The User schema invokees the thoughts created through the thoughts model and schema in order to be populated in the thoughts array for the user.

The Thought schema uses the subdocument for Reactions in order to POST reactions to any given thought.

This application makes use of CRUD methods and unique routes and endpoints to direct data and return the desired json formated information.

In order to achieve the bonus functionality of deleting a user's thoughts upon deleting the user, I set the logic to return document data from the user's collection as an arguemnt to a callback function in the thoughts controller. Essentially before I ran the delete query to delete the user I first queried the specific user's thoughts document and used a forEach loop to send each returned thought's ID to a call back function within the thought's cotroller that is exclusively responsible for delete the user's thoughts and return a progress log to confirm deletion.  This will only occure IF there are thoughts for that particular user to begin with.  Otherwise the delete route with continue with deleting the user.  


Here is a link to demonstration video

[Social Network API demonstration video](https://itorres60.github.io/Super-disco/ "Social Network API demonstration video-disco")
 
