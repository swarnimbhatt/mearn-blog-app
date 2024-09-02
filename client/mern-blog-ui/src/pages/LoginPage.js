import {useState} from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(e) {
        e.preventDefault();
        const resp = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (resp.status == 200) {
            alert("Login successfull.")
        }
        else {
            alert("Login failed. Please try again later.")
        }
    }

    return (
        <form onSubmit={loginUser}>
             <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
             <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button>login</button>
        </form>
    );
}