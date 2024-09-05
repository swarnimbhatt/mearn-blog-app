import { useState } from 'react';
import '../styles/RegisterPage.css'; 

export default function Register() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function registerUser(e) {
        e.preventDefault();
        setError('');

        if (formState.password !== formState.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const resp = await fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify({
                firstName: formState.firstName,
                lastName: formState.lastName,
                username: formState.email,
                password: formState.password
            }),
            headers: { "Content-Type": "application/json" }
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
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
