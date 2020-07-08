import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../../_context/authContext';


const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  }),
);

const Login = (props) => {

  console.log('>>>>>>>>>>>>>>>>>>>', props);

  const context = useContext(AuthContext);

  const classes = useStyles();
  const [email, setEmail] = useState('cm@cm.com');
  const [password, setPassword] = useState('12345678');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(context);
    const { isAuthenticated, userData } = context.authData;
    if (isAuthenticated) {
      window.localStorage.setItem('userId', userData.userId);
      // if (rememberMe === true) {
      //   window.localStorage.setItem('rememberMe', values.id);
      // } else {
      //   localStorage.removeItem('rememberMe');
      // }
      props.history.push("/");
    }

    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [context, props]);

  const handleLogin = () => {

    console.log(email, password);

    if (email && password) {
      const requestBody = `{
        login(email:"${email}",password:"${password}"){
            userId,token,
            tokenExp,firstname,
            lastname,role,
            image,email
    }}`;

      axios.post('http://localhost:4000/api', {
        query: requestBody,
      }).then(res => {
        console.log(res.data.data.login);
        localStorage.setItem('userData', JSON.stringify(res.data.data.login))
        context.setUser(res.data.data.login);
      }).catch(err => {
        console.log(err);
      });
      setError(false);
      setHelperText('Login Successfully');
    } else {
      setError(true);
      setHelperText('Incorrect email or password')
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Login App" />
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="email"
                type="email"
                label="email"
                placeholder="email"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={() => handleLogin()}
              disabled={isButtonDisabled}>
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </React.Fragment>
  );
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.user.isAuthenticated,
//     userData: state.user.userData
//   };
// };

// const mapDispatchToProps = {
//   loginUser
// }

export default withRouter(Login);


