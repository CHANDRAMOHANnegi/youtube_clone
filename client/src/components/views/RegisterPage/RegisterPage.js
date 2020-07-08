
import React from 'react';
import { withRouter } from "react-router-dom";
import axios from '../../../axios';
import { Button, makeStyles, CardActions, createStyles, CardContent, CardHeader, Card, TextField,Input } from "@material-ui/core";
import { useForm } from "react-hook-form";

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


const Register = (props) => {

  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log("data", data);

    const { email, password, firstname, lastname } = data;
    const requestBody = `
    mutation{
       createUser(userInput:{email:"${email}",password:"${password}",firstname:"${firstname}",lastname:"${lastname}"}){
        email
        }
    }`;
    axios.post('/', {
      query: requestBody,
  }).then(response => {
      console.log('===========', response);
      if (response)
        props.history.push("/");
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Register User" />
          <CardContent>
            <TextField
              name="firstname"
              // error={error}
              fullWidth
              id="firstname"
              type="text"
              label="firstname"
              placeholder="firstname"
              margin="normal"
              inputRef={register({ required: true })}
            />
            {errors.name && errors.name.type === "required" && (
              <div className="error">Your must enter your name.</div>
            )}
            <TextField
              name="lastname"
              // error={error}
              fullWidth
              id="lastname"
              type="text"
              label="lastname"
              placeholder="lastname"
              margin="normal"
              inputRef={register({ required: true })}
            />
            {errors.lastname && errors.lastname.type === "required" &&
              (<div className="error">Your must enter your name.</div>)}
            <TextField
              name="email"
              // error={error}
              fullWidth
              id="email"
              type="email"
              label="email"
              placeholder="email"
              margin="normal"
              inputRef={register({ required: true })}
            />
            {errors.email && errors.email.type === "required" && (
              <div className="error">Your must enter your email address.</div>
            )}
            <TextField
              type="text"
              id="password"
              name="password"
              // error={error}
              fullWidth
              label="Password"
              placeholder="Password"
              margin="normal"
              inputRef={register({ required: true })}
            />
            {errors.password && errors.password.type === "required" && (
              <div className="error">Your must enter your score.</div>
            )}

            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className={classes.loginBtn}
                type="submit">
                Register
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </React.Fragment>
  );
}


export default withRouter(Register);
