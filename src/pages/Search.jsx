import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CarregandoText from './CarregandoText';
import '../css/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nameArtsta: '',
      disableBtn: true,
      loadding: false,
      resultado: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.checkBtn());
  }

  checkBtn = () => {
    const MAX_CHAR = 2;
    const { nameArtsta } = this.state;
    this.setState({ disableBtn: nameArtsta.length < MAX_CHAR });
  }

  checkClickBtn = async (event) => {
    event.preventDefault();
    const { nameArtsta } = this.state;
    this.setState({ loadding: true });
    const album = await searchAlbumsAPI(nameArtsta);
    this.setState({ loadding: false, resultado: [...album] });
  }

  render() {
    const { nameArtsta, disableBtn, loadding, resultado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="search-form" action="" onSubmit={ this.checkClickBtn }>
          <input
            data-testid="search-artist-input"
            className="form-search"
            type="text"
            name="nameArtsta"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            className="form-btn"
            type="button"
            disabled={ disableBtn }
            onClick={ this.checkClickBtn }
          >
            Pesquisar
          </button>
        </form>
        { loadding && <CarregandoText />}
        { !loadding && resultado.length !== 0 && (
          <div className="result-container">
            <p className="result-text">
              Resultado de álbuns de:
              { ' ' }
              { nameArtsta }
            </p>
            <div className="search-album-container">
              { !loadding && resultado
                .map(({ artistName, collectionId, collectionName, artworkUrl100 }, i) => (
                  <div key={ `${artistName}-${i}` } className="album">
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      className="link-album"
                      to={ `/album/${collectionId}` }
                      id={ collectionId }
                    >
                      <img src={ artworkUrl100 } alt={ collectionName } />
                      <p className="artist-name">{ artistName }</p>
                      <p className="collection-name">{ collectionName }</p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        ) }
        { !loadding && resultado.length === 0 && (
          <div className="found-search">
            <p>Nenhum álbum foi encontrado</p>
          </div>
        ) }
      </div>
    );
  }
}

export default Search;
