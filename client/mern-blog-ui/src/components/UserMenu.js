import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaQuestionCircle, FaBookmark, FaRegFileAlt } from 'react-icons/fa';
import './styles/UserMenu.css'; // Optional: for styling
import UserAvatar from './UserAvatar';

const UserMenu = ({username}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-menu">
      <div className="user-avatar" onClick={toggleMenu}>
        {/* Replace with your avatar image */}
        <UserAvatar
                            initials={username[0].toUpperCase()}
                            src=""
                            alt=""
                            onClick={() => console.log('Avatar with initials clicked!')}
                        />
      </div>
      {isOpen && (
        <div className="menu-dropdown">
          <ul>
            <li><FaUser /> Profile</li>
            <li><FaSignOutAlt /> Sign Out</li>
            <li><FaQuestionCircle /> Help</li>
            <li><FaRegFileAlt /> My Posts</li>
            <li><FaBookmark /> Saved Posts</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
