import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <form style={{ width: '80%', maxWidth: '400px' }}>
                <div className="header-text mb-4 text-center">
                    <h2>Registro</h2>
                </div>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="Usuario"
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="password"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="Contraseña"
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="password"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="Confirmar contraseña"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                    Registrarse
                </button>
                <Link to='/login' className="btn btn-secondary w-100">
                    Ir al Login
                </Link>
            </form>
        </div>
    );
}

export default Register;