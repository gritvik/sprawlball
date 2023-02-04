# Sprawlball


### Project Summary:

We are storing shot data from the latest NBA season in our database. We pulled data from the 2021-22 NBA season about every single shot that was taken (with details such as type of shot, distance, position on court, made/missed, player shooting, time, gameId etc.). This data is sourced from stats.nba.com. Users will be able to get an in-depth analysis of NBA shooting numbers. Simple features could be being able to analyze or filter a certain player's shots, shots in a certain game, shots from a certain area on the court etc. More complex features could be being able to visualize these shots based on a given criterion. Kirk Goldsberry has worked on NBA shot data visualization, and we want to be able to recreate some of these visualizations within the scope of our project.


### Description:

With our dataset's information about shot statistics, a user will able to query, aggregate, and analyze their desired information about shots in the most recent NBA season. Tools we will provide include search, sort, filter, and quick stats (sum, average, etc... excel-like functions) - these will enable users to perform basic analysis of shots, such as a certain player's miss percentage, best place on the court to shoot from, time of game that most shots are made in, etc. This information will allow individuals to identify certain information or statistics, such as best long-range shooter, best dunker, etc - which can consequently help them to make bets on players or games or to craft an optimal fantasy NBA team. 

### Usefulness:

Our project is useful because we will be providing built in subsetting, aggregation, analysis, and exporting tools so users can extract as much info as easily as possible as they want from the tool. As mentioned above, individuals will be able to get certain statistics, such as best shooter per field position, best time to shoot, etc, which can help them in making bets or crafting fantasy teams. Other tools for viewing shot data exist; however, they are basically a CSV in a table, without great ability to analyze the data from within the web application, a user must export to their own Excel or Python script to perform any analysis. Example existing solution: https://www.basketball-reference.com/leagues/NBA_2022_shooting.html. This data can be used to determine what plays can be made/ where to shoot from based on certain parameters that hold true based on historical data.

### Realness:

We retrieved our dataset in a CSV from stats.nba.com. It contains shot data from the 2021-2022 NBA season and contains the following columns: 
GRID_TYPE,GAME_ID,GAME_EVENT_ID,PLAYER_ID,PLAYER_NAME,TEAM_ID,TEAM_NAME,PERIOD,MINUTES_REMAINING,SECONDS_REMAINING,EVENT_TYPE,ACTION_TYPE,SHOT_TYPE,SHOT_ZONE_BASIC,SHOT_ZONE_AREA,SHOT_ZONE_RANGE,SHOT_DISTANCE,LOC_X,LOC_Y,SHOT_ATTEMPTED_FLAG,SHOT_MADE_FLAG,GAME_DATE,HTM,VTM

We will join this dataset with other databases, most likely datasets containing more information about players (join on PLAYER_ID or PLAYER_NAME), teams (TEAM_ID, TEAM_NAME), specific games (GAME_ID, GAME_DATE), in order to provide the user with as much flexibility to access information as they would like. 

### Functionality:

Our data will be stored in a MySQL database hosted on Google Cloud Platform (GCP). We have our CSV with most shot data (as seen in Realness section), and will be joining this with other online resources to gather data about players, games, and teams. 
We will most likely use an Ag-Grid to display the data in a cleanly formatted table, which enables users to sort, filter, search, update, insert, and delete data, as well as export to their own choice of file (.xlsx, .csv, Pandas object, JSON potentially). Additionally, we can use Plotly to chart numerical and categorical data such as accuracy over game time, accuracy over distance-from-net, bar charts for players and teams.
Our stack will be PostGreSQL, Flask backend, React frontend, and hosted on Google Cloud Platforms. Flask will serve as the backend between the application, and send CRUD request to our Database based on the inputs given by the user. The User will interact with the React client-side to send in requests to our backend. Our database will be greated using PostgreSQL. We will have our database/application hosted on the GCP. hosting the server and client side on GCP will not be our primary goal, but we will attempt to get the database deployed on the GCP.

### Low Fidelity UI Mockup: Attached as SprawlballMockup.png

### Project Work Distribution:

* Manas - Deploy database on GCP + Backend
* Ritvik - Implement database + Frontend
* Nick - Full-stack
* Jaimin - Create ER Diagram + Frontend
