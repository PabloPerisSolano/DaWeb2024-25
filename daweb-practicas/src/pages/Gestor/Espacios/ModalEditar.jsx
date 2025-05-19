import React, { useState } from "react";

const ModalEditar = ({ onHide, espacio, onConfirm, onCambiarEstado }) => {

    const [formData, setFormData] = useState({
        nombre: "",
        capacidad: "",
        descripcion: "",
        estado: espacio.estado || "ACTIVO"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (formData.estado !== espacio.estado) {
            await onCambiarEstado(espacio.id);
        }
        
        await onConfirm({
            idEspacioFisico: espacio.id,
            nombre: formData.nombre || null,
            capacidad: formData.capacidad === "" ? null : parseInt(formData.capacidad),
            descripcion: formData.descripcion || null
        });
        
    };

    return(
        <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Reservar plazas</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />

                                <label className="form-label">
                                    Capacidad:
                                </label>
                                <input
                                    type="number"
                                    name="capacidad"
                                    className="form-control"
                                    min="1"
                                    value={formData.capacidad}
                                    onChange={handleChange}
                                />

                                <label className="form-label">
                                    Descripción:
                                </label>
                                <input
                                    type="text"
                                    name="descripcion"
                                    className="form-control"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                />

                                <label className="form-label">Estado:</label>
                                <select
                                    name="estado"
                                    className="form-select"
                                    value={formData.estado}
                                    onChange={handleChange}
                                >
                                    <option value="ACTIVO">Activo</option>
                                    <option value="CERRADO_TEMPORALMENTE">Cerrado Temporalmente</option>
                                </select>

                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEditar;