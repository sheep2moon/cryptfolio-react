import React, { useRef, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useFire } from '../contexts/FireContext';

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { register } = useFire();
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    let password = passwordRef.current.value;
    let confirmPassword = passwordRef.current.value;

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

  return (
    <>
      <div className='auth-card'>
        <h2>Signup</h2>
        {error && <p>{error}</p>}
        <form>
          <input
            type='email'
            placeholder='enter your email'
            name='email'
            ref={emailRef}
          />

          <input
            type='password'
            name='password'
            placeholder='enter your password'
            ref={passwordRef}
          />

          <input
            type='password'
            name='confimPassword'
            placeholder='repeat password'
            ref={passwordConfirmRef}
          />

          <button disabled={isDisabled} type='submit' onClick={handleSubmit}>
            {' '}
            signup{' '}
          </button>
          <div className='no-account'>
            <p>have account?</p>
            <Link to='/login'>login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
