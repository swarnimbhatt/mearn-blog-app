import React from 'react';
import PropTypes from 'prop-types';
import './styles/UserAvatar.css'; // Optional: for styling

const UserAvatar = ({ src, alt, initials, onClick }) => {
  const hasImage = src && src.trim().length > 0;

  return (
    <div className="user-avatar" onClick={onClick}>
      {hasImage ? (
        <img src={src} alt={alt} className="avatar-image" />
      ) : (
        <div className="avatar-initials">{initials}</div>
      )}
    </div>
  );
};

UserAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  initials: PropTypes.string,
  onClick: PropTypes.func
};

UserAvatar.defaultProps = {
  src: '',
  alt: 'User Avatar',
  initials: 'NA',
  onClick: () => {}
};

export default UserAvatar;
