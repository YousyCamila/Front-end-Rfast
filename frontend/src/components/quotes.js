import React, { useState } from 'react';
import Navbar from './navbar';

function Quotes() {
    const [patients, setPatients] = useState([
        {
            id: 1,
            name: 'Juan Pérez',
            address: 'Calle Falsa 123',
            email: 'juan.perez@example.com',
            phone: '123456789',
            appointment: ''
        }
    ]);

    const [appointment, setAppointment] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleAppointmentChange = (e) => {
        setAppointment(e.target.value);
    };

    const handleAssignAppointment = () => {
        if (selectedPatient !== null) {
            const updatedPatients = patients.map((patient) => {
                if (patient.id === selectedPatient) {
                    return { ...patient, appointment };
                }
                return patient;
            });
            setPatients(updatedPatients);
            setAppointment('');
            setSelectedPatient(null);
        }
    };

    return (
        <div>
            <Navbar />
            <button className="btn btn-success mb-3">Agregar Paciente</button>
            <div className="mb-3">
                <label htmlFor="appointment" className="form-label">Asignar Cita:</label>
                <select
                    className="form-select"
                    value={selectedPatient || ''}
                    onChange={(e) => setSelectedPatient(Number(e.target.value))}
                >
                    <option value="">Seleccionar Paciente</option>
                    {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                            {patient.name}
                        </option>
                    ))}
                </select>
                <input
                    type="datetime-local"
                    className="form-control mt-2"
                    value={appointment}
                    onChange={handleAppointmentChange}
                />
                <button className="btn btn-primary mt-2" onClick={handleAssignAppointment}>
                    Asignar Cita
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Correo Electrónico</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Cita Asignada</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.address}</td>
                            <td>{patient.email}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.appointment || 'No asignada'}</td>
                            <td>
                                <button className="btn btn-primary me-2">Modificar</button>
                                <button className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Quotes;
