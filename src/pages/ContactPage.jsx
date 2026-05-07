import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getContactById } from "../services/api";
import "../index.css";
 
const ContactDetail = () => {
    const { contactId } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
 
    const loadContact = async () => {
        try {
            const found = await getContactById(contactId);
            setContact(found);
        } catch (error) {
            console.error("Error fetching contact:", error);
        } finally {
            setLoading(false);
        }
    };
 
    useEffect(() => {
        loadContact();
    }, [contactId]);

    if (loading) {
        return (
            <div className="page-wrapper page-wrapper--centered">
                <div className="spinner-border spinner-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!contact) {
        return (
            <div className="page-wrapper page-wrapper--centered">
                <div className="text-center">
                    <i className="fas fa-user-slash empty-icon mb-3 d-block"></i>
                    <p className="text-muted">Contact not found.</p>
                    <Link to="/" className="back-link text-decoration-none small">
                        <i className="fas fa-arrow-left me-1"></i>
                        Back to contacts
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper page-wrapper--centered">
            <div className="page-content page-content--narrow">
                <div className="card border-0 p-4 app-card text-center">

                    <div className="mb-3">
                        <img
                            src={`https://i.pravatar.cc/150?u=${contact.id}`}
                            alt={contact.name}
                            className="rounded-circle detail-avatar"
                        />
                    </div>

                    <h3 className="fw-bold mb-4 page-title">{contact.name}</h3>

                    <div className="d-flex flex-column gap-3 mb-4">
                        <div className="detail-row d-flex align-items-center p-3">
                            <div className="detail-row-icon d-flex align-items-center justify-content-center rounded-circle me-3">
                                <i className="fas fa-map-marker-alt text-white"></i>
                            </div>
                            <div className="text-start">
                                <p className="mb-0 small text-muted text-uppercase fw-semibold">Address</p>
                                <p className="mb-0 fw-medium">{contact.address}</p>
                            </div>
                        </div>

                        <div className="detail-row d-flex align-items-center p-3">
                            <div className="detail-row-icon d-flex align-items-center justify-content-center rounded-circle me-3">
                                <i className="fas fa-phone text-white"></i>
                            </div>
                            <div className="text-start">
                                <p className="mb-0 small text-muted text-uppercase fw-semibold">Phone</p>
                                <p className="mb-0 fw-medium">{contact.phone}</p>
                            </div>
                        </div>

                        <div className="detail-row d-flex align-items-center p-3">
                            <div className="detail-row-icon d-flex align-items-center justify-content-center rounded-circle me-3">
                                <i className="fas fa-envelope text-white"></i>
                            </div>
                            <div className="text-start">
                                <p className="mb-0 small text-muted text-uppercase fw-semibold">Email</p>
                                <p className="mb-0 fw-medium">{contact.email}</p>
                            </div>
                        </div>
                    </div>

                    <Link
                        to={`/edit-contact/${contact.id}`}
                        className="btn btn-save w-100 text-white fw-semibold py-3 text-decoration-none mb-3"
                    >
                        <i className="fas fa-pencil-alt me-2"></i>
                        Edit Contact
                    </Link>

                    <Link to="/" className="text-decoration-none small back-link">
                        <i className="fas fa-arrow-left me-1"></i>
                        or get back to contacts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactDetail;