import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <form style={{ width: '80%', maxWidth: '400px' }}>
                <div className="header-text mb-4 text-center">
                    <h2>Login</h2>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        className="form-control form-control-lg bg-light fs-6"
                        id="username"
                        placeholder="Usuario"
                        autoComplete="on"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        className="form-control form-control-lg bg-light fs-6"
                        id="password"
                        placeholder="Contraseña"
                        autoComplete="on"
                    />
                </div>
                <Link to='/home'
                    type="submit"
                    className="btn btn-primary w-100"
                >
                    Iniciar Sesión
                </Link>
                <div className="row mt-3">
                    <small>
                        ¿No tiene una cuenta? <Link to="/register">Registrarse</Link>
                    </small>
                </div>
            </form>
        </div>
    );
}

export default Login;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await fetch('http://tu-api.com/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 console.log('Login exitoso:', data);
//                 navigate('/home');
//             } else {
//                 console.error('Error en el inicio de sesión:', data.message);
//             }
//         } catch (error) {
//             console.error('Error de red:', error);
//         }
//     };

//     return (
//         <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
//             <form style={{ width: '80%', maxWidth: '400px' }} onSubmit={handleSubmit}>
//                 <div className="header-text mb-4 text-center">
//                     <h2>Login</h2>
//                 </div>
//                 <div className="form-group mb-3">
//                     <label htmlFor="username">Usuario</label>
//                     <input
//                         type="text"
//                         className="form-control form-control-lg bg-light fs-6"
//                         id="username"
//                         placeholder="Usuario"
//                         autoComplete="on"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group mb-3">
//                     <label htmlFor="password">Contraseña</label>
//                     <input
//                         type="password"
//                         className="form-control form-control-lg bg-light fs-6"
//                         id="password"
//                         placeholder="Contraseña"
//                         autoComplete="on"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">
//                     Iniciar Sesión
//                 </button>
//                 <div className="row mt-3">
//                     <small>
//                         ¿No tiene una cuenta? <Link to="/register">Registrarse</Link>
//                     </small>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Login;