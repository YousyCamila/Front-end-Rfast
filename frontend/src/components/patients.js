import React, { useEffect, useState } from 'react';
import Navbar from './navbar';

function Patients() {
    const [pacientes, setPacientes] = useState([]);
    const [nuevoPaciente, setNuevoPaciente] = useState({ nombre: '', direccion: '', email: '', telefono: '' });

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        const response = await fetch('http://localhost:3000/api/pacientes');
        const data = await response.json();
        setPacientes(data);
    };

    const handleChange = (e) => {
        setNuevoPaciente({ ...nuevoPaciente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:3000/api/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoPaciente),
        });
        fetchPacientes();
        setNuevoPaciente({ nombre: '', direccion: '', email: '', telefono: '' });
    };

    const handleDelete = async (email) => {
        await fetch(`http://localhost:3000/api/pacientes/${email}`, {
            method: 'DELETE',
        });
        fetchPacientes();
    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit} className="mb-3">
                <input 
                    type="text" 
                    name="nombre" 
                    placeholder="Nombre" 
                    value={nuevoPaciente.nombre} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="direccion" 
                    placeholder="Dirección" 
                    value={nuevoPaciente.direccion} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Correo Electrónico" 
                    value={nuevoPaciente.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="telefono" 
                    placeholder="Teléfono" 
                    value={nuevoPaciente.telefono} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit" className="btn btn-success">Agregar Paciente</button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Correo Electrónico</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(paciente => (
                        <tr key={paciente.email}>
                            <td>{paciente.nombre}</td>
                            <td>{paciente.direccion}</td>
                            <td>{paciente.email}</td>
                            <td>{paciente.telefono}</td>
                            <td>
                                <button 
                                    className="btn btn-primary me-2"
                                    onClick={() => alert('Función para modificar (no implementada)')}
                                >
                                    Modificar
                                </button>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(paciente.email)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Patients;
