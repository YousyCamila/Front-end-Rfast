import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Swal from 'sweetalert2';

function Patients() {
    const [pacientes, setPacientes] = useState([]);
    const [nuevoPaciente, setNuevoPaciente] = useState({
        nombre: '',
        direccion: '',
        email: '',
        telefono: '',
        fechaNacimiento: '',
    });
    const [editando, setEditando] = useState(false);
    const [emailOriginal, setEmailOriginal] = useState('');

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/pacientes');
            const data = await response.json();
            setPacientes(data);
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
        }
    };

    const handleChange = (e) => {
        setNuevoPaciente({ ...nuevoPaciente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editando 
                ? `http://localhost:3000/api/pacientes/${emailOriginal}` 
                : 'http://localhost:3000/api/pacientes';
            const method = editando ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoPaciente),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al guardar el paciente');
            }

            await fetchPacientes();
            resetForm();
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const resetForm = () => {
        setNuevoPaciente({ nombre: '', direccion: '', email: '', telefono: '', fechaNacimiento: '' });
        setEditando(false);
        setEmailOriginal('');
    };

    const handleEdit = (paciente) => {
        setNuevoPaciente(paciente);
        setEditando(true);
        setEmailOriginal(paciente.email);
    };

    const handleDelete = async (email) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:3000/api/pacientes/${email}`, {
                    method: 'DELETE',
                });
                fetchPacientes();
                Swal.fire('Eliminado!', 'El paciente ha sido eliminado.', 'success');
            } catch (error) {
                console.error('Error al eliminar paciente:', error);
            }
        }
    };

    const handleDetails = (paciente) => {
        Swal.fire({
            title: 'Detalles del Paciente',
            html: `
                <strong>Nombre:</strong> ${paciente.nombre}<br>
                <strong>Fecha de Nacimiento:</strong> ${new Date(paciente.fechaNacimiento).toLocaleDateString()}<br>
                <strong>Dirección:</strong> ${paciente.direccion}<br>
                <strong>Correo Electrónico:</strong> ${paciente.email}<br>
                <strong>Teléfono:</strong> ${paciente.telefono}
            `,
            icon: 'info',
            confirmButtonText: 'Cerrar',
        });
    };

    return (
        <div>
            <Navbar />
            <div style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
                margin: 'auto'
            }}>
                <h2 className="text-center">{editando ? 'Modificar Paciente' : 'Agregar Paciente'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="nombre" 
                        className="form-control" 
                        placeholder="Nombre" 
                        value={nuevoPaciente.nombre} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="date" 
                        name="fechaNacimiento" 
                        className="form-control" 
                        value={nuevoPaciente.fechaNacimiento} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="direccion" 
                        className="form-control" 
                        placeholder="Dirección" 
                        value={nuevoPaciente.direccion} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        placeholder="Correo Electrónico" 
                        value={nuevoPaciente.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="telefono" 
                        className="form-control" 
                        placeholder="Teléfono" 
                        value={nuevoPaciente.telefono} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit" className="btn btn-success mt-3">
                        {editando ? 'Modificar Paciente' : 'Agregar Paciente'}
                    </button>
                    {editando && <button type="button" className="btn btn-secondary mt-3" onClick={resetForm}>Cancelar</button>}
                </form>
            </div>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha de Nacimiento</th>
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
                            <td>{new Date(paciente.fechaNacimiento).toLocaleDateString()}</td>
                            <td>{paciente.direccion}</td>
                            <td>{paciente.email}</td>
                            <td>{paciente.telefono}</td>
                            <td>
                                <button 
                                    className="btn btn-info me-2"
                                    onClick={() => handleDetails(paciente)}
                                >
                                    Ver Detalles
                                </button>
                                <button 
                                    className="btn btn-primary me-2"
                                    onClick={() => handleEdit(paciente)}
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

