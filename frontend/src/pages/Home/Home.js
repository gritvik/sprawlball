import "./Home.css";
import { Button, Typography } from "@mui/material";

const Home = () => {
    return (
        <div className="home-main">
            <div className="info">
                <h1>Welcome to Sprawball!</h1>

                <p>
                    This application will allow users to analyze shot data from the 2021-22 NBA regular season.
                </p>
                <br />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#FFF",
                        color: "#000",
                        
                    }}
                >
                <Typography className="apple">Learn More!</Typography>
            </Button>
        </div>
        </div >
    );
};

export default Home;
