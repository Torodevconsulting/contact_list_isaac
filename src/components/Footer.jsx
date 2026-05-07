import "../index.css";

export const Footer = () => (
	<footer className="app-footer">
		<div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-3 px-4">
			<div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
				<div className="footer-icon d-flex align-items-center justify-content-center rounded-circle">
					<i className="fas fa-address-book text-white"></i>
				</div>
				<span className="fw-bold footer-title">ContactApp</span>
			</div>

			<p className="mb-0 small footer-copy">
				Made with <i className="fas fa-heart footer-heart"></i> by Isaac Toro — 4Geeks Academy
			</p>
		</div>
	</footer>
);