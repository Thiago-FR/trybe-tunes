import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import CarregantoText from './CarregandoText';
import InputProfile from '../components/InputProfile';
import '../css/ProfileEdit.css';
import IMG_USER from '../img/perfil2.png';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      email: '',
      image: '',
      loadding: false,
      isBtnDisabled: true,
      save: false,
      nameCheck: false,
      emailCheck: false,
      descriptionCheck: false,
    };
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = async () => {
    this.setState({ loadding: true });
    const { name, email, image, description } = await getUser();
    this.setState({ loadding: false, name, email, image, description }, () => {
      this.checkBtnSave();
      this.checkImage();
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.checkBtnSave());
  }

  checkEmail = () => {
    const { email } = this.state;
    return (email.includes('@') && email.includes('.com'));
  }

  checkInputs = () => {
    const { name, email, image, description } = this.state;
    if (name !== ''
      && email !== ''
      && image !== ''
      && description !== '') return true;
    return false;
  }

  checkBtnSave = () => {
    const checkInputs = this.checkInputs();
    const checkEmail = this.checkEmail();
    this.setState({ isBtnDisabled: !(checkInputs && checkEmail) }, () => {
      this.checkValidation();
    });
  }

  checkValidation = () => {
    const { name, description } = this.state;
    let nameValidation = false;
    let emailValidation = false;
    let descriptionValidation = false;
    if (name !== '') nameValidation = true;
    if (this.checkEmail()) emailValidation = true;
    if (description !== '') descriptionValidation = true;
    this.setState({
      nameCheck: nameValidation,
      emailCheck: emailValidation,
      descriptionCheck: descriptionValidation,
    });
  }

  saveInfo = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ loadding: true });
    await updateUser({ name, email, image, description });
    this.setState({ loadding: false, save: true });
  }
  // image default

  checkImage = () => {
    const { image } = this.state;
    if (image === '') this.setState({ image: IMG_USER });
  }

  render() {
    const { loadding, name, email, image, description, save, isBtnDisabled,
      nameCheck, emailCheck, descriptionCheck } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loadding && <CarregantoText />}
        { !loadding && (
          <InputProfile
            name={ name }
            email={ email }
            image={ image }
            isBtnDisabled={ isBtnDisabled }
            description={ description }
            saveInfo={ this.saveInfo }
            handleChange={ this.handleChange }
            nameCheck={ nameCheck }
            emailCheck={ emailCheck }
            descriptionCheck={ descriptionCheck }
          />
        ) }
        { save && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
