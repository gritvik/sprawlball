# Database Design
We implemented 4 tables for our database: Players, Teams, Games, and Shots.

<img width="744" alt="Tables" src="https://user-images.githubusercontent.com/68198274/197101430-1ec0e369-e028-4858-baa4-40c8c822016d.png">

The count screenshots for each of these tables are as follow:

#### Players:

<img width="304" alt="PlayerCount" src="https://user-images.githubusercontent.com/68198274/197101462-054e8d98-f7bc-4d78-bef2-e718b9801a9b.png">


#### Teams:

<img width="285" alt="TeamCount" src="https://user-images.githubusercontent.com/68198274/197101445-9d723a44-ef99-4b47-ad7c-3f8941eebf4b.png">


#### Games:

<img width="278" alt="GamesCount" src="https://user-images.githubusercontent.com/68198274/197101465-cb795cf8-e97a-462a-b7a6-1b19914b7097.png">


#### Shots:

<img width="291" alt="ShotCount" src="https://user-images.githubusercontent.com/68198274/197101455-e9770478-eb61-4db9-961b-6415adc45e7a.png">



### DDL Commands
#### Players:

    CREATE TABLE players(
        PlayerID int,
        PlayerName varchar(255),
        College varchar(255),
        Nationality varchar(255),
        Height varchar(255),
        Weight int,
        Position varchar(255),
        DraftYear varchar(255),
        DraftRound varchar(255),
        DraftPick varchar(255),
        PRIMARY KEY(PlayerID)
    );

#### Teams:

    CREATE TABLE teams(
        TeamID int,
        TeamName varchar(255),
        Abbreviation varchar(255),
        Nickname varchar(255),
        City varchar(255),
        State varchar(255),
        YearFounded int,
        PRIMARY KEY(TeamID)
    );

#### Games:

    CREATE TABLE games(
        GameID int,
        HomeTeam varchar(255),
        HomeTeamID int,
        AwayTeam varchar(255),
        AwayTeamID int,
        Date int,
        PRIMARY KEY(GameID),
        FOREIGN KEY(HomeTeamID) REFERENCES teams(TeamID),
        FOREIGN KEY(AwayTeamID) REFERENCES teams(TeamID)
    );

#### Shots:

    CREATE TABLE shots(
        ShotID int,
        GameID int,
        PlayerID int,
        TeamID int,
        Period int,
        MinutesRemaining int,
        SecondsRemaining int,
        ActionType varchar(255),
        ShotType varchar(255),
        ShotZoneBasic varchar(255),
        ShotZoneArea varchar(255),
        ShotDistance int,
        LocationX int,
        LocationY int,
        ShotMade int,
        PRIMARY KEY(ShotID),
        FOREIGN KEY(GameID) REFERENCES games(GameID),
        FOREIGN KEY(PlayerID) REFERENCES players(PlayerID),
        FOREIGN KEY(TeamID) REFERENCES teams(TeamID)
    );




### Advanced Queries

#### Players with farthest average 3pt shots made (min. 25 attempts)

        SELECT PlayerName, AVG(ShotDistance) 
        FROM players NATURAL JOIN shots 
        WHERE ShotType like "3PT Field Goal" AND ShotMade = 1
        GROUP BY PlayerID
        HAVING COUNT(shotMade) > 25
        ORDER BY AVG(ShotDistance) DESC
        LIMIT 15;

![AdvancedQuery1](https://user-images.githubusercontent.com/68198274/197077561-a1d46cf8-924f-4d62-99b6-78913d5507da.png)

#### Ayo Dosunmu's top 15 games of field goals made

        SELECT Date, HomeTeam, AwayTeam, COUNT(shotMade)
        FROM players NATURAL JOIN shots NATURAL JOIN games
        WHERE ShotMade = 1 AND PlayerName like "Ayo%"
        GROUP BY GameID
        ORDER BY COUNT(shotMade) DESC
        LIMIT 15;
    
<img width="1423" alt="AdvancedQuery2" src="https://user-images.githubusercontent.com/68198274/197101386-1d0487a8-0a49-40e4-9873-002d8447ecb5.png">


### Indexing

#### Advanced Query 1

<img width="1312" alt="Initial" src="https://user-images.githubusercontent.com/68198274/198848097-eb2efcc2-01d6-440f-ab48-feca13f324b8.png">


##### Index on ShotDistance

    CREATE INDEX idx_shot_distance on shots(shotDistance);

The first indexing we tried was an index on the shotDistance column in the shots table. We chose this because the query was returning the average shot distance for a certain set of players. This index was able to cut down the cost by a little. We believe this was because the AVG function is an aggregate function that had to look up shot distances for players.

<img width="1420" alt="Index 1" src="https://user-images.githubusercontent.com/68198274/197297575-5e6acb27-2cc4-4f2d-a674-bea631ecebed.png">


##### Index on PlayerName

    CREATE INDEX idx_player_name on players(PlayerName);

The second indexing we tried was an index on the playerName column in the players table. We chose this because the query was returning the playerName after looking up the tables with playerID. This was able to decrease the cost by a little. We believe this was because the playerName had to be looked up with the playerID. 

<img width="1409" alt="Index 2" src="https://user-images.githubusercontent.com/68198274/197297581-0f38f515-7902-497a-b994-113ea796ae1f.png">


##### Index on ShotType

    CREATE INDEX idx_shot_type on shots(shotType);

The third indexing we tried was an index on the ShotMade column in the shots table. We chose this because the query checks whether the type of the shot in the WHERE clause. This did not change the cost at all. We believe this was because there are only two values that the type could be.

<img width="1391" alt="Index 3" src="https://user-images.githubusercontent.com/68198274/197297593-3bba9bc1-807b-4115-ad3a-17bd9ab16f55.png">


#### Advanced Query 2

<img width="1181" alt="Initial" src="https://user-images.githubusercontent.com/68198274/197295121-17c1a12d-454a-42b1-a4ce-78a1df58905d.png">

##### Index on PlayerName

    CREATE UNIQUE INDEX idx_name on players(playerName);

The first indexing we tried was a unique index on the playerName column in the players table. We chose this because this query had a WHERE clause which was checking if the playerName was like "Ayo%". This index significantly decreased the cost of this filter. This index was able to help us narrow down the playerName significantly faster.

<img width="1098" alt="Index 1" src="https://user-images.githubusercontent.com/68198274/197295139-a2e69383-b18b-4cf9-b5d9-5bbb4e27e6ca.png">

##### Index on PlayerID

    CREATE UNIQUE INDEX idx_player_id on shots(PlayerID);

The second indexing we tried was a unique index on the playerID column in the shots table. We chose this because the EXPLAIN ANALYZE of the query showed that the lookup on shots using PlayerID had a sizeable cost. This index decreased the cost by about 30%. The lookup on the shots was with PlayerID, so this indexing was able to make it more efficient.

<img width="1126" alt="Index 2" src="https://user-images.githubusercontent.com/68198274/197295165-0816fbd3-dcbd-4287-aef0-66294b23afd6.png">

##### Index on ShotMade

    CREATE INDEX idx_shot_made on shots(shotMade);

The third indexing we tried was an index on the shotMade column in the shots table. We chose this because the query had a WHERE clause which was checking if the shot was made. This index did not increase the efficiency. We believe that this maybe because the values in the table were either 0 or 1, so the indexing didn't help.

<img width="1143" alt="Index 3" src="https://user-images.githubusercontent.com/68198274/197295184-4e578724-12b1-4488-a5ef-19587c35738d.png">
