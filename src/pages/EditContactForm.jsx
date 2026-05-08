import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getContactById, updateContact } from "../services/api";
import "../index.css";

const EditContactForm = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadContact = async () => {
        try {
            const contact = await getContactById(contactId);
            if (contact) {
                setFormData({
                    name: contact.name || "",
                    email: contact.email || "",
                    phone: contact.phone || "",
                    address: contact.address || "",
                });
            }
        } catch (error) {
            console.error("Error loading contact:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContact();
    }, [contactId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await updateContact(contactId, formData);
            navigate("/");
        } catch (error) {
            console.error("Error updating contact:", error);
            alert("Hubo un error al actualizar el contacto. Inténtalo de nuevo.");
        } finally {
            setSaving(false);
        }
    };

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
        <div className="page-wrapper page-wrapper--centered">
            <div className="page-content page-content--narrow">
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="header-icon d-inline-flex align-items-center justify-content-center rounded-circle mb-3">
                        <i className="fas fa-user-edit text-white fs-4"></i>
                    </div>
                    <h2 className="fw-bold mb-1 page-title">Edit contact</h2>
                    <p className="text-muted small">Update the contact details below</p>
                </div>

                <div className="card border-0 p-4 app-card">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-uppercase text-muted">
                                Full Name
                            </label>
                            <div className="input-group">
                                <span className="input-group-text border-0 input-bg">
                                    <i className="fas fa-user text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control border-0 input-bg"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-uppercase text-muted">
                                Email
                            </label>
                            <div className="input-group">
                                <span className="input-group-text border-0 input-bg">
                                    <i className="fas fa-envelope text-muted"></i>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control border-0 input-bg"
                                    placeholder="e.g. john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-uppercase text-muted">
                                Phone
                            </label>
                            <div className="input-group">
                                <span className="input-group-text border-0 input-bg">
                                    <i className="fas fa-phone text-muted"></i>
                                </span>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control border-0 input-bg"
                                    placeholder="e.g. (555) 123-4567"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold small text-uppercase text-muted">
                                Address
                            </label>
                            <div className="input-group">
                                <span className="input-group-text border-0 input-bg">
                                    <i className="fas fa-map-marker-alt text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control border-0 input-bg"
                                    placeholder="e.g. 123 Main Street"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-save w-100 text-white fw-semibold py-3"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    ></span>
                                    Updating...
                                </>
                            ) : (
                                "Update Contact"
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <Link to="/" className="text-decoration-none small back-link">
                            <i className="fas fa-arrow-left me-1"></i>
                            or get back to contacts
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditContactForm;