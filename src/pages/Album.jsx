import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../css/Album.css';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      nameArtsta: '',
      image: '',
      collectionName: '',
      resultado: [],
      pageOn: true,
    };
  }

  componentDidMount() {
    this.searchId();
  }

  searchId = async () => {
    const { id } = this.state;
    const result = await getMusics(id);
    if (!result || result.length === 0) {
      this.setState({ pageOn: false });
      return;
    }
    this.setState({
      nameArtsta: result[0].artistName,
      image: result[0].artworkUrl100,
      collectionName: result[0].collectionName,
      resultado: [...result],
      pageOn: true });
  }

  render() {
    const { nameArtsta, resultado, image, collectionName, pageOn } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-container">
          <div className="album-context">
            <img src={ image } alt={ `album ${nameArtsta}` } />
            <p className="album-name-collection" data-testid="album-name">
              {collectionName}
            </p>
            <p className="album-artist-name" data-testid="artist-name">
              {nameArtsta}
            </p>
          </div>
          <MusicCard albuns={ resultado } Album="album" />
        </div>
        { !pageOn && <Redirect to="/not/found" />}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

Album.defaultProps = {
  id: '',
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: {},
    path: '',
    url: '',
  }),
};

export default Album;
