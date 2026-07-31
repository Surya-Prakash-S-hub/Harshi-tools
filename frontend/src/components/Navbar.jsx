import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );


  useEffect(() => {

    document.documentElement.setAttribute(
      "data-bs-theme",
      theme
    );

    localStorage.setItem("theme", theme);

  }, [theme]);


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-4"
          to={'/'}
        >
          Harshi<span className="text-primary">Tools</span>
        </Link>


        <div className="d-flex gap-3">

          <Link to={'/about'} className="btn btn-outline-secondary">
            About
          </Link>


          {/* Tools Dropdown */}
          <div className="dropdown">

            <button
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Tools
            </button>

            <ul className="dropdown-menu dropdown-menu-end">

              <li>
                <Link
                  className="dropdown-item"
                  to={'/'}
                >
                  Image Converter
                </Link>
              </li>

            </ul>

          </div>



          {/* Theme Dropdown */}
          <div className="dropdown">

            <button
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              {theme === "dark" ? "🌙 Dark" : "☀ Light"}
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


        </div>

      </div>
    </nav>
  );
};


export default Navbar;