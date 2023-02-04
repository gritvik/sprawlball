# Project Reflection

### Final Demo Video:
https://youtu.be/doXUMYiNipk



### Please list out changes in the direction of your project if the final project is different from your original proposal (based on your stage 1 proposal submission).

The direction of our project did not change significantly compared to the original proposal. We wanted to build a tool that can help a user better understand NBA shot data. We were able to develop a web app that can query, manipulate, and analyze shot data from the 2021-22 NBA season.




### Discuss what you think your application achieved or failed to achieve regarding its usefulness.

We believe that our application achieved a lot regarding its usefulness. Users can look at a singular player’s shot data through different lenses such as relative efficiency by court zone, games with the most field goals made, or just a shot chart for a specific player from a certain game. The only failure would be that these options could be limited for someone trying to query the data. We could have used more flexible fields for the CRUD operations and the advanced queries. This could mean that we expand the searching and filtering options to more than just the name field. We could also have done different advanced queries that were more team-based rather than player-based.




### Discuss if you changed the schema or source of the data for your application

The source of our data remained unchanged and was the NBA API, from which we were able to pull shot, team, game, and player data. We added more columns to each table based on what data was available and relevant. This was the only change we made to the original schema.




### Discuss what you change to your ER diagram and/or your table implementations. What are some differences between the original design and the final design? Why? What do you think is a more suitable design? 

We had to integrate a temp table for the user login trigger since we needed to first authenticate the password used during login. This change was simply a workaround for issues we faced in the implementation. Structurally, the database is set up as we originally intended in the ER diagram.




### Discuss what functionalities you added or removed. Why?

Originally, we planned on having a player linked to a certain team. However, there would be players with multiple teams in a single season due to in-season trades, cuts, and signings. We were not able to get a fix for this issue, so currently our application does not connect a player to a team. 

We were able to add a shot chart plotting tool to our application as the creative component. This tool helps the user visualize a player’s shots from a certain game.




### Explain how you think your advanced database programs complement your application.

The first advanced query we implemented outputs the ten players with the furthest average three-point made. This provides the user with an idea of which players are best at shooting from long range.

The second advanced query we implemented outputs the ten games where a player makes their most field goals. This provides the user with the games where the selected player shot the best. This complements well with the s†hot chart tool as users can use dates from this query as input to that tool.

The stored procedure we implemented gives you information about how a player shoots from a certain part of the court compared to the league average. This helps you contextualize a player’s efficiency as it puts the numbers into perspective.

The trigger we implemented helps us authenticate the user password provided at login. This helps a user save their info securely.




### Each team member should describe one technical challenge that the team encountered. This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or where to maintain your project.

Manas - Creating the stored procedure from scratch was an interesting challenge and we had trouble formatting it so that we could put it into the Google Cloud Platform for our database. I would recommend having other team members use the resources given to them in the class (GAs, HWs, etc.) to get a basic stored procedure going and build off of that.


Ritvik - Pulling the data using the NBA API was tedious because there wasn’t much updated documentation. A lot of the process was trial and error. I would advise another future team to make sure that they use an API that is well-maintained and documented if they want to use recent data such as the shot data we used.


Nick - One of the largest parts of the project I contributed to was the front end. One mistake I made was sometimes I would go implement parts of the front end before our team had decided on an exact design for parts of our backend, I ended up causing myself extra work because the frontend really needs to be designed around the specific data it is getting from the backend. I would recommend that future teams work first on implementing a backend before jumping into design and UI development, especially for a project like this that is so focused on the backend and database side of the project.


Jaimin - I worked on building out the backend for this project, which meant coordinating with Ritvik on SQL parts and Nick on connecting to the front end. I would say that similarly to Nick, one of the challenges for this was coordination since I had to fully understand how to map the inputs and outputs of my functions to work with the database and the front end, but without knowing yet how it will be built since they were coded in parallel. 




### Are there other things that changed comparing the final application with the original proposal?

No. Everything we changed in the final application compared to the original proposal has been listed.




### Describe future work that you think, other than the interface, that the application can improve on

Our data is currently limited to just one season, but we can improve the app by adding more data from other NBA seasons. We could also have optimized our database more by exploring more indexing options for the data. All the queries would have needed to parse through a lot of data, and further optimization would have provided an overall smoother experience for the user.




### Describe the final division of labor and how well you managed teamwork. 

We managed our teamwork relatively well. Nick was primarily working on the development of the front end and the Express server. Ritvik primarily worked on setting up the database, the advanced queries, and the creative component, and also helped with designing the front end. Manas worked on the stored procedure and trigger while also helping with the server. Jaimin primarily worked on the Javascript components to ensure that the connections between the front end and back end were sound. Overall, our team worked well together. We were able to help each other with stuff that we were stuck on individually and were also able to fill in if a team member was unavailable for small things.
