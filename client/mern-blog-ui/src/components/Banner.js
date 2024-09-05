import React from 'react';
import PropTypes from 'prop-types';
import './styles/Banner.css';

const Banner = ({ title, subtitle, buttonText, onButtonClick, className }) => {
  return (
    <div className={`banner ${className}`}>
      <div className="banner-content">
        <h1 className="banner-title">{title}</h1>
        {subtitle && <p className="banner-subtitle">{subtitle}</p>}
        {buttonText && (
          <button className="banner-button" onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  className: PropTypes.string
};

Banner.defaultProps = {
  subtitle: '',
  buttonText: '',
  onButtonClick: () => {},
  className: ''
};

export default Banner;
