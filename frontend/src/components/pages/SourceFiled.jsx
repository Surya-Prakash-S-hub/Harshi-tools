import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ErrorHelp from "./Error";
const api = import.meta.env.VITE_API_URL;

const Home = () => {
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadurl, setDownloadUrl] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [error, setError] = useState(null);

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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (error) {
    toast.error(error, { toastId: "server-error" });
  }
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
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  name="Image"
                  id="inputGroupFile04"
                  accept="image/*"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  required
                />
              </div>
              {image && (
                <div className="small text-success mt-2">📁 {image.name}</div>
              )}
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
