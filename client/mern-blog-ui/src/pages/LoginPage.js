import {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const {setUserInfo} = useContext(UserContext);

    async function loginUser(e) {
        e.preventDefault();
        const resp = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (resp.status == 200) {
            resp.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
            
        }
        else {
            alert("Login failed. Please try again later.")
        }
    }
    if(redirect){
        return <Navigate to={"/"} />;
    }

    return (
        <form onSubmit={loginUser}>
             <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
             <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button>login</button>
        </form>
    );
}