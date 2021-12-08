import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import CarregantoText from './CarregandoText';
import '../css/Profile.css';
import IMG_USER from '../img/perfil2.png';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      email: '',
      image: '',
      loadding: false,
    };
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = async () => {
    this.setState({ loadding: true });
    const { name, email, image, description } = await getUser();
    console.log(image);
    this.setState({ loadding: false, name, email, image, description }, () => {
      this.checkImage(image);
    });
  }

  checkImage = () => {
    const { image } = this.state;
    if (image === '') this.setState({ image: IMG_USER });
  }

  render() {
    const { loadding, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loadding && <CarregantoText />}
        { !loadding && (
          <div className="profile-container">
            <div className="profile-img-link">
              <img
                data-testid="profile-image"
                className="profile-img"
                src={ image }
                alt={ name }
              />
              <Link className="link-edt-perfil" to="/profile/edit">Editar perfil</Link>
            </div>
            <div className="profile-input">
              <p className="profile-edit-contex">
                Name
                <span>{ ` ${name}` }</span>
              </p>
              <p className="profile-edit-contex">
                E-mail
                <span>{ ` ${email}` }</span>
              </p>
              <p className="profile-edit-contex">
                Description
                <span>{ ` ${description}` }</span>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
