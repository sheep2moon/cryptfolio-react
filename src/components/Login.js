import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Link,
  Container,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useFire } from '../contexts/FireContext';
import '../styles/login.css';

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

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, user } = useFire();
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setIsDisabled(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setIsDisabled(false);
      history.push('/');
    } catch {
      setError('can not login');
      console.log(user);
      setIsDisabled(false);
    }
  }

  return (
    <>
      <Container className={classes.container}>
        <div className='error-container'>{error && <p>{error}</p>}</div>
        <Paper className={classes.paper}>
          <Typography>Enter the following:</Typography>
          <TextField
            className={classes.textField}
            label='e-mail'
            ref={emailRef}
            variant='filled'
          />
          <TextField
            className={classes.textField}
            label='password'
            ref={passwordRef}
            variant='filled'
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Login
          </Button>

          <p>No account?</p>
          <Link to='/register'>Register</Link>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
