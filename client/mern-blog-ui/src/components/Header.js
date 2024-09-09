import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

import './styles/Header.css';
import GLobalSearch from './GlobalSearch';
import UserMenu from './UserMenu';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: "include",
        }).then(resp => {
            resp.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logoutUser() {
        fetch("http://localhost:4000/logout", {
            method: "POST",
            credentials: "include"
        }).then(() => {
            setUserInfo(null);
        });
    }

    const username = userInfo?.username;
    const firstName = userInfo?.firstName;
    const lastName = userInfo?.lastName;
    const profilePic = userInfo?.profilePic;

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="logo.png" alt="Logo" />
                </Link>
                <GLobalSearch />
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#resources">Resources</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                </ul>
            </nav>
            {username
                ?
                <div className="auth-buttons">
                    <Link to={"/create_post"}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write">
                                <path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path>
                                <path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path>
                            </svg>
                            <div className="dw l">Write</div>
                        </div>
                    </Link>
                    <ThemeSwitcher />
                    <UserMenu username={firstName} profilePic={profilePic} logoutUser={logoutUser} />
                </div>
                :
                <div className="auth-buttons">
                    <ThemeSwitcher />
                    <Link to={"/login"} className="login">Log in</Link>
                    <Link to={"/register"} className="signup">Sign up</Link>
                </div>
            }
        </header>
    );
}
