import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import CarregandoText from '../pages/CarregandoText';
import '../css/MusicCard.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadding: false,
      favoriteList: [],
      favoritePage: false,
    };
  }

  componentDidMount() {
    this.checkFavoriteList();
    this.checkFavoritePage();
  }

  checkFavoritePage = () => {
    const { albuns } = this.props;
    if (!albuns) this.setState({ favoritePage: true });
  }

  checkFavoriteList = async () => {
    this.setState({ loadding: true });
    const result = await getFavoriteSongs();
    this.setState({ loadding: false, favoriteList: [...result] });
  }

  handleCheckbox = async (event, album) => {
    const { checked } = event.target;
    this.setState({ loadding: true });
    if (checked) {
      await addSong(album);
    } else {
      await removeSong(album);
    }
    this.checkFavoriteList();
  }

  checkBoxFavorite = (trackId) => {
    const { favoriteList } = this.state;
    return favoriteList.find((numId) => numId.trackId === trackId);
  }

  render() {
    const { loadding, favoriteList, favoritePage } = this.state;
    const { albuns = favoriteList, Album } = this.props;
    return (
      <div>
        {loadding && <CarregandoText Album={ Album } />}
        { albuns.map((album, i) => (
          <div key={ `${album.artistName}-${i}` }>
            { album.trackName && (
              <div className="album-complete">
                { favoritePage && (
                  <div className="album-phote">
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  </div>
                )}
                <div className="list-music-context">
                  <p className="list-name-artist">{album.trackName}</p>
                  <div className="audio-favorite-list">
                    <audio
                      data-testid="audio-component"
                      src={ album.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      <code>audio</code>
                    </audio>
                    <label
                      className="tw-heart-box"
                      htmlFor={ `${album.artistName}-${i}` }
                    >
                      <input
                        data-testid={ `checkbox-music-${album.trackId}` }
                        id={ `${album.artistName}-${i}` }
                        type="checkbox"
                        checked={ this.checkBoxFavorite(album.trackId) }
                        onChange={ (event) => this.handleCheckbox(event, album) }
                      />
                      <span className="tw-heart"> </span>
                    </label>
                  </div>
                </div>
              </div>
            ) }
          </div>
        )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.object),
  Album: PropTypes.string,
};

MusicCard.defaultProps = {
  albuns: undefined,
  Album: '',
};

export default MusicCard;
