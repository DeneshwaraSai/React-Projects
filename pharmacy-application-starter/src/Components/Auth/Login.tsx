import React from "react";
import "./Login.styles.css";
import { Button, Card, FormControl, FormGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const submit = () => {
    const credentials = { username: "admin", password: "password" };
    sessionStorage.setItem("login", JSON.stringify(credentials));
    // navigate('/home');
    window.location.reload();
  };

  return (
    <div className="main-class">
      <div className="image-class">
        <img className="plus-image" src="imagePlus.png" />
      </div>

      <div className="right-side">
        <div className="right-side-content">
          <Card style={{ padding: 12 }}>
            <div>
              <h3 style={{ textAlign: "center" }}> Welcome Admin ! </h3>
            </div>
            <br></br>
            <FormGroup>
              <FormControl>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Username"
                  id="username"
                  name="username"
                />
              </FormControl>
              <br></br>
              <FormControl>
                <TextField
                  fullWidth
                  type="password"
                  size="small"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </FormControl>
            </FormGroup>

            <br></br>
            <div style={{ textAlign: "center" }}>
              <Button variant="outlined" style={{ margin: 8 }}>
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={() => submit()}
                style={{ margin: 8 }}
              >
                Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
