import "./Login.css";
import { Button, Typography, TextField } from "@mui/material";
import { useState } from "react";

const Login = () => {

    const [value, setValue] = useState("");
    const [pass, setPass] = useState("");
    const [auth, setAuth] = useState(false);
    const [error, setError] = useState(false);

    const login = async () => {
        setError(false);
        setAuth(false);
        const resp = await fetch("http://localhost:5001/login_activity?username="+ value+ "&password=" + pass)
            .then((res) => res.json())
            .catch((err) => false);

        if (resp.success) {
            setAuth(true);
        } else {
            setError(true);
        }
    };

    return (
        <>
            {auth ? (
                <div className="login">
                    <h1>Account</h1>

                    <h2>Welcome {value}!</h2>

                    <br />
                    <h3>Favorite Teams:</h3>
                </div>
            ) : (
                
                <div className="login">
                    <h1>Login</h1>
                    <div className="search-box">
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            variant="filled"
                            color="primary"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className="search-box">
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="filled"
                            color="primary"
                            value={pass}
                            type="password"
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>

                    <br />
                    <Button
                        variant="contained"
                        onClick={() => login()}
                        sx={{
                            backgroundColor: "#FFF",
                            color: "#000",
                        }}
                    >
                        <Typography className="apple">Login</Typography>
                    </Button>

                    {error ? (
                        <h2>Incorrect credentials, please try again!</h2>
                    ) : (
                        <></>
                    )}
                </div>
            ) }
        

        </>
    );
};

export default Login;
