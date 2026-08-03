import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ErrorHelp from "./Error";
const api = import.meta.env.VITE_API_URL;

const BatchConversion = () => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [format, setFormat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadurl, setDownloadUrl] = useState(null);
  const [imageName, setImageName] = useState(null);
  const maxFiles = 20;
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const fileName =
    `converted-images-` +
    `${now.getFullYear()}-` +
    `${pad(now.getMonth() + 1)}-` +
    `${pad(now.getDate())}_` +
    `${pad(now.getHours())}-` +
    `${pad(now.getMinutes())}-` +
    `${pad(now.getSeconds())}.zip`;

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    if (selectedFiles.length > maxFiles) {
      toast.error(`You can upload up to ${maxFiles} files.`);

      fileInputRef.current.value = "";

      // Clean up the created object URLs
      selectedFiles.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });

      setImages([]);
      return;
    }

    setImages(selectedFiles);
  };
  const removeFile = (id) => {
    const updatedFiles = images.filter((image) => image.id !== id);
    const imageToRemove = images.find((image) => image.id === id);

    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }

    setImages(updatedFiles);

    const dataTransfer = new DataTransfer();

    updatedFiles.forEach((image) => {
      dataTransfer.items.add(image.file);
    });

    fileInputRef.current.files = dataTransfer.files;
  };

  const showDatas = async (e) => {
    e.preventDefault();

    if (!images || !format) return;

    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image.file);
    });

    formData.append("format", format);

    try {
      setLoading(true);

      const response = await axios.post(
        `${api}/image-batch-convert`,
        formData,
        {
          responseType: "blob",
        },
      );

      const url = URL.createObjectURL(response.data);

      setDownloadUrl(url);

      setImageName(fileName);
    } catch (error) {
      toast.error(error.message, {
        toastId: "server-error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="pt-3 Saas-features-block">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">Batch Image Conversion</h1>
            <p className="text-muted">
              Convert multiple images at once quickly and easily. Upload your
              files, choose the desired format, and download all converted
              images together in a single ZIP file.
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
                  ref={fileInputRef}
                  className="form-control"
                  name="Image"
                  id="inputGroupFile04"
                  accept="image/*"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  onChange={handleFiles}
                  required
                  multiple
                />
              </div>
              {images.length > 0 && (
                <details>
                  <summary>preview</summary>
                  <div className="image-container batch">
                    {images.map((image) => {
                      return (
                        <div
                          className="small image-card text-success mt-2 border"
                          key={image.id}
                        >
                          <img
                            src={image.preview}
                            alt={image.file.name}
                            className="image-image"
                          />{" "}
                          <div
                            className="image-text text-center"
                            title={image.file.name}
                          >
                            {image.file.name}
                          </div>
                          <button
                            type="button"
                            className="btn-close image-cancel"
                            aria-label="Remove file"
                            onClick={() => removeFile(image.id)}
                          ></button>
                        </div>
                      );
                    })}
                  </div>
                </details>
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
                <h3 className="text-success">Images Converted Successfully</h3>

                <p className="text-muted">
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

export default BatchConversion;
