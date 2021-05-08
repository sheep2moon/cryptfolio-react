import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Container,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useFire } from '../contexts/FireContext';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '100px',
    padding: '30px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '500px',
    margin: 'auto',
  },
  textField: {
    marginBottom: '10px',
    width: '100%',
    maxWidth: '300px',
  },
  button: {
    width: '200px',
  },
}));

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { user, register, logout } = useFire();
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    let password = passwordRef.current.value;
    let confirmPassword = passwordConfirmRef.current.value;

    if (password !== confirmPassword) {
      return setError('password do not match');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters length');
    }
    try {
      setError('');
      setIsDisabled(true);
      await register(emailRef.current.value, passwordRef.current.value);
      setIsDisabled(false);
      history.push('/');
    } catch {
      setError('can not register');
      setIsDisabled(false);
    }
  }

  if (user) {
    return (
      <>
        <Container className={classes.container}>
          <Paper className={classes.paper}>
            <Typography>Already logged in as a {user.email}</Typography>
            <Button className={classes.button} onClick={logout} color='primary'>
              Logout
            </Button>
          </Paper>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container className={classes.container}>
        <Paper className={classes.paper}>
          <div className='error-container'>{error && <p>{error}</p>}</div>
          <Typography>Enter the following:</Typography>
          <TextField
            className={classes.textField}
            label='e-mail'
            inputRef={emailRef}
            variant='filled'
          />
          <TextField
            className={classes.textField}
            label='password'
            inputRef={passwordRef}
            variant='filled'
            type='password'
          />
          <TextField
            className={classes.textField}
            label='confirm password'
            inputRef={passwordConfirmRef}
            variant='filled'
            type='password'
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Register
          </Button>

          <p>Have account?</p>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => history.push('/login')}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Register;
