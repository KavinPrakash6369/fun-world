import { createContext, useContext, useReducer } from 'react';

export const store = createContext();

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  candyCrush: localStorage.getItem('candy_crush')
    ? JSON.parse(localStorage.getItem('candy_crush'))
    : null,
  typingSpeed: localStorage.getItem('typing_speed')
    ? JSON.parse(localStorage.getItem('typing_speed'))
    : null,
  Leaderboard: localStorage.getItem('leaderboard')
    ? JSON.parse(localStorage.getItem('leaderboard'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SIGN_UP':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        candyCrush: null,
        typingSpeed: null,
        Leaderboard: null,
      };

    case 'CANDY_CRUSH':
      localStorage.setItem('candy_crush', JSON.stringify(action.payload));
      return { ...state, candyCrush: action.payload };
    case 'TYPING_SPEED':
      localStorage.setItem('typing_speed', JSON.stringify(action.payload));
      return { ...state, typingSpeed: action.payload };
    case 'OVERALL_LEADERBOARD':
      localStorage.setItem('leaderboard', JSON.stringify(action.payload));
      return { ...state, Leaderboard: action.payload };

    default:
      return state;
  }
}

export function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <store.Provider value={value}> {props.children} </store.Provider>;
}
