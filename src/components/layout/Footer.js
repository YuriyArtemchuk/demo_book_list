import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link
          to="https://github.com/YuriyArtemchuk"
          target="_blank"
          rel="noopener noreferrer"
        >
          My GitHub
        </Link>

        <p>by Yuriy Artemchuk (c) 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
