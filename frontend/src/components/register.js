import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Registro exitoso');
                navigate('/login'); // Redirigir a login después del registro
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <form style={{ width: '80%', maxWidth: '400px' }} onSubmit={handleRegister}>
                <div className="header-text mb-4 text-center">
                    <h2>Registrarse</h2>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        className="form-control form-control-lg bg-light fs-6"
                        id="username"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        className="form-control form-control-lg bg-light fs-6"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
