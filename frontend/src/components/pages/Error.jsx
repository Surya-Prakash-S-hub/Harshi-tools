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
        ?
      </button>

      {show && (
        <div className="help-popover">
          <h6>Encounter any <span className="text-danger fs-5">error</span>?</h6>

          <p>
            If you face any issue, it may be because
            I am still working on the server side.
            Please try again after some time.
          </p>

          <span>
            Thanks for your patience 😊
          </span>
        </div>
      )}
    </div>
  );
};

export default ErrorHelp;