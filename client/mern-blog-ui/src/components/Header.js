import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
// import { useNavigate } from 'react-router-dom';

import './styles/Header.css';

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    // const navigate = useNavigate();
    
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
        });
        setUserInfo(null);
        // navigate("/");
    }

    const username = userInfo?.username;


    return (
        <header className="header">
            <div className="logo">
                <img src="logo.png" alt="Logo" />
                <h1>Untitled UI</h1>
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
                    <span>Welcome, {username} !</span>
                    <a href="/create_post">Create new post</a>
                    <button onClick={logoutUser} className="login">Log out</button>
                </div>
                : 
                <div className="auth-buttons">
                    <a href="/login" className="login">Log in</a>
                    <a  href="/register" className="signup">Sign up</a>
                </div>
            }
        </header>
      );
}