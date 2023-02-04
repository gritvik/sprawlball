var express = require('express')
var bodyParser = require('body-parser');
var mysql = require('mysql2');
require('dotenv').config();
const cors = require("cors");
const { spawn } = require('child_process');
const path = require('path');
const logger = require('morgan');



var connection = mysql.createPool({
                host: process.env.host,
                user: process.env.user,
                password: process.env.password,
                database: process.env.database
});


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/read', function(req, res) {
  var sql = 'SELECT * FROM players';
  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    if (result[0] != null) {
        console.log('Found Player Data');
        console.log(result);
        res.json({'success': true, 'result': result})
    } else {
        console.log('No Data Found');
        res.json({'success': false, 'result': 'No Data was found!'})
    }
  });
});

app.get('/search', function (req, res) {
  var player_name = req.query.name;
  var sql = `SELECT * FROM players WHERE PlayerName = '${player_name}'`;
  console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err)
            return;
        }
        console.log(result);
        if (result[0] != null) {
            console.log('Found Player Data');
            console.log(result);
            res.json({'success': true, 'result': result});
        } else {
            console.log('No Data Found');
            res.json({'success': false, 'result': 'No Data was found!'})
        }
    })
});


app.get('/shotchart', (req, res) => {
    const name = req.query.name;
    const date = req.query.date;
    const sql = `SELECT LocationX, LocationY, ShotMade FROM shots NATURAL JOIN players NATURAL JOIN games WHERE PlayerName LIKE "${name}" AND DATE = ${date}`;


    connection.query(sql, function(err, result) {
        if (err) {
            res.status(400).json({success: false, result: err});
            return;
        }
        console.log(result);
        if (result[0] != null) {
            console.log('Found Shot Data');
           

            const py = spawn('python3', ['./shotplot.py', JSON.stringify(result)]);
            py.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });



            res.sendFile(path.join(__dirname + '/shotplot.png'));
        } else {
            console.log('No Data Found');
            res.json({'success': false, 'result': 'No Data was found!'})
        }
    })
});

app.get('/add', function(req, res) {
	var PlayerID;
    var PlayerName = req.query.name;

	var maxIDQry = `SELECT MAX(PlayerID) as maxID FROM players`;
    connection.query(maxIDQry, function(err, result) {
        if (err) {
            res.send(err)
            return;
        }
        console.log(result[0].maxID);
        PlayerID = parseInt(result[0].maxID);
        PlayerID++;
        console.log(PlayerID);
                    
        var instData = `INSERT INTO players (PlayerID, PlayerName) VALUES ('${PlayerID}', '${PlayerName}')`;

        console.log(instData);
        connection.query(instData, function(err, result) {
            if (err) {
                res.send(err)
                return;
            } else {
                res.send('Sucesssfully added player');
            }
        });
    });
});

app.get('/update', function(req, res) {
	var PlayerID = req.query.id;
    var PlayerName = req.query.name;
	
    var sql = `UPDATE players SET PlayerName = '${PlayerName}' WHERE PlayerID = '${PlayerID}'`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err){
            res.send(err);
            return;
        } else {
            res.send('Successfully updated Player Name');
        }
    });
});

app.get('/delete', function (req, res) {
    var PlayerID = req.query.id;
	var PlayerName = req.query.name;

	var pidCheck = `SELECT PlayerName FROM players WHERE PlayerID = '${PlayerID}'`;

	console.log(pidCheck);
	connection.query(pidCheck, function(err, result) {
		if (err) {
			res.send(err);
			return;
		}
		console.log(result[0]);
		if (PlayerName != result[0].PlayerName) {
			console.log('Player ID does not match Player Name');
            return;
		} else {
			var delete_sql = `DELETE FROM players WHERE PlayerID = '${PlayerID}'`;

			console.log(delete_sql);
			connection.query(delete_sql, function(err, result) {
				if (err) {
					res.send(err);
					return;
				} else {
                    res.send('Successfully deleted Player');
                }
			});
		}
	});
});

app.get('/adv1', function (req, res) {
    var sql = `SELECT PlayerName, AVG(ShotDistance) 
    FROM players NATURAL JOIN shots 
    WHERE ShotType like "3PT Field Goal" AND ShotMade = 1
    GROUP BY PlayerID
    HAVING COUNT(shotMade) > 25
    ORDER BY AVG(ShotDistance) DESC LIMIT 10`

    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err)
            return;
        }
        console.log(result);
        if (result[0] != null) {
            console.log('Found Advanced Query 1 Data');
            console.log(result);
            res.json({'success': true, 'result': result});
        } else {
            console.log('No Data Found for AQ1');
            res.json({'success': false, 'result': 'No Data was found!'})
        }
    })
});

app.get('/adv2', function (req, res) {
    var PlayerName = req.query.name;

    var sql = `SELECT Date, HomeTeam, AwayTeam, COUNT(shotMade)
    FROM players NATURAL JOIN shots NATURAL JOIN games
    WHERE ShotMade = 1 AND PlayerName like "${PlayerName}%"
    GROUP BY GameID
    ORDER BY COUNT(shotMade) DESC LIMIT 10`
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err)
            return;
        }
        console.log(result);
        if (result[0] != null) {
            console.log('Found Advanced Query 2 Data');
            console.log(result);
            res.json({'success': true, 'result': result});
        } else {
            console.log('No Data Found for AQ2');
            res.json({'success': false, 'result': 'No Data was found!'})
        }
    })
});

app.get('/stored', function (req, res) {
    var PlayerName = req.query.name;

    // var sql = `CALL Result('${PlayerName}')"`
    var sql = 'CALL Result("'+PlayerName+'")';
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err)
            return;
        }
        console.log(result);
        if (result[0] != null) {
            console.log("Successfully ran stored procedure");
            res.json({'success': true, 'result': result});
        } else {
            console.log('Failed run stored procedure');
            res.json({'success': true, 'result': 'Failed Stored Procedure'});
        }
    })
});

app.get('/login_activity', function (req, res) {
    var Username = req.query.username;
    var Password = req.query.password;

    var sql = `INSERT INTO Temp (Username, Password) VALUES ('${Username}', '${Password}')`;

    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err)
            return;
        } else {
            res.json({success: true, result: result});
        }
    });
});


app.listen(5001, function () {
    console.log('Node app is running on port 5001');
});