import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import CarregandoText from './CarregandoText';
import '../css/Login.css';
import IMG_LOGO from '../img/logo2.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      disableBtn: true,
      loadding: false,
      logado: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.checkBtn());
  }

  checkBtn = () => {
    const MAX_CHAR = 3;
    const { name } = this.state;
    this.setState({ disableBtn: name.length < MAX_CHAR });
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ loadding: true });
    await createUser({ name });
    this.setState({ loadding: false, logado: true });
  }

  render() {
    const { disableBtn, loadding, logado } = this.state;
    return (
      <div data-testid="page-login" className="login-container">
        <img className="login-img" src={ IMG_LOGO } alt="logo trybetunes" />
        <div className="login-contex">
          <input
            data-testid="login-name-input"
            className="input-login"
            name="name"
            type="text"
            placeholder="Nome"
            onChange={ this.handleChange }
            autoComplete="off"
          />
          <button
            data-testid="login-submit-button"
            className="btn-login"
            type="button"
            disabled={ disableBtn }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
        { loadding && <CarregandoText /> }
        { logado && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
