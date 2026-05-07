import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light px-4 py-3 app-navbar">
            <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
                <div className="navbar-icon d-flex align-items-center justify-content-center rounded-circle">
                    <i className="fas fa-address-book text-white"></i>
                </div>
                <span className="fw-bold navbar-title">ContactApp</span>
            </Link>
            <Link to="/add-contact" className="btn btn-nav-add d-flex align-items-center gap-2">
                <i className="fas fa-plus"></i>
                <span>Add new contact</span>
            </Link>
        </nav>
	);
};