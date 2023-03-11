import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="home-header"></section>
      {/* <section id="home-games"> </section> */}
      {/* <section className="home-payments"> </section> */}
      <Link className="Games-link" to={'/games'}>
        <div className="Games-button-div">
          <button>Explore Games</button>
        </div>
      </Link>
    </div>
  );
};

export default Home;
