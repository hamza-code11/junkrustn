import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTruck,
  FaRecycle,
  FaHome,
  FaTools,
  FaCamera,
  FaInfoCircle,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { MdOutlineMoving } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  const services = [
    { icon: <FaRecycle />, label: "Junk Removal" },
    { icon: <FaTruck />, label: "Hauling & Disposal" },
    { icon: <MdOutlineMoving />, label: "Moving Help" },
    { icon: <FaTools />, label: "Clean-outs" },
    { icon: <FaHome />, label: "Estate Cleanups" },
  ];

  const navLinks = [
    { href: "#home", icon: <FaHome />, label: "Home" },
    { href: "#about", icon: <FaInfoCircle />, label: "About" },
    { href: "#services", icon: <FaTools />, label: "Services" },
    { href: "#gallery", icon: <FaCamera />, label: "Before & After" },
    { href: "#contact", icon: <FaEnvelope />, label: "Contact" },
  ];

  const counties = ["Rhea", "Meigs", "Bledsoe", "Roane", "McMinn", "Bradley"];

  // Dynamic theme colors
  const bgRoot = darkMode ? "#0A0A0A" : "#FAFAFA";
  const bgCta = darkMode ? "#1A1A1A" : "#FFF9E0";
  const ctaBorder = darkMode ? "rgba(255,225,26,0.2)" : "rgba(255,225,26,0.3)";
  const textPri = darkMode ? "#FFFFFF" : "#1A1A1A";
  const textSec = darkMode ? "#AAAAAA" : "#666666";
  const textMuted = darkMode ? "#777777" : "#999999";
  const headingColor = darkMode ? "#FFE11A" : "#4A154B";
  const headingLine = darkMode ? "rgba(255,225,26,0.2)" : "rgba(74,21,75,0.15)";
  const linkColor = darkMode ? "#AAAAAA" : "#555555";
  const linkHover = darkMode ? "#FFE11A" : "#4A154B";
  const linkHoverBg = darkMode ? "rgba(255,225,26,0.06)" : "rgba(74,21,75,0.03)";
  const iconBoxBg = darkMode ? "rgba(255,225,26,0.1)" : "rgba(255,225,26,0.15)";
  const iconBoxBorder = darkMode ? "rgba(255,225,26,0.2)" : "rgba(255,225,26,0.3)";
  const iconBoxColor = darkMode ? "#FFE11A" : "#4A154B";
  const contactLabel = darkMode ? "#888888" : "#999999";
  const contactValue = darkMode ? "#CCCCCC" : "#444444";
  const badgeBg = darkMode ? "#1A1A1A" : "#FFFFFF";
  const badgeBorder = darkMode ? "rgba(255,255,255,0.1)" : "#E5E5E5";
  const badgeColor = darkMode ? "#AAAAAA" : "#555555";
  const badgeHoverBg = darkMode ? "rgba(255,225,26,0.1)" : "#FFF9E0";
  const socialBg = darkMode ? "#1A1A1A" : "#FFFFFF";
  const socialBorder = darkMode ? "rgba(255,255,255,0.1)" : "#E0E0E0";
  const socialColor = darkMode ? "#999999" : "#888888";
  const faithBg = darkMode ? "#1A1A1A" : "#FFFFFF";
  const faithBorder = darkMode ? "rgba(255,255,255,0.08)" : "#EEEEEE";
  const faithColor = darkMode ? "#888888" : "#999999";
  const dividerBg = darkMode ? "rgba(255,255,255,0.06)" : "#E5E5E5";
  const bottomBg = darkMode ? "#0F0F0F" : "#FFFFFF";
  const bottomText = darkMode ? "#777777" : "#999999";
  const bottomLink = darkMode ? "#888888" : "#AAAAAA";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

        * { box-sizing: border-box; }

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
        }
        .footer-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4A154B 0%, #FFE11A 30%, #4A154B 60%, #FFE11A 100%);
          z-index: 2;
        }

        .footer-content { position: relative; z-index: 1; }

        .footer-brand {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.02em;
          transition: color 0.3s;
          margin-bottom: 12px;
        }
        .footer-brand .brand-yellow { color: #FFE11A; }
        .footer-brand .brand-purple { color: #4A154B; }

        .brand-description {
          font-size: clamp(12px, 1.5vw, 13px);
          line-height: 1.7;
          margin-bottom: 20px;
          max-width: 280px;
          transition: color 0.3s;
        }

        .footer-heading {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(11px, 1.3vw, 13px);
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: clamp(14px, 2vw, 18px);
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.3s;
        }
        .footer-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          transition: background 0.3s;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(13px, 1.5vw, 14px);
          text-decoration: none;
          padding: 6px 0;
          transition: all 0.25s ease;
          border-radius: 6px;
        }
        .footer-link:hover {
          transform: translateX(6px);
          padding-left: 4px;
        }
        .footer-link .link-icon {
          font-size: 11px;
          flex-shrink: 0;
          transition: all 0.25s;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: clamp(10px, 1.5vw, 14px);
        }
        .contact-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          transition: all 0.25s;
        }
        .contact-item:hover .contact-icon-box {
          transform: scale(1.05);
        }
        .contact-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 2px;
          font-weight: 600;
          transition: color 0.3s;
        }
        .contact-value {
          text-decoration: none;
          font-size: clamp(13px, 1.4vw, 14px);
          transition: color 0.2s;
          font-weight: 500;
        }

        .county-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: clamp(10px, 1.1vw, 11px);
          font-weight: 600;
          transition: all 0.25s ease;
          cursor: default;
          white-space: nowrap;
        }
        .county-badge:hover {
          transform: translateY(-1px);
        }

        .social-btn {
          width: clamp(34px, 4vw, 38px);
          height: clamp(34px, 4vw, 38px);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.5vw, 15px);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .social-btn:hover {
          background: #4A154B;
          border-color: #4A154B;
          color: #FFE11A;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(74,21,75,0.3);
        }

        .faith-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: clamp(10px, 1.2vw, 12px);
          font-style: italic;
          padding: 6px 14px;
          border-radius: 999px;
          transition: all 0.3s;
        }
        .faith-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #FFE11A;
        }

        .footer-cta {
          border-top: 1px solid;
          border-bottom: 1px solid;
          padding: clamp(20px, 3vw, 28px) 0;
          position: relative;
          z-index: 1;
          transition: all 0.3s;
        }

        .cta-heading {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.02em;
          transition: color 0.3s;
        }
        .cta-sub {
          font-size: clamp(12px, 1.4vw, 14px);
          margin: 4px 0 0;
          transition: color 0.3s;
        }

        .cta-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: clamp(10px, 1.5vw, 13px) clamp(18px, 2.5vw, 28px);
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(12px, 1.4vw, 14px);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: #FFE11A;
          color: #1A1A1A;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(255,225,26,0.35);
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }
        .cta-primary-btn:hover {
          background: #4A154B;
          color: #FFE11A;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(74,21,75,0.3);
        }
        .cta-primary-btn .shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .cta-primary-btn:hover .shine { transform: translateX(100%); }

        .cta-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: clamp(10px, 1.5vw, 13px) clamp(16px, 2vw, 22px);
          border-radius: 999px;
          border: 2px solid #4A154B;
          color: #4A154B;
          font-size: clamp(12px, 1.3vw, 13px);
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .cta-secondary-btn:hover {
          background: #4A154B;
          color: #FFF;
          transform: translateY(-2px);
        }
        .dark .cta-secondary-btn {
          border-color: #FFE11A;
          color: #FFE11A;
        }
        .dark .cta-secondary-btn:hover {
          background: #FFE11A;
          color: #1A1A1A;
        }

        .footer-divider {
          height: 1px;
          margin: 0;
          transition: background 0.3s;
        }

        .footer-bottom {
          padding: clamp(14px, 2vw, 18px) 0;
          transition: background 0.3s;
        }
        .bottom-text {
          font-size: clamp(10px, 1.1vw, 12px);
          margin: 0;
          transition: color 0.3s;
        }
        .bottom-link {
          font-size: clamp(10px, 1.1vw, 12px);
          text-decoration: none;
          transition: color 0.2s;
        }

        /* ═══ GRID ═══ */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
          gap: clamp(28px, 4vw, 48px);
          padding: clamp(32px, 4vw, 52px) 0 clamp(24px, 3vw, 40px);
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; padding: 36px 0 28px; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; padding: 28px 0 20px; }
          .cta-inner { flex-direction: column !important; text-align: center; gap: 16px !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr; gap: 20px; padding: 24px 0 16px; }
          .cta-inner { flex-direction: column !important; text-align: center; gap: 14px !important; }
          .cta-buttons { flex-direction: column; width: 100%; }
          .cta-primary-btn, .cta-secondary-btn { width: 100%; justify-content: center; }
          .bottom-inner { flex-direction: column !important; gap: 8px !important; text-align: center; }
          .brand-description { max-width: 100%; }
        }
      `}</style>

      <footer className="footer-root" style={{ background: bgRoot }}>
        {/* ═══ CTA STRIP ═══ */}
        <div className="footer-cta" style={{ background: bgCta, borderTopColor: ctaBorder, borderBottomColor: ctaBorder }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 3vw, 24px)" }}>
            <div className="cta-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", position: "relative", zIndex: 1 }}>
              <div>
                <p className="cta-heading" style={{ color: textPri }}>Ready to Reclaim Your Space?</p>
                <p className="cta-sub" style={{ color: textSec }}>Fast, affordable junk removal across Southeast Tennessee.</p>
              </div>
              <div className="cta-buttons" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <a href="tel:+19044303838" className="cta-primary-btn">
                  <div className="shine" />
                  <FaPhoneAlt style={{ position: "relative", zIndex: 1, fontSize: "12px" }} />
                  <span style={{ position: "relative", zIndex: 1 }}>(904) 430-3838</span>
                </a>
                <a href="#contact" className="cta-secondary-btn">
                  Free Quote
                  <FaChevronRight style={{ fontSize: "10px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="footer-content">
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 3vw, 24px)" }}>
            <div className="footer-grid">
              {/* COL 1: BRAND */}
              <div>
                <div className="footer-brand" style={{ color: textPri }}>
                  Junk<span className="brand-yellow">R</span>
                  <span className="brand-purple">Us</span>
                </div>
                <p className="brand-description" style={{ color: textSec }}>
                  Southeast Tennessee's trusted junk removal & hauling service. Honest work, fair prices, servant-hearted values.
                </p>

                <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                  <a href="#" className="social-btn" style={{ background: socialBg, borderColor: socialBorder, color: socialColor }} aria-label="Facebook">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="social-btn" style={{ background: socialBg, borderColor: socialBorder, color: socialColor }} aria-label="Instagram">
                    <FaInstagram />
                  </a>
                </div>

                <div className="faith-badge" style={{ background: faithBg, borderColor: faithBorder, color: faithColor }}>
                  <span className="faith-dot" />
                  We serve God. We serve people. We serve businesses.
                  <span className="faith-dot" />
                </div>
              </div>

              {/* COL 2: QUICK LINKS */}
              <div>
                <p className="footer-heading" style={{ color: headingColor }}>
                  <FaChevronRight style={{ fontSize: "8px" }} />
                  Quick Links
                  <span style={{ background: headingLine }} className="heading-line" />
                </p>
                <nav>
                  {navLinks.map((link) => (
                    <a key={link.label} href={link.href} className="footer-link"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) => {
                        e.target.style.color = linkHover;
                        e.target.style.background = linkHoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = linkColor;
                        e.target.style.background = "transparent";
                      }}
                    >
                      <span className="link-icon" style={{ color: "#FFE11A" }}>{link.icon}</span>
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* COL 3: SERVICES */}
              <div>
                <p className="footer-heading" style={{ color: headingColor }}>
                  <FaChevronRight style={{ fontSize: "8px" }} />
                  Our Services
                  <span style={{ background: headingLine }} className="heading-line" />
                </p>
                <div>
                  {services.map((s) => (
                    <a key={s.label} href="#services" className="footer-link"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) => {
                        e.target.style.color = linkHover;
                        e.target.style.background = linkHoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = linkColor;
                        e.target.style.background = "transparent";
                      }}
                    >
                      <span className="link-icon" style={{ color: "#FFE11A" }}>{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* COL 4: CONTACT */}
              <div>
                <p className="footer-heading" style={{ color: headingColor }}>
                  <FaChevronRight style={{ fontSize: "8px" }} />
                  Contact Us
                  <span style={{ background: headingLine }} className="heading-line" />
                </p>

                <div className="contact-item">
                  <div className="contact-icon-box" style={{ background: iconBoxBg, borderColor: iconBoxBorder, color: iconBoxColor }}>
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="contact-label" style={{ color: contactLabel }}>Call or Text</p>
                    <a href="tel:+19044303838" className="contact-value" style={{ color: contactValue }}
                      onMouseEnter={(e) => e.target.style.color = linkHover}
                      onMouseLeave={(e) => e.target.style.color = contactValue}> (904) 430-3838</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box" style={{ background: iconBoxBg, borderColor: iconBoxBorder, color: iconBoxColor }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="contact-label" style={{ color: contactLabel }}>Email</p>
                    <a href="mailto:info@junkrustn.com" className="contact-value" style={{ color: contactValue }}
                      onMouseEnter={(e) => e.target.style.color = linkHover}
                      onMouseLeave={(e) => e.target.style.color = contactValue}>info@junkrustn.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box" style={{ background: iconBoxBg, borderColor: iconBoxBorder, color: iconBoxColor }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="contact-label" style={{ color: contactLabel }}>Service Area</p>
                    <span className="contact-value" style={{ color: contactValue }}>Southeast Tennessee</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "14px" }}>
                  {counties.map((c) => (
                    <span key={c} className="county-badge"
                      style={{ background: badgeBg, borderColor: badgeBorder, color: badgeColor }}>
                      <FaStar style={{ fontSize: "8px", color: "#FFE11A" }} />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-divider" style={{ background: `linear-gradient(90deg, transparent, ${dividerBg}, transparent)` }} />

          {/* ═══ BOTTOM BAR ═══ */}
          <div className="footer-bottom" style={{ background: bottomBg }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 3vw, 24px)" }}>
              <div className="bottom-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <p className="bottom-text" style={{ color: bottomText }}>
                  © {currentYear} <span style={{ color: darkMode ? "#FFE11A" : "#555", fontWeight: 600 }}>Junk R Us LLC.</span> All rights reserved.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <a href="#" className="bottom-link" style={{ color: bottomLink }}
                    onMouseEnter={(e) => e.target.style.color = linkHover}
                    onMouseLeave={(e) => e.target.style.color = bottomLink}>Privacy Policy</a>
                  <span style={{ color: darkMode ? "#444" : "#DDD", fontSize: "10px" }}>|</span>
                  <a href="#" className="bottom-link" style={{ color: bottomLink }}
                    onMouseEnter={(e) => e.target.style.color = linkHover}
                    onMouseLeave={(e) => e.target.style.color = bottomLink}>Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;