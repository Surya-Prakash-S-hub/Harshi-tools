import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="notfound-page">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>

        <h2 className="notfound-subtitle">
          Well... this page went on vacation. 🏖️
        </h2>

        <p className="notfound-lead">We searched everywhere...</p>

        <div className="notfound-copy">
          <p>Under the keyboard.</p>
          <p>Behind the monitor.</p>
          <p>
            Even inside <code className="text-warning" >node_modules</code>.
          </p>
          <p>Nope. Still missing.</p>
        </div>

        <hr className="notfound-divider" />

        <h5 className="notfound-heading">Possible reasons:</h5>

        <p className="notfound-reasons">
          • You typed the URL while half asleep.
          <br />• I accidentally forgot to create this page.
          <br />• The page converted itself into another format.
          <br />• The internet is playing hide and seek.
        </p>

        <blockquote className="notfound-blockquote">
          <p>"404 — The page is as real as my motivation on Monday morning."</p>
        </blockquote>

        <Link to="/" className="notfound-button">
          Take Me Home
        </Link>

        <p className="notfound-note">
          If you somehow found this page intentionally... congratulations,
          you're a professional explorer. 🧭
        </p>
      </div>
    </section>
  );
};

export default NotFound;
