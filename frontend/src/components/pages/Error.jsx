import { useState } from "react";

const ErrorHelp = () => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="error-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button className="help-btn">
        <span >?</span>
      </button>

      {show && (
        <div className="help-popover bg-white shadow-shadow shadow-lg">
          <h6>
            Encounter any <span className="text-danger">error</span>?
          </h6>

          <p>
            If you face any issue, it may be because I am still working on the
            server side. Please try again after some time.
          </p>

          <span className="text-text-muted">Thanks for your patience 😊</span>
        </div>
      )}
    </div>
  );
};

export default ErrorHelp;
