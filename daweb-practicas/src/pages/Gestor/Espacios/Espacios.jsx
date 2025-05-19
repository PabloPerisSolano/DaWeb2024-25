import React, { useState, useEffect } from "react";
import { API_ROUTES } from "../../../api/api";
import EspacioGestorCard from "./EspacioGestorCard";
import ModalEditar from "./ModalEditar";

const ListadoEspacios = () => {
    const [espacios, setEspacios] = useState([]);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);

    useEffect(() => {
        fetchEspacios();
    }, []);

    const fetchEspacios = async () => {
        const response = await fetch("URI", {
            credentials: "include",
        });
        const data = await response.json();
        setEspacios(data);
    };

    const handleEditar = (espacio) => {
        setEspacioSeleccionado(espacio);
        setShowModalEditar(true);
    };

    const confirmarEdicion = async (datosActualizados) => {
        await fetch("URI", {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosActualizados),
        });
        setShowModalEditar(false);
        fetchEspacios();
    };

    const cambiarEstadoEspacio = async (idEspacioFisico) => {
            await fetch("URI", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    };

    return (
        <div className="container">
            <div className="row mt-4">
                {espacios.map((espacio) => (
                    <EspacioGestorCard
                        key={espacio.id}
                        espacio={espacio}
                        onEditar={handleEditar}
                    />
                ))}
            </div>

            {showModalEditar && (
                <ModalEditar
                    onHide={() => setShowModalEditar(false)}
                    espacio={espacioSeleccionado}
                    onConfirm={confirmarEdicion}
                    onCambiarEstado={cambiarEstadoEspacio}
                />
            )}
        </div>
    );
};

export default ListadoEspacios;