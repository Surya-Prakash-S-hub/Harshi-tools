import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="py-4 border bg-surface">
        <div className="text-text">
          <div className="flex align-middle justify-between lg:px-30">
            <div>
              <h5 className="mb-1 text-xl font-bold">
                Harshi<span className="text-primary">Tools</span>
              </h5>
              <p className="mb-1">
                Fast, secure and free online image conversion.
              </p>
            </div>
            <div>
              <NavLink className={`hover:text-text-secondary`} to={"/"}>Home</NavLink>
            </div>
          </div>
          <div className="text-center text-text-muted">
            © 2026 Image Toolkit. Built with React, Express & Sharp.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
