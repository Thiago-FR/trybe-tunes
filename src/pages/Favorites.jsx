import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import '../css/Favorite.css';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorite-container-page">
          <MusicCard />
        </div>
      </div>
    );
  }
}

export default Favorites;
