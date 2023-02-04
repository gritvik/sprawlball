import "./Search.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";

const Search = () => {
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");

    const [result, setResult] = useState("");
    const [error, setError] = useState(false);

    const [ad1, setAD1] = useState([]);
    const [ad2, setAD2] = useState([]);
    const [ad3, setAD3] = useState([]);

    const getDate = (d) => {
        d= ""+d;
        return d.substring(0,4)+"/"+d.substring(4,6)+"/"+d.substring(6,8);
    };

    const search = async () => {
        setResult("");
        setError(false);
        const resp = await fetch("http://localhost:5001/search?name=" + value)
            .then((res) => res.json())
            .catch((err) => {
                return false;
            });

        console.log(resp);
        setValue2(value);
        setError(!resp.success);
        setResult(resp.result);

        const resp2 = await fetch("http://localhost:5001/adv1")
            .then((res) => res.json())
            .catch((err) => {
                return false;
            });

        if (resp2.success) setAD1(resp2.result);

        const resp3 = await fetch("http://localhost:5001/adv2?name=" + value)
            .then((res) => res.json())
            .catch((err) => {
                return false;
            });
        if (resp3.success) setAD2(resp3.result);


        const resp4 = await fetch("http://localhost:5001/stored?name=" + value)
            .then((res) => res.json())
            .catch((err) => false);

        setAD3(resp4.result);
    };

    const deletePlayer = async (id, name) => {
        const resp = await fetch(
            "http://localhost:5001/delete?name=" + name + "&id=" + id
        )
            .then((res) => res.text())
            .catch((err) => {
                return false;
            });

        console.log(resp);
    };

    const update = async () => {
        const resp = await fetch(
            "http://localhost:5001/update?name=" +
                value2 +
                "&id=" +
                result[0].PlayerID
        )
            .then((res) => res.text())
            .catch((err) => {
                return false;
            });

        console.log(resp);
    };

    return (
        <div className="search-main">
            <h1>Get player information</h1>
            {/* <p>
                On this page you can query shot information to see how different
                teams and players stack up against each other!
            </p> */}

            <div className="search-box">
                <TextField
                    id="outlined-basic"
                    label="Player Name"
                    variant="filled"
                    color="primary"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>

            <br />
            <Button
                variant="contained"
                onClick={() => search()}
                sx={{
                    backgroundColor: "#FFF",
                    color: "#000",
                }}
            >
                <Typography className="apple">Search</Typography>
            </Button>

            <div className="result">
                {result !== "" ? (
                    error === true ? (
                        <p>Player Not Found!</p>
                    ) : (
                        <>
                            <br />
                            <br />
                            <br />
                            <br />
                            <div className="search-box">
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    variant="filled"
                                    color="primary"
                                    value={value2}
                                    onChange={(e) => setValue2(e.target.value)}
                                />
                            </div>

                            <h2>ID: {result[0].PlayerID}</h2>
                            <h3>{result[0].Position}</h3>
                            <h3>
                                Height: {result[0].Height} - Weight:{" "}
                                {result[0].Weight}
                            </h3>
                            <h3>Nationality: {result[0].Nationality}</h3>
                            <h3>College: {result[0].College}</h3>
                            <h3>
                                {result[0].DraftPick === result[0].DraftYeat ? (
                                    <>
                                    Drafted: Undrafted
                                    </>
                                ) : (
                                    <>
                                    Drafted: {result[0].DraftPick} in{" "}
                                {result[0].DraftYear}
                                    </>
                                )}
                                
                            </h3>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => update()}
                            >
                                Update
                            </Button>
                            <br />
                            <br />
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() =>
                                    deletePlayer(
                                        result[0].PlayerID,
                                        result[0].PlayerName
                                    )
                                }
                            >
                                Delete
                            </Button>

                            <br />
                            <br />
                            <br />

                            <h1>Shooting Ability by Zone</h1>
                            {ad3[0] && ad3[0]?.map((zones, i) => 
                                <div key={i}>
                                    <p><strong>{zones.ShotZone}</strong> - {zones.ShootingAbility}</p>
                                </div>)
                            }

                            <br />
                           
                            <h1>Top 10 Games of FGs Made</h1>
                            {/* <p>{JSON.stringify(ad2, null, "\n")}</p> */}
                            <div className="games">
                            {ad2?.map((game, i) => 
                                <div key={i}>
                                    {/* <h2>Game {i + 1}</h2> */}
                                    <p> <strong>{i + 1}.</strong> {game['COUNT(shotMade)']} shots made - {game['AwayTeam']} at {game['HomeTeam']} on {getDate(game['Date'])}</p>
                                    {/* <p>Shots Made: {game['COUNT(shotMade)']}</p>
                                    <p></p> */}
                                </div>)}
                            </div>
                            <br />
                            <h1>Players with farthest average 3pt shot made (min 25 attempts)</h1>
                            {/* <p>{JSON.stringify(ad1, null, "\t")}</p> */}
                            {ad1?.map((player, i) => 
                                <div key={i}>
                                   <p><strong>{i+1}.</strong> {player.PlayerName} - Average Shot Distance: {player["AVG(ShotDistance)"]}</p>
                            </div>)}

                    
                        </>
                    )
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Search;
