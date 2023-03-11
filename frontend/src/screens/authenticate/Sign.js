import React, { useContext, useState } from 'react';
import './Sign.css';
import Axios from 'axios';
import { store } from '../../store';
import { useNavigate } from 'react-router-dom';

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const { state, dispatch } = useContext(store);
  const { user } = state;
  const navigate = useNavigate();

  const load = () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  };

  const signinHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await Axios.post('/user/signin', {
        email,
        password,
      });
      dispatch({ type: 'SIGN_UP', payload: data });
      window.alert('Account logined');
      navigate('/');
    } catch (error) {
      window.alert('error' + error.message);
    }
    console.log('signin');
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    console.log('Sigup frontend');
    try {
      const { data } = await Axios.post('/user/signup', {
        email,
        name,
        password,
      });
      dispatch({ type: 'SIGN_UP', payload: data });
      window.alert('Account created');
      navigate('/');
    } catch (error) {
      window.alert('error ' + error.message);
    }
    console.log('signup');
  };

  return (
    <div className="Sign" onLoad={load}>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1> Create Account </h1>{' '}
            <span> or use your email for registration </span>{' '}
            <input
              onChange={(val) => {
                setname(val.target.value);
              }}
              type="text"
              placeholder="Name"
            />
            <input
              onChange={(val) => setEmail(val.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(val) => {
                setpassword(val.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <button onClick={signupHandler}> Sign Up </button>{' '}
          </form>{' '}
        </div>{' '}
        <div className="form-container sign-in-container">
          <form action="#">
            <h1> Sign In </h1> <span> or use your account </span>{' '}
            <input
              onChange={(val) => {
                setEmail(val.target.value);
              }}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(val) => {
                setpassword(val.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <button onClick={signinHandler}> Sign In </button>{' '}
          </form>{' '}
        </div>{' '}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1> Welcome Back </h1>{' '}
              <p>
                To keep connected with us please login with your personal info{' '}
              </p>{' '}
              <button className="ghost" id="signIn" onClick={load}>
                Sign In{' '}
              </button>{' '}
            </div>{' '}
            <div className="overlay-panel overlay-right">
              <h1> Hello, Friend </h1>{' '}
              <p> Enter your personal details and start journey with us </p>{' '}
              <button className="ghost" id="signUp" onClick={load}>
                Sign Up{' '}
              </button>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
}

export default Sign;
