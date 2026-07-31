import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container py-5 text-center">
      <h1 className="display-1 fw-bold">404</h1>

      <h2 className="mb-3">Well... this page went on vacation. 🏖️</h2>

      <p className="lead">We searched everywhere...</p>

      <p>
        Under the keyboard.
        <br />
        Behind the monitor.
        <br />
        Even inside <code>node_modules</code>.<br />
        Nope. Still missing.
      </p>

      <hr className="my-4" />

      <h5>Possible reasons:</h5>

      <p>
        • You typed the URL while half asleep.
        <br />
        • I accidentally forgot to create this page.
        <br />
        • The page converted itself into another format.
        <br />• The internet is playing hide and seek.
      </p>

      <blockquote className="blockquote mt-4">
        <p>"404 — The page is as real as my motivation on Monday morning."</p>
      </blockquote>

      <Link to="/" className="btn btn-primary mt-4">
        Take Me Home
      </Link>

      <p className="text-muted mt-5">
        If you somehow found this page intentionally... congratulations, you're
        a professional explorer. 🧭
      </p>
    </section>
  );
};

export default NotFound;
