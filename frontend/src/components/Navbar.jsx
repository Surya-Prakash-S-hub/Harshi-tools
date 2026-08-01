import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Harshi<span className="text-primary">Tools</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto w-100 justify-content-lg-end mt-3 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Tools
                </Link>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/">
                      Convert Image
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={'/batch'}>
                      Batch Conversion
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item disabled" to="#">
                      Compress Images
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item disabled" to="#">
                      Resize Images
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                {/* Theme Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    {theme === "dark" ? "🌙 " : "☀"}
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setTheme("light")}
                      >
                        ☀ Light
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setTheme("dark")}
                      >
                        🌙 Dark
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setTheme("auto")}
                      >
                        💻 System
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
