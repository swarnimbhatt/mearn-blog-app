import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

export default function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);

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
    }

    const username = userInfo?.username;

    return (
        <header>
            <a href="/" className="logo">MyBlog</a>
            <nav>
                {username && (
                    <>
                        <span>{username}</span>
                        <a href="/create_post">Create new post</a>
                        <a onClick={logoutUser}>logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </>
                )}
            </nav>
        </header>
    )
}