import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import CarregantoText from '../pages/CarregandoText';
import '../css/Header.css';
import IMG_LOGO from '../img/logo.png';
import IMG_USER from '../img/perfil2.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
      loadding: false,
    };
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = async () => {
    this.setState({ loadding: true });
    const { name, image } = await getUser();
    this.setState({
      loadding: false,
      name,
      image: image === '' ? IMG_USER : image,
    });
  }

  render() {
    const { name, image, loadding } = this.state;
    return (
      <header data-testid="header-component">
        <div className="header-logo">
          <img className="img-logo" src={ IMG_LOGO } alt="" />
          <div>
            { loadding && <CarregantoText header="header" /> }
            { !loadding && (
              <div className="header-user">
                <img className="img-user" src={ image } alt="" />
                <span className="name-user" data-testid="header-user-name">{name}</span>
              </div>
            )}
          </div>
        </div>
        <nav>
          <Link className="header-link" data-testid="link-to-search" to="/search">
            Search
          </Link>
          <Link className="header-link" data-testid="link-to-favorites" to="/favorites">
            Favorite
          </Link>
          <Link className="header-link" data-testid="link-to-profile" to="/profile">
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
