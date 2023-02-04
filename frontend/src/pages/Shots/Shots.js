import React from "react";
import "./Shots.css";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
// import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const Shots = () => {
    const [name, setName] = useState("");

    const [value, setValue] = React.useState(null);
    const [img, setImg] = useState();

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const search = async () => {
        const y = ''+value['$y'];
        value["$M"] = value['$M'] + 1;
        const m = value['$M'] < 10 ? '0'+value['$M'] : ''+value['$M'];
        const d = value['$D'] < 10 ? '0'+value['$D'] : ''+value['$D'];
        const date = y+m+d;

        const resp = await fetch("http://localhost:5001/shotchart?name=" + name + "&date=" + date)
            // .then((res) => res.json())
            .catch((err) => {
                return false;
            });

        const imageBlob = await resp.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };



    return (
        <div className="shots-main">
            <h1>Search for a Player's Shot Chart</h1>
            {/* <p>
                On this page you can query shot information to see an up-to-date
                chart with all of the player's data!
            </p> */}

            <div className="search-box">
                <TextField
                    id="outlined-basic"
                    label="Player Name"
                    variant="filled"
                    color="primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <br />
            <br />

            <div className="search-box">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            label="Game Date"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField variant="filled" {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
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
                {img ?
                    <>
                        <p>Results</p>
                        <img src={img} alt="shot chart" />
                    </> 
                    :
                    <></>
                }
            </div>
        </div>
    );
};

export default Shots;
