import { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaBars,
  FaTimes,
  FaTruck,
  FaHome,
  FaInfoCircle,
  FaTools,
  FaCamera,
  FaEnvelope,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { MdOutlineMoving } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const menuItems = [
  { name: "Home", href: "#home", icon: <FaHome /> },
  { name: "About", href: "#about", icon: <FaInfoCircle /> },
  { name: "Services", href: "#services", icon: <FaTools /> },
  { name: "Moving", href: "#moving", icon: <MdOutlineMoving /> },
  { name: "Before & After", href: "#gallery", icon: <FaCamera /> },
  { name: "Contact", href: "#contact", icon: <FaEnvelope /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = menuItems.map(item => document.getElementById(item.href.replace("#", "")));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveItem(menuItems[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        .nav-root {
          font-family: 'DM Sans', sans-serif;
        }
        .nav-logo-text {
          font-family: 'Rajdhani', sans-serif;
        }

        .navbar-scrolled {
          background: rgba(255,255,255,0.98) !important;
          box-shadow: 0 1px 0 rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06);
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }
        /* Dark mode scrolled */
        .dark .navbar-scrolled {
          background: rgba(30,30,30,0.98) !important;
          box-shadow: 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3);
        }
        .navbar-top {
          background: transparent;
          padding-top: 18px;
          padding-bottom: 18px;
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: all 0.2s ease;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
        }
        .nav-link.scrolled {
          color: #444;
        }
        .dark .nav-link.scrolled {
          color: #ccc;
        }
        .nav-link:hover {
          color: #FFE11A;
          background: rgba(255,225,26,0.1);
        }
        .nav-link.scrolled:hover {
          color: #1A1A1A;
          background: rgba(0,0,0,0.05);
        }
        .dark .nav-link.scrolled:hover {
          color: #FFE11A;
          background: rgba(255,225,26,0.1);
        }
        .nav-link.active {
          color: #FFE11A;
        }
        .nav-link.scrolled.active {
          color: #4A154B;
        }
        .dark .nav-link.scrolled.active {
          color: #FFE11A;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #FFE11A;
          transition: transform 0.2s ease;
        }
        .nav-link.active::after,
        .nav-link:hover::after {
          transform: translateX(-50%) scale(1);
        }

        /* ═══ THEME TOGGLE ═══ */
        .theme-toggle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          color: #FFE11A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .theme-toggle.scrolled {
          border-color: #ddd;
          background: #f5f5f5;
          color: #4A154B;
        }
        .dark .theme-toggle.scrolled {
          border-color: #444;
          background: #333;
          color: #FFE11A;
        }
        .theme-toggle:hover {
          transform: rotate(25deg) scale(1.1);
          background: #FFE11A;
          color: #1A1A1A;
          border-color: #FFE11A;
        }

        .cta-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: #FFE11A;
          color: #1A1A1A;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(255,225,26,0.4);
          position: relative;
          overflow: hidden;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,225,26,0.5);
        }
        .cta-btn .shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .cta-btn:hover .shine {
          transform: translateX(100%);
        }

        .phone-link {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        .phone-link.scrolled {
          color: #666;
        }
        .dark .phone-link.scrolled {
          color: #aaa;
        }
        .phone-link:hover {
          color: #FFE11A;
        }

        .hamburger {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255,255,255,0.15);
          color: #fff;
        }
        .hamburger.scrolled {
          background: rgba(0,0,0,0.06);
          color: #333;
        }
        .dark .hamburger.scrolled {
          background: rgba(255,255,255,0.08);
          color: #ccc;
        }
        .hamburger.open {
          background: #FFE11A;
          color: #1A1A1A;
        }
        .hamburger:hover {
          background: #FFE11A;
          color: #1A1A1A;
        }

        .mobile-menu {
          background: #fff;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
          box-shadow: 0 20px 48px rgba(0,0,0,0.12);
        }
        .dark .mobile-menu {
          background: #1A1A1A;
          box-shadow: 0 20px 48px rgba(0,0,0,0.5);
        }
        .mobile-menu.open {
          max-height: 600px;
          opacity: 1;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #444;
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: all 0.2s ease;
        }
        .dark .mobile-link {
          color: #ccc;
        }
        .mobile-link:hover {
          background: rgba(255,225,26,0.08);
          border-left-color: #FFE11A;
          color: #1A1A1A;
        }
        .dark .mobile-link:hover {
          background: rgba(255,225,26,0.12);
          color: #fff;
        }
        .mobile-link.active {
          background: rgba(255,225,26,0.1);
          border-left-color: #FFE11A;
          color: #1A1A1A;
        }
        .dark .mobile-link.active {
          background: rgba(255,225,26,0.15);
          color: #fff;
        }

        @keyframes ring-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,225,26,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(255,225,26,0); }
        }
        .logo-ring {
          animation: ring-pulse 3s ease-in-out infinite;
        }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .phone-bounce { animation: gentle-bounce 2s ease-in-out infinite; }

        .nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.2);
        }
        .nav-divider.scrolled {
          background: rgba(0,0,0,0.12);
        }
        .dark .nav-divider.scrolled {
          background: rgba(255,255,255,0.12);
        }
      `}</style>

      <nav
        className={`nav-root fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "navbar-scrolled" : "navbar-top"
        }`}
        style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* ═══ LOGO ═══ */}
            <a
              href="#home"
              style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
              onClick={() => setActiveItem("Home")}
            >
              <div
                className={scrolled ? "" : "logo-ring"}
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  border: `2px solid ${scrolled ? (darkMode ? "#FFE11A" : "#4A154B") : "#FFE11A"}`,
                  overflow: "hidden",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "border-color 0.3s",
                }}
              >
                <img
                  src="/logo.png"
                  alt="Junk R Us"
                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.insertAdjacentHTML(
                      "beforeend",
                      `<span style="font-family:Rajdhani,sans-serif;font-size:17px;font-weight:700;color:#4A154B">JR</span>`
                    );
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span
                  className="nav-logo-text"
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: scrolled ? (darkMode ? "#fff" : "#1A1A1A") : "#fff",
                    letterSpacing: "0.02em",
                    transition: "color 0.3s",
                  }}
                >
                  Junk<span style={{ color: "#FFE11A" }}>R</span>Us
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: scrolled ? (darkMode ? "#aaa" : "#999") : "rgba(255,255,255,0.55)",
                    marginTop: "2px",
                    transition: "color 0.3s",
                  }}
                >
                  Southeast TN
                </span>
              </div>
            </a>

            {/* ═══ DESKTOP MENU ═══ */}
            <div id="desktop-menu" style={{ display: "none", alignItems: "center", gap: "2px" }}>
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${scrolled ? "scrolled" : ""} ${activeItem === item.name ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(item.name);
                    const target = document.getElementById(item.href.replace("#", ""));
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    setIsOpen(false);
                  }}
                >
                  <span style={{ fontSize: "13px", opacity: 0.8 }}>{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>

            {/* ═══ RIGHT SIDE ═══ */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a
                href="tel:+19044303838"
                className={`phone-link ${scrolled ? "scrolled" : ""}`}
                id="phone-link"
                style={{ display: "none" }}
              >
                <FaPhoneAlt className="phone-bounce" style={{ color: "#FFE11A", fontSize: "13px" }} />
                <span style={{ fontWeight: 500 }}>(904) 430-3838</span>
              </a>

              <div
                className={`nav-divider ${scrolled ? "scrolled" : ""}`}
                id="nav-divider"
                style={{ display: "none" }}
              />

              {/* 🔥 THEME TOGGLE BUTTON */}
              <button
                className={`theme-toggle ${scrolled ? "scrolled" : ""}`}
                onClick={toggleTheme}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              <a
                href="#contact"
                className="cta-btn"
                id="cta-btn"
                style={{ display: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem("Contact");
                  const target = document.getElementById("contact");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                <div className="shine" />
                <span style={{ position: "relative", zIndex: 1 }}>GET A QUOTE</span>
                <FaTruck style={{ position: "relative", zIndex: 1, fontSize: "14px", transition: "transform 0.2s" }} />
              </a>

              <button
                className={`hamburger ${scrolled ? "scrolled" : ""} ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                id="hamburger-btn"
              >
                {isOpen ? <FaTimes size={17} /> : <FaBars size={17} />}
              </button>
            </div>
          </div>
        </div>

        {/* ═══ MOBILE MENU ═══ */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <div style={{ padding: "12px 16px 8px" }}>
            {/* Mobile Theme Toggle */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              marginBottom: "8px",
              borderRadius: "12px",
              background: darkMode ? "#252525" : "#f9f9f9",
            }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: darkMode ? "#ccc" : "#444" }}>
                {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </span>
              <button
                onClick={toggleTheme}
                style={{
                  width: "44px",
                  height: "24px",
                  borderRadius: "12px",
                  border: "none",
                  background: darkMode ? "#FFE11A" : "#ccc",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.3s",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: darkMode ? "22px" : "2px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.3s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                />
              </button>
            </div>

            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`mobile-link ${activeItem === item.name ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setActiveItem(item.name);
                  const target = document.getElementById(item.href.replace("#", ""));
                  if (target) {
                    setTimeout(() => {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }
                }}
              >
                <span style={{ color: "#FFE11A", fontSize: "18px" }}>{item.icon}</span>
                {item.name}
              </a>
            ))}

            <div style={{ marginTop: "12px", padding: "12px 0", borderTop: darkMode ? "1px solid #333" : "1px solid #f0f0f0" }}>
              <a
                href="#contact"
                className="cta-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setActiveItem("Contact");
                  const target = document.getElementById("contact");
                  if (target) {
                    setTimeout(() => {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }
                }}
                style={{ width: "100%", justifyContent: "center", fontSize: "15px", padding: "14px 22px" }}
              >
                <div className="shine" />
                <FaPhoneAlt style={{ position: "relative", zIndex: 1 }} />
                <span style={{ position: "relative", zIndex: 1 }}>GET YOUR FREE QUOTE</span>
              </a>
              <p style={{ textAlign: "center", fontSize: "13px", color: "#999", marginTop: "10px" }}>
                Or call us: (904) 430-3838
              </p>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @media (min-width: 1024px) {
          #desktop-menu { display: flex !important; }
          #phone-link { display: flex !important; }
          #nav-divider { display: block !important; }
          #cta-btn { display: flex !important; }
          #hamburger-btn { display: none !important; }
        }
        @media (max-width: 1279px) {
          #phone-link { display: none !important; }
          #nav-divider { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;