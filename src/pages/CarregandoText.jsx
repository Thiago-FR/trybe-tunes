import React from 'react';
import PropTypes from 'prop-types';
import '../css/Carregando.css';

class CarregandoText extends React.Component {
  render() {
    const { header, Album } = this.props;
    const carregando = 'Carregando...';
    return (
      <div>
        { header === 'header' && <p className="on-header">{ carregando }</p>}
        { Album === 'album' && <p className="on-album">{ carregando }</p>}
        { header === '' && Album === '' && <p className="off-header">{ carregando }</p>}
      </div>
    );
  }
}

CarregandoText.propTypes = {
  header: PropTypes.string,
  Album: PropTypes.string,
};

CarregandoText.defaultProps = {
  header: '',
  Album: '',
};

export default CarregandoText;
