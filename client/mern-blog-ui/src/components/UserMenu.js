import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaQuestionCircle, FaBookmark, FaRegFileAlt } from 'react-icons/fa';
import './styles/UserMenu.css'; // Optional: for styling
import UserAvatar from './UserAvatar';

const UserMenu = ({username, profilePic, logoutUser}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-menu">
      <div className="user-avatar" onClick={toggleMenu}>
          <UserAvatar
              initials={username[0].toUpperCase()}
              src={profilePic}
              alt=""
              onClick={() => console.log('Avatar with initials clicked!')}
          />
      </div>
      {isOpen && (
        <div className="menu-dropdown">
          <ul>
            <li><FaUser /> Profile</li>
            <li><FaRegFileAlt /> My Posts</li>
            <li><FaBookmark /> Saved Posts</li>
            <li><FaQuestionCircle /> Help</li>
            <li onClick={logoutUser}><FaSignOutAlt /> Sign Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
