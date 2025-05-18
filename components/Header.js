import { FaMoon, FaSun, FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <FaMusic className="icon" />
          <span>YT2MP3</span>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
