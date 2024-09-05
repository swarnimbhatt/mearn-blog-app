import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import '../styles/LoginPage.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    const { setUserInfo } = useContext(UserContext);

    async function loginUser(e) {
        e.preventDefault();
        setError('');

        const resp = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (resp.ok) {
            const userInfo = await resp.json();
            setUserInfo(userInfo);
            setRedirect(true);
        } else {
            setError("Login failed. Please check your credentials and try again.");
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={loginUser}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
}
