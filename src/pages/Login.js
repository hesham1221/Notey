import {
  makeStyles,
  Button,
  Container,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#aaa",
    },
  },
});
const useStyle = makeStyles({
  container: {
    textAlign: "center",
    padding: "5% 25%",
    [theme.breakpoints.down("sm")]: {
      padding: "5% 10%",
    },
  },
  button: {
    marginTop: "1.2rem",
  },
});

export default function Login(props) {
  const history = useHistory();
  const [Password, setPassword] = useState();
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [login, setLogin] = useState(true);
  const [demo,setDemo] = useState(false)
  const classes = useStyle();
  const loginHandler = (event) => {

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwh52EOZL-yyElEps5wPR3TnYW_sJw2RQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: Password 
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setData(data);
        console.log(data);
        localStorage.setItem('token',data.idToken)
        localStorage.setItem('email',data.email)
        props.setdata(data)
      })
      .then(() => {
        setEmail("");
        setPassword("");
        props.isLogin(true);
        history.push("/");
      }).catch(e => console.log(e))

  };

  
  const registryHandler = (event) => {

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwh52EOZL-yyElEps5wPR3TnYW_sJw2RQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: Password,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => setData(data))
      .then(() => {
        setEmail("");
        setPassword("");
        setLogin(true);
        if(!!event.email){
          setDemo(true)
        }
      }).catch((e) => console.log(e));
  };
  
  const demoMode = () => {
    setEmail(`test123@test.com`) 
    setPassword('12345678')
  }


  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        <Typography
          color="textSecondary"
          variant="h2"
          className={classes.header}
        >
          {login ? "Login Form" : "Registry Form"}
        </Typography>
        <Typography
          color="textSecondary"
          variant="h6"
          className={classes.login}
        >
          Email :
        </Typography>
        <TextField
          variant="outlined"
          label="Email"
          color="secondary"
          fullWidth
          required
          onChange={(e) => setEmail(() => e.target.value)}
          value={email}
        />
        <Typography
          color="textSecondary"
          variant="h6"
          className={classes.login}
        >
          Password :
        </Typography>
        <TextField
          variant="outlined"
          type="password"
          label="Password"
          color="secondary"
          fullWidth
          required
          onChange={(e) => setPassword(() => e.target.value)}
          value={Password}
        />
        <Button
          color="secondary"
          fullWidth
          variant="contained"
          className={classes.button}
          onClick={login ? loginHandler : registryHandler}
        >
          {login ? "Login" : "Register"}
        </Button>
        <Button
          color="primary"
          fullWidth
          className={classes.button}
          onClick={() => setLogin((login) => !login)}
        >
          {login ? "Create Account" : "Login"}
        </Button>
        <Button
          color="primary"
          fullWidth
          className={classes.button}
          onClick={() => demoMode()}
        >
          Demo Account
        </Button>
      </Container>
    </ThemeProvider>
  );
}
