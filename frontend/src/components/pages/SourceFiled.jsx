import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DragDrop from "./DragnDrop";

const api = import.meta.env.VITE_API_URL;

const Home = () => {
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState("");
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

    if (!image) {
      toast.error('Select Image');
    }

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

      const originalName = image.name;
      const fileName = originalName.replace(/\.[^/.]+$/, "");
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
    <section className="bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="text-3xl font-black tracking-tight text-text sm:text-4xl lg:text-5xl">
            Free Online Image Converter
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-text-secondary sm:text-base">
            Convert JPG, PNG, and WebP images instantly with a fast and secure
            online image conversion tool.
          </p>
        </div>

        <main
          className={`mx-auto w-full max-w-2xl rounded-3xl border border-border bg-surface/80 p-4 shadow-md shadow-shadow/5 backdrop-blur-md sm:p-6 lg:p-8 ${loading ? "pointer-events-none" : "pointer-events-auto"}`}
        >
          <form className="space-y-5" onSubmit={showDatas}>
            <DragDrop
              accept="image/*"
              onFiles={imageOnChange}
              onDragStateChange={setDragging}
            >
              {!image ? (
                <div
                  className={`upload-box w-full rounded-2xl border border-dashed border-border bg-background p-5 text-center transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${dragging ? "border-primary bg-primary/5 shadow-md shadow-primary/10" : "hover:border-primary/70"}`}
                >
                  {dragging ? (
                    <span className="block text-lg font-semibold text-primary sm:text-2xl">
                      Drop Here
                    </span>
                  ) : (
                    <span className="block text-base font-medium text-text sm:text-lg">
                      Drag and Drop
                    </span>
                  )}
                  <span className="mt-2 block text-sm text-text-secondary sm:text-base">
                    {dragging ? "" : "OR"}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-primary sm:text-base">
                    {dragging ? "" : "Select File"}
                  </span>
                </div>
              ) : (
                <div
                  className={`image-container w-full rounded-2xl border border-border bg-background p-3 sm:p-4 ${dragging ? "border-primary shadow-md shadow-primary/10" : ""}`}
                >
                  <div className="image-card rounded-2xl border border-border-light/15 bg-surface p-3 text-text">
                    <img
                      src={preview}
                      alt={image.name}
                      className="image-image rounded-sm"
                      draggable={false}
                    />
                    <div
                      className="image-text mt-2 text-center"
                      title={image.name}
                    >
                      <span className="text-xs text-text-secondary sm:text-sm">
                        {image.name}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </DragDrop>

            <div>
              <label
                htmlFor="image-format"
                className="mb-2 block text-sm font-medium text-text"
              >
                Choose output format
              </label>
              <select
                id="image-format"
                className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm text-text shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-base"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                name="Format"
                required
              >
                <option value="">Select a format</option>
                <option value="png">PNG (.png)</option>
                <option value="jpeg">JPEG (.jpg, .jpeg)</option>
                <option value="webp">WebP (.webp)</option>
              </select>
            </div>

            <div className="mx-auto w-full sm:max-w-xs">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="mr-2 animate-spin rounded-full size-4 border-3 border-white/40 border-t-white"
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
        </main>

        {downloadurl && (
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-border bg-surface p-5 text-center shadow-md shadow-primary/5 sm:p-6">
            <h3 className="text-xl font-bold text-primary sm:text-2xl">
              Image Converted Successfully
            </h3>

            <p className="mt-3 text-sm text-text-secondary sm:text-base">
              <span className="block font-semibold text-text">
                {image.name}
              </span>
              <span className="my-2 block text-lg text-text-secondary">↓</span>
              <span className="block font-semibold text-text">{imageName}</span>
            </p>

            <a
              href={downloadurl}
              download={imageName}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              onClick={() => setDownloadUrl(null)}
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
