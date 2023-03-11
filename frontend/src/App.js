import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../src/screens/home/Home';
import Game from '../src/screens/game/Game';
import Profile from '../src/screens/profile/Profile';
import Leaderboard from '../src/screens/leaderboard/Leaderboard';
import Logo from '../src/assets/logo.png';
import { useContext, useEffect } from 'react';
import { store } from './store';
import TypingSpeed from './screens/game/TypingSpeed';
import CandyCrush from './screens/game/CandyCrush';
import Sudoku from './screens/game/Sudoku';
import Sign from './screens/authenticate/Sign';

function App() {
  const { state, disPatch } = useContext(store);
  const { user } = state;

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <nav className="navbar">
            <div className="nav-brand">
              <Link to="/">
                {' '}
                <img src={Logo} alt="logo" />
              </Link>{' '}
            </div>{' '}
            <div className="nav-items">
              <div className="nav-item">
                <Link to="/"> Home </Link>{' '}
              </div>{' '}
              <div className="nav-item">
                <Link to="/games"> Games </Link>{' '}
              </div>{' '}
              <div className="nav-item">
                <Link to="/leaderboard"> Leaderboard </Link>{' '}
              </div>{' '}
              <div className="nav-item">
                <a href="#help"> Help </a>{' '}
              </div>{' '}
            </div>{' '}
            <div>
              {user == null ? (
                <Link to={'/sign'}>
                  <div className="login">LOGIN</div>
                </Link>
              ) : (
                <Link className="profile-pic" to={`/profile/`}>
                  <div className="profile-name"> {user.user.name} </div>{' '}
                  <i className="fa-solid fa-circle-user"> </i>{' '}
                </Link>
              )}
            </div>{' '}
          </nav>{' '}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />{' '}
            <Route path="/sign" element={<Sign />} />
            <Route path="/games" element={<Game />} />{' '}
            <Route path="/profile/:profileid" element={<Profile />} />{' '}
            <Route path="/leaderboard" element={<Leaderboard />} />{' '}
            <Route path="/game/typo" element={<TypingSpeed />} />{' '}
            <Route path="/game/candycrush" element={<CandyCrush />} />{' '}
            <Route path="/game/sudoku" element={<Sudoku />} />{' '}
          </Routes>{' '}
        </main>{' '}
      </div>{' '}
    </BrowserRouter>
  );
}

export default App;
