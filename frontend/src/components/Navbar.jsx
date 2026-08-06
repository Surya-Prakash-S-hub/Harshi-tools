import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
  ];

  const toolMenuItems = [
    { label: "Convert Image", to: "/" },
    { label: "Batch Conversion", to: "/batch-conversion" },
    { label: "Resize Image", to: "/resize-image" },
    { label: "Compress Image", to: "/compress-image" },
  ];

  const themes = [
    "light",
    "dark",
    "ocean",
    "emerald",
    "royal",
    "sunset",
    "rose",
    "midnight",
  ];

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = activeTheme;
    localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  const handleToolsMouseLeave = () => setIsToolsMenuOpen(false);

  return (
    <nav className="relative z-50 border-b border-border bg-background shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-1 text-xl font-black tracking-tight text-text md:text-2xl"
        >
          Harshi<span className="text-primary">Tools</span>
        </NavLink>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-text-secondary hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2 py-1">
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}

          <div
            className="group relative"
            onMouseEnter={() => setIsToolsMenuOpen(true)}
            onMouseLeave={handleToolsMouseLeave}
          >
            <button
              type="button"
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ${
                isToolsMenuOpen
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary hover:bg-surface hover:text-primary"
              }`}
            >
              Tools
              <svg
                className={`h-4 w-4 transition-transform duration-300 ${isToolsMenuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
              </svg>
            </button>

            <div
              className={`absolute left-0 top-full pt-2 w-56 origin-top-left overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-xl transition-all duration-200 ease-out ${
                isToolsMenuOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
              }`}
            >
              {toolMenuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsToolsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text hover:bg-background hover:text-primary"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="relative">
            <select
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
              className="appearance-none rounded-full border border-border bg-surface px-3 py-2 pr-9 text-sm font-medium text-text shadow-sm outline-none transition hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30"
              aria-label="Select theme"
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
            </svg>
          </div>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-text transition hover:bg-surface md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 border-t border-border bg-surface px-4 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text hover:bg-background"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <div className="rounded-xl border border-border bg-background p-2">
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Tools
            </div>
            <div className="space-y-1">
              {toolMenuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm transition ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text hover:bg-surface"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="relative">
            <select
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
              className="w-full appearance-none rounded-xl border border-border bg-background px-3 py-2.5 pr-9 text-sm font-medium text-text shadow-sm outline-none transition hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30"
              aria-label="Select theme"
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
