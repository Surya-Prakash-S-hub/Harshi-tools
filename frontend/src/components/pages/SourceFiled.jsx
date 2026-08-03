import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ErrorHelp from "./Error";
import DragDrop from "./DragnDrop";
const api = import.meta.env.VITE_API_URL;

const Home = () => {
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadurl, setDownloadUrl] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const imageOnChange = (files) => {
    const file = files[0];

    if (!file) return;

    setImage(file);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
  };

  const showDatas = async (e) => {
    e.preventDefault();

    if (!image || !format) return;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("format", format);

    try {
      setLoading(true);

      const response = await axios.post(`${api}/image-converter`, formData, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(response.data);

      setDownloadUrl(url);

      // Take original filename
      const originalName = image.name;

      // Remove old extension
      const fileName = originalName.replace(/\.[^/.]+$/, "");

      // Create new filename
      setImageName(`${fileName}.${format}`);
    } catch (error) {
      toast.error(error.message || "Error Occured");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  return (
    <>
      <section className="pt-3 Saas-features-block">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">Free Online Image Converter</h1>
            <p className="text-muted">
              Convert JPG, PNG, and WebP images instantly with a fast and secure
              online image conversion tool.
            </p>
          </div>
          <main
            className="card shadow-lg border-0 mx-auto p-4"
            style={{ maxWidth: "600px" }}
          >
            <form className="d-flex flex-column gap-4" onSubmit={showDatas}>
              <DragDrop
                accept="image/*"
                onFiles={imageOnChange}
                onDragStateChange={setDragging}
              >
                {!image ? (
                  <div className={`upload-box border ${dragging && `border-primary`}`}>
                    {dragging ? (<span className="text-primary fs-3">Drop Here</span>) : (<span>Drag and Drop</span>)}
                    <span>{dragging ? "" : "OR"}</span>
                    <span className="text-primary">{dragging ? "" : "Select File"}</span>
                  </div>
                ) : (
                  <div className={`image-container border p-3 rounded ${dragging ? `border-primary` : `border-primary-subtle`}`}>
                    <div className="image-card text-success border">
                      <img
                        src={preview}
                        alt={image.name}
                        className="image-image"
                      />{" "}
                      <div
                        className="image-text text-center"
                        title={image.name}
                      >
                        <span className="small">{image.name}</span>
                      </div>
                    </div>
                  </div>
                )}
              </DragDrop>
              {/* {image && (
                <div className="image-container">
                  <div className="small image-card text-success mt-2 border">
                    <img
                      src={preview}
                      alt={image.name}
                      className="image-image"
                    />{" "}
                    <div className="image-text text-center" title={image.name}>
                      {image.name}
                    </div>
                  </div>
                </div>
              )} */}
              <div>
                <select
                  className="form-select form-select-md mb-2"
                  aria-label="Large select example"
                  value={format || ""}
                  onChange={(e) => setFormat(e.target.value)}
                  name="Format"
                  required
                >
                  <option value={null}>Open this select menu</option>
                  <option value="png">PNG (.png)</option>
                  <option value="jpeg">JPEG (.jpg, .jpeg)</option>
                  <option value="webp">WebP (.webp)</option>
                </select>
              </div>
              <div className="d-grid gap-2 col-12 col-md-6 mx-auto">
                <button
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      />
                      Converting...
                    </>
                  ) : (
                    "Convert Image"
                  )}
                </button>
              </div>
            </form>
            <ErrorHelp />
          </main>
          {downloadurl && (
            <div
              className="card shadow mt-5 border-success mx-auto"
              style={{ maxWidth: 600 }}
            >
              <div className="card-body text-center">
                <h3 className="text-success">Image Converted Successfully</h3>

                <p className="text-muted">
                  <strong>{image.name}</strong>
                  <br />
                  ↓
                  <br />
                  <strong>{imageName}</strong>
                </p>

                <a
                  href={downloadurl}
                  download={imageName}
                  className="btn btn-success px-4"
                  onClick={() => setDownloadUrl(null)}
                >
                  Download Image
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
