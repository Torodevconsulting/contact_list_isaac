import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getContacts, deleteContact as deleteContactApi } from "../services/api";
import "../index.css";

const ContactPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadContacts = async () => {
        try {
            const data = await getContacts();
            setContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este contacto?");
        if (!confirmDelete) return;

        try {
            await deleteContactApi(id);
            setContacts((prev) => prev.filter((contact) => contact.id !== id));
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    if (loading) {
        return (
            <div className="page-wrapper page-wrapper--centered">
                <div className="spinner-border spinner-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper page-wrapper--top">
            <div className="page-content">
                <div className="text-center mb-4">
                    <div className="header-icon d-inline-flex align-items-center justify-content-center rounded-circle mb-3">
                        <i className="fas fa-address-book text-white fs-4"></i>
                    </div>
                    <h2 className="fw-bold mb-1 page-title">My Contacts</h2>
                    <p className="text-muted small">
                        {contacts.length} {contacts.length === 1 ? "contact" : "contacts"} in your agenda
                    </p>
                </div>

                {contacts.length === 0 ? (
                    <div className="card border-0 p-5 text-center app-card">
                        <i className="fas fa-user-slash mb-3 empty-icon"></i>
                        <p className="text-muted mb-0">No contacts yet. Add your first one!</p>
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                className="card border-0 p-3 d-flex flex-row align-items-center justify-content-between contact-card"
                            >
                                <Link to={`/contact/${contact.id}`} className="d-flex align-items-center text-decoration-none text-dark contact-link">
                                    <img
                                        src={`https://i.pravatar.cc/150?u=${contact.id}`}
                                        alt={contact.name}
                                        className="contact-avatar rounded-circle me-3"
                                    />
                                    <div>
                                        <h6 className="mb-1 fw-bold">{contact.name}</h6>
                                        <p className="mb-0 small text-muted">
                                            <i className="fas fa-map-marker-alt me-2 icon-accent"></i>
                                            {contact.address}
                                        </p>
                                        <p className="mb-0 small text-muted">
                                            <i className="fas fa-phone me-2 icon-accent"></i>
                                            {contact.phone}
                                        </p>
                                        <p className="mb-0 small text-muted">
                                            <i className="fas fa-envelope me-2 icon-accent"></i>
                                            {contact.email}
                                        </p>
                                    </div>
                                </Link>
                                <div className="d-flex gap-2">
                                    <Link
                                        to={`/edit-contact/${contact.id}`}
                                        className="btn btn-sm btn-action btn-action--edit"
                                        title="Editar contacto"
                                    >
                                        <i className="fas fa-pencil-alt small"></i>
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-action btn-action--delete"
                                        title="Eliminar contacto"
                                        onClick={() => handleDelete(contact.id)}
                                    >
                                        <i className="fas fa-trash-alt small"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactPage;