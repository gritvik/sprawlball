import "./Insert.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";

const Search = () => {
    const [value, setValue] = useState("");

    const [result, setResult] = useState("");

    const search = async () => {
        const resp = await fetch("http://localhost:5001/add?name=" + value)
            .then((res) => res.text())
            .catch((err) => {
                return false;
            });

        console.log(resp);
        setResult(resp);
    };

    return (
        <div className="search-main">
            <h1>Insert a Player to track their shot data</h1>
            <p>
                On this page you can add a players name to our database so their
                shot information can be tracked!
            </p>

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
                <Typography className="apple">Add Player</Typography>
            </Button>

            <h3>{result !== "" && result}</h3>
        </div>
    );
};

export default Search;
