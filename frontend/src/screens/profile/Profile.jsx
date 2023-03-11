import React, { useContext } from 'react';
import { store } from '../../store';

const Profile = () => {
  const { state, disPatch } = useContext(store);
  const { user } = state;

  const signoutHandler = () => {
    disPatch({ type: 'SIGN_OUT' });
    localStorage.removeItem('user');
    localStorage.removeItem('candy_crush');
    localStorage.removeItem('typing_speed');
    localStorage.removeItem('leaderboard');
  };

  return (
    <div className="profile">
      <button onClick={signoutHandler}>Sign-Out</button>
    </div>
  );
};

export default Profile;
