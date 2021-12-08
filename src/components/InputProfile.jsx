import React from 'react';
import PropTypes from 'prop-types';
import IMG_USER from '../img/perfil2.png';

class InputProfile extends React.Component {
  render() {
    const { name, email, image, description, isBtnDisabled, saveInfo,
      handleChange, nameCheck, emailCheck, descriptionCheck } = this.props;
    return (
      <div className="edit-profile-container">
        <div className="edit-profile-container-img">
          <img
            className="edit-profile-img"
            src={ image === IMG_USER ? IMG_USER : image }
            alt=""
          />
          <input
            data-testid="edit-input-image"
            name="image"
            value={ image === IMG_USER ? '' : image }
            onChange={ handleChange }
            type="text"
          />
        </div>
        <div className="edit-profile-inputs">
          <div>
            <p>Name</p>
            <div className="basic-input">
              <input
                data-testid="edit-input-name"
                className={ `input-profile-${nameCheck}` }
                name="name"
                value={ name }
                onChange={ handleChange }
                placeholder="Name"
                autoComplete="off"
                type="text"
              />
              <div className={ `span-profile-${nameCheck}` }> </div>
            </div>
          </div>
          <div>
            <p>E-mail</p>
            <div className="basic-input">
              <input
                data-testid="edit-input-email"
                className={ `input-profile-${emailCheck}` }
                name="email"
                value={ email }
                onChange={ handleChange }
                placeholder="usuario@usuario.com"
                autoComplete="off"
                type="text"
              />
              <div className={ `span-profile-${emailCheck}` }> </div>
            </div>
          </div>
          <div>
            <p>Description</p>
            <div className="basic-input">
              <textarea
                data-testid="edit-input-description"
                name="description"
                className={ `input-profile-${descriptionCheck}` }
                value={ description }
                onChange={ handleChange }
                placeholder="Sobre Mim"
                autoComplete="off"
                cols="30"
                rows="10"
              />
              <div className={ `span-profile-${descriptionCheck}` }> </div>
            </div>
          </div>
        </div>
        <button
          data-testid="edit-button-save"
          type="button"
          disabled={ isBtnDisabled }
          onClick={ saveInfo }
        >
          Salvar
        </button>
      </div>
    );
  }
}

InputProfile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  isBtnDisabled: PropTypes.bool.isRequired,
  saveInfo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  nameCheck: PropTypes.bool.isRequired,
  emailCheck: PropTypes.bool.isRequired,
  descriptionCheck: PropTypes.bool.isRequired,
};

InputProfile.defaultProps = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export default InputProfile;
