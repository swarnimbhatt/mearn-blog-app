import { useState } from 'react';
import '../styles/RegisterPage.css'; 

export default function Register() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        thumbnail: ''
    });
    const [error, setError] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        if(name!="thumbnail")
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
        else
        setFormState(prevState => ({
            ...prevState,
            [name]: e.target.files[0]
        }));
    }

    async function registerUser(e) {
        e.preventDefault();
        setError('');

        if (formState.password !== formState.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        const data = new FormData();
        data.set("firstName", formState.firstName);
        data.set("lastName", formState.lastName);
        data.set("username", formState.email);
        data.set("password", formState.password);
        data.set("file", formState.thumbnail);

        const resp = await fetch("http://localhost:4000/register", {
            method: "POST",
            body: data,
            // headers: { "Content-Type": "application/json" }
        });

        if (resp.ok) {
            alert("Registration successful.");
        } else {
            setError("Registration failed. Please try again later.");
        }
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <h1>Sign Up</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={registerUser}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formState.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formState.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formState.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formState.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="file"
                        name="thumbnail"
                        onChange={handleChange}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
