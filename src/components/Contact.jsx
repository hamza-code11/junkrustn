import { useState, useRef, useEffect } from "react";
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane,
  FaCheckCircle, FaClock, FaTruck, FaStar, FaArrowRight,
  FaCamera, FaTimes, FaCloudUploadAlt,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const PRIMARY_YELLOW = "#FFE11A";
const ACCENT_PURPLE = "#4A154B";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Contact = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", service: "", message: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroRef, heroInView] = useInView(0.1);
  const [formRef, formInView] = useInView(0.1);
  const [infoRef, infoInView] = useInView(0.1);
  const fileInputRef = useRef(null);

  // Theme colors
  const bg = darkMode ? "#0A0A0A" : "#FAFAF8";
  const bgCard = darkMode ? "#1A1A1A" : "#FFFFFF";
  const bgInput = darkMode ? "#252525" : "#FAFAF8";
  const textPri = darkMode ? "#FFFFFF" : "#1A1A1A";
  const textSec = darkMode ? "#AAAAAA" : "#666666";
  const textMuted = darkMode ? "#888888" : "#888888";
  const border = darkMode ? "rgba(255,255,255,0.08)" : "#F0EDE8";
  const inputBorder = darkMode ? "rgba(255,255,255,0.12)" : "#E8E5DF";
  const inputFocus = darkMode ? "rgba(255,225,26,0.3)" : "rgba(255,225,26,0.5)";
  const heroBg = darkMode
    ? "linear-gradient(135deg, #1A1A1A 0%, #1A1020 50%, #0F0F0F 100%)"
    : "linear-gradient(135deg, #FFFDF0 0%, #FFF8E7 50%, #F8F0FF 100%)";
  const badgeBg = darkMode ? "rgba(255,225,26,0.08)" : "#FFF9D6";
  const infoHoverBg = darkMode ? "rgba(255,225,26,0.08)" : "#FFF9D6";
  const dividerColor = darkMode ? "rgba(255,255,255,0.06)" : "#F0EDE8";
  const quoteBg = darkMode ? "rgba(255,225,26,0.05)" : "#FFFDF0";

  const contactInfo = [
    { icon: <FaPhoneAlt />, title: "Call or Text", value: "(904) 430-3838", href: "tel:+19044303838", color: "#FF6B35" },
    { icon: <FaEnvelope />, title: "Email Us", value: "info@junkrustn.com", href: "mailto:info@junkrustn.com", color: "#2D7DD2" },
    { icon: <FaMapMarkerAlt />, title: "Service Area", value: "Southeast Tennessee", href: null, color: "#2ECC71" },
  ];

  const serviceOptions = [
    "Junk Removal", "Moving Help", "Estate Clean-Outs",
    "Commercial Clean-Outs", "Yard & Debris Removal",
    "Appliance & Furniture Removal", "Other / Not Sure",
  ];

  const counties = ["Rhea", "Meigs", "Bledsoe", "Roane", "McMinn", "Bradley"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🔥 IMAGE UPLOAD HANDLER
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Max 5 images
    const newImages = [...images, ...files].slice(0, 5);
    setImages(newImages);

    // Generate previews
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    // Clean up old previews
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setImagePreviews(newPreviews);
  };

  // Remove single image
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    URL.revokeObjectURL(imagePreviews[index]);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setImages([]);
      setImagePreviews([]);
    }, 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Lora:ital@1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

        .contact-root {
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          transition: background 0.4s ease;
        }

        .section-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; margin-bottom: 16px; transition: color 0.3s;
        }
        .section-eyebrow .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: ${PRIMARY_YELLOW};
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,225,26,0.6); }
          50% { box-shadow: 0 0 0 8px rgba(255,225,26,0); }
        }

        .section-title {
          font-family: 'Rajdhani', sans-serif; font-weight: 700;
          line-height: 1.05; letter-spacing: -0.02em; transition: color 0.3s;
        }
        .yellow-mark {
          position: relative; display: inline-block;
        }
        .yellow-mark::after {
          content: ''; position: absolute;
          bottom: 2px; left: -4px; right: -4px; height: 10px;
          background: ${PRIMARY_YELLOW}; opacity: 0.4;
          z-index: -1; border-radius: 3px; transform: rotate(-1deg);
        }

        .fade-up {
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.1s; } .d2 { transition-delay: 0.2s; }
        .d3 { transition-delay: 0.3s; } .d4 { transition-delay: 0.4s; }

        .contact-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 4vw, 56px); align-items: start;
        }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }

        /* ═══ FORM CARD ═══ */
        .form-card {
          border-radius: 24px; padding: clamp(24px, 3vw, 40px);
          border: 1.5px solid; transition: all 0.3s;
        }
        .form-group { margin-bottom: 16px; }
        .form-label {
          display: block; font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          margin-bottom: 6px; transition: color 0.3s;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%; padding: 12px 16px; border: 1.5px solid;
          border-radius: 12px; font-family: 'DM Sans', sans-serif;
          font-size: 15px; transition: all 0.25s ease;
          outline: none; box-sizing: border-box;
        }
        .form-textarea { min-height: 100px; resize: vertical; }
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 16px center;
          padding-right: 40px;
        }

        /* ═══ IMAGE UPLOAD ═══ */
        .upload-area {
          border: 2px dashed;
          border-radius: 14px; padding: 20px;
          text-align: center; cursor: pointer;
          transition: all 0.25s ease;
        }
        .upload-area:hover {
          border-style: solid;
        }
        .upload-icon {
          font-size: 28px; margin-bottom: 6px;
        }
        .upload-text {
          font-size: 13px; font-weight: 600;
        }
        .upload-hint {
          font-size: 11px; margin-top: 2px;
        }
        .image-preview-grid {
          display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;
        }
        .image-preview-item {
          position: relative; width: 72px; height: 72px;
          border-radius: 10px; overflow: hidden;
        }
        .image-preview-item img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .image-remove-btn {
          position: absolute; top: 3px; right: 3px;
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(0,0,0,0.6); color: #fff;
          border: none; cursor: pointer; font-size: 10px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .image-remove-btn:hover { background: #E74C3C; }

        /* ═══ SUBMIT ═══ */
        .submit-btn {
          width: 100%; padding: 14px 28px; border-radius: 14px;
          border: none; font-weight: 700; font-size: 15px;
          background: ${PRIMARY_YELLOW}; color: #1A1A1A;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 6px 24px rgba(255,225,26,0.35);
          position: relative; overflow: hidden;
          font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255,225,26,0.5);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .submit-btn .shine {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%);
          transform: translateX(-100%); transition: transform 0.6s ease;
        }
        .submit-btn:hover .shine { transform: translateX(100%); }

        /* ═══ SUCCESS ═══ */
        .success-card {
          border-radius: 20px; padding: 40px 24px; text-align: center;
        }
        .success-icon-wrap {
          width: 64px; height: 64px; border-radius: 50%;
          background: #2ECC71; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; margin: 0 auto 16px;
        }

        /* ═══ INFO CARD ═══ */
        .info-card {
          border-radius: 20px; padding: 20px;
          border: 1.5px solid; display: flex;
          flex-direction: column; gap: 4px;
          transition: all 0.3s;
        }
        .info-item {
          display: flex; align-items: flex-start; gap: 12px;
          text-decoration: none; padding: 10px 12px;
          border-radius: 12px; transition: background 0.2s;
        }
        .info-icon-box {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
        }
        .info-label {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          transition: color 0.3s;
        }
        .info-value {
          font-size: 14px; font-weight: 600; margin-top: 2px;
          transition: color 0.3s;
        }

        /* ═══ QUOTE ═══ */
        .quote-card {
          border-radius: 20px; padding: 24px 20px;
          position: relative; overflow: hidden; transition: all 0.3s;
        }
        .quote-card::before {
          content: ''; position: absolute; right: -30px; bottom: -30px;
          width: 120px; height: 120px; border-radius: 50%;
          background: rgba(255,225,26,0.08);
        }
        .quote-text {
          font-family: 'Lora', serif; font-style: italic;
          font-size: 14px; line-height: 1.7; position: relative; z-index: 1;
        }
        .quote-author {
          font-weight: 700; font-size: 13px; margin-top: 12px;
          position: relative; z-index: 1;
        }

        /* ═══ COUNTY BADGES ═══ */
        .county-badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 5px 12px; border-radius: 999px;
          font-size: 11px; font-weight: 600; transition: all 0.25s;
          cursor: default;
        }
        .county-badge:hover {
          background: ${PRIMARY_YELLOW}; border-color: ${PRIMARY_YELLOW};
          color: #1A1A1A; transform: translateY(-1px);
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(0,0,0,0.15);
          border-top-color: #1A1A1A; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @media (max-width: 640px) {
          .form-card { padding: 20px 16px; }
          .info-card { padding: 14px; }
        }
        @media (max-width: 480px) {
          .form-row-mobile { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="contact-root" id="contact" style={{ background: bg }}>

        {/* ═══════════ HERO HEADER ═══════════ */}
        <section ref={heroRef} style={{ background: heroBg, padding: "clamp(60px, 8vw, 80px) 0 clamp(40px, 6vw, 60px)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: darkMode ? 0.15 : 0.35,
            backgroundImage: "radial-gradient(circle, #FFE11A 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "350px", height: "350px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,225,26,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px, 3vw, 24px)", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto" }}>
              <span className={`section-eyebrow fade-up ${heroInView ? "visible" : ""}`}
                style={{ color: darkMode ? "#FFE11A" : ACCENT_PURPLE }}>
                <span className="dot" /> Get In Touch
              </span>
              <h1 className={`section-title fade-up d1 ${heroInView ? "visible" : ""}`}
                style={{ fontSize: "clamp(36px, 6vw, 60px)", marginBottom: "16px", color: textPri }}>
                Let's <span className="yellow-mark" style={{ color: textPri }}>Clear</span> Your Space
              </h1>
              <p className={`fade-up d2 ${heroInView ? "visible" : ""}`}
                style={{ fontSize: "clamp(15px, 2vw, 17px)", color: textSec, lineHeight: 1.7, marginBottom: "20px" }}>
                Free quotes. Fast response. No obligations.
              </p>

              <div className={`fade-up d3 ${heroInView ? "visible" : ""}`}
                style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { icon: <FaClock />, text: "Same-Day Quotes" },
                  { icon: <FaStar />, text: "5-Star Rated" },
                  { icon: <MdLocalOffer />, text: "No Hidden Fees" },
                ].map((b, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: darkMode ? "rgba(255,255,255,0.06)" : "#fff",
                    border: `1px solid ${border}`, padding: "6px 14px",
                    borderRadius: "999px", fontSize: "12px", fontWeight: 500,
                    color: darkMode ? "#CCC" : "#444",
                  }}>
                    <span style={{ color: PRIMARY_YELLOW, fontSize: "11px" }}>{b.icon}</span>
                    {b.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FORM + INFO ═══════════ */}
        <section style={{ padding: "40px 0 80px", background: bg }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px, 3vw, 24px)" }}>
            <div className="contact-grid">

              {/* ────────── LEFT: FORM ────────── */}
              <div ref={formRef} className={`fade-up ${formInView ? "visible" : ""}`}>
                {submitted ? (
                  <div className="success-card" style={{
                    background: darkMode ? "rgba(46,204,113,0.1)" : "#F0FFF6",
                    border: `2px solid #2ECC71`,
                  }}>
                    <div className="success-icon-wrap"><FaCheckCircle /></div>
                    <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "24px", fontWeight: 700, color: textPri, margin: "0 0 8px" }}>
                      Quote Request Sent!
                    </h3>
                    <p style={{ color: textSec, fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                      We'll get back to you within <strong style={{ color: PRIMARY_YELLOW }}>2 hours</strong>.
                    </p>
                    <button onClick={() => setSubmitted(false)} style={{
                      padding: "10px 24px", borderRadius: "999px",
                      border: `2px solid ${ACCENT_PURPLE}`, background: "transparent",
                      color: darkMode ? "#FFE11A" : ACCENT_PURPLE, fontWeight: 700,
                      fontSize: "14px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.2s",
                    }}>Request Another Quote</button>
                  </div>
                ) : (
                  <div className="form-card" style={{ background: bgCard, borderColor: border }}>
                    <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "22px", fontWeight: 700, color: textPri, margin: "0 0 4px" }}>
                      GET YOUR FREE QUOTE
                    </h3>
                    <p style={{ fontSize: "13px", color: textMuted, margin: "0 0 22px" }}>
                      Fill out the form and we'll call you back — usually within 2 hours.
                    </p>

                    <form onSubmit={handleSubmit}>
                      {/* Name */}
                      <div className="form-group">
                        <label className="form-label" style={{ color: textSec }}>Full Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required
                          placeholder="John Doe" className="form-input"
                          style={{ background: bgInput, borderColor: inputBorder, color: textPri }}
                          onFocus={(e) => { e.target.style.borderColor = PRIMARY_YELLOW; e.target.style.boxShadow = `0 0 0 4px ${inputFocus}`; }}
                          onBlur={(e) => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = "none"; }}
                        />
                      </div>

                      {/* Phone + Email */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="form-row-mobile">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textSec }}>Phone Number *</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                            placeholder="(423) 555-0123" className="form-input"
                            style={{ background: bgInput, borderColor: inputBorder, color: textPri }}
                            onFocus={(e) => { e.target.style.borderColor = PRIMARY_YELLOW; e.target.style.boxShadow = `0 0 0 4px ${inputFocus}`; }}
                            onBlur={(e) => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = "none"; }}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" style={{ color: textSec }}>Email</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange}
                            placeholder="john@email.com" className="form-input"
                            style={{ background: bgInput, borderColor: inputBorder, color: textPri }}
                            onFocus={(e) => { e.target.style.borderColor = PRIMARY_YELLOW; e.target.style.boxShadow = `0 0 0 4px ${inputFocus}`; }}
                            onBlur={(e) => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = "none"; }}
                          />
                        </div>
                      </div>

                      {/* Service Dropdown */}
                      <div className="form-group">
                        <label className="form-label" style={{ color: textSec }}>Service Needed *</label>
                        <select name="service" value={formData.service} onChange={handleChange} required
                          className="form-select"
                          style={{ background: bgInput, borderColor: inputBorder, color: textPri }}>
                          <option value="" disabled>Select a service...</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt} style={{ background: bgCard }}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div className="form-group">
                        <label className="form-label" style={{ color: textSec }}>Tell Us About Your Job</label>
                        <textarea name="message" value={formData.message} onChange={handleChange}
                          placeholder="I need a couch removed from my garage..."
                          className="form-textarea"
                          style={{ background: bgInput, borderColor: inputBorder, color: textPri }}
                          onFocus={(e) => { e.target.style.borderColor = PRIMARY_YELLOW; e.target.style.boxShadow = `0 0 0 4px ${inputFocus}`; }}
                          onBlur={(e) => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = "none"; }}
                        />
                      </div>

                      {/* 🔥 IMAGE UPLOAD */}
                      <div className="form-group">
                        <label className="form-label" style={{ color: textSec }}>
                          <FaCamera style={{ marginRight: "4px", fontSize: "10px" }} />
                          Upload Photos (Optional — Max 5)
                        </label>

                        {/* Clickable Upload Area */}
                        <div
                          className="upload-area"
                          style={{
                            borderColor: darkMode ? "rgba(255,255,255,0.15)" : "#DDD",
                            background: darkMode ? "rgba(255,255,255,0.02)" : "#FAFAF8",
                          }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="upload-icon" style={{ color: darkMode ? "#FFE11A" : ACCENT_PURPLE }}>
                            <FaCloudUploadAlt />
                          </div>
                          <div className="upload-text" style={{ color: textSec }}>
                            Click to upload photos
                          </div>
                          <div className="upload-hint" style={{ color: textMuted }}>
                            JPG, PNG, WEBP — Max 5MB each
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                          />
                        </div>

                        {/* Image Previews */}
                        {imagePreviews.length > 0 && (
                          <div className="image-preview-grid">
                            {imagePreviews.map((preview, i) => (
                              <div key={i} className="image-preview-item">
                                <img src={preview} alt={`Upload ${i + 1}`} />
                                <button
                                  type="button"
                                  className="image-remove-btn"
                                  onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            ))}
                            {images.length < 5 && (
                              <div
                                className="image-preview-item"
                                style={{
                                  border: `2px dashed ${darkMode ? "rgba(255,255,255,0.2)" : "#DDD"}`,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <FaCloudUploadAlt style={{ color: darkMode ? "#888" : "#CCC", fontSize: "18px" }} />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Submit */}
                      <button type="submit" className="submit-btn" disabled={loading}>
                        <div className="shine" />
                        {loading ? (
                          <>
                            <div className="spinner" />
                            <span style={{ position: "relative", zIndex: 1 }}>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FaPaperPlane style={{ position: "relative", zIndex: 1, fontSize: "13px" }} />
                            <span style={{ position: "relative", zIndex: 1 }}>GET YOUR FREE QUOTE</span>
                            <FaArrowRight style={{ position: "relative", zIndex: 1, fontSize: "11px" }} />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* ────────── RIGHT: INFO ────────── */}
              <div ref={infoRef}>
                <div className={`info-card fade-up ${infoInView ? "visible" : ""}`}
                  style={{ background: bgCard, borderColor: border }}>
                  {contactInfo.map((item, i) => (
                    <div key={i}>
                      {item.href ? (
                        <a href={item.href} className="info-item"
                          style={{ color: "inherit" }}
                          onMouseEnter={(e) => e.currentTarget.style.background = infoHoverBg}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                          <div className="info-icon-box" style={{
                            background: darkMode ? item.color + "25" : item.color + "15",
                            color: item.color,
                          }}>{item.icon}</div>
                          <div>
                            <div className="info-label" style={{ color: textMuted }}>{item.title}</div>
                            <div className="info-value" style={{ color: textPri }}>{item.value}</div>
                          </div>
                        </a>
                      ) : (
                        <div className="info-item">
                          <div className="info-icon-box" style={{
                            background: darkMode ? item.color + "25" : item.color + "15",
                            color: item.color,
                          }}>{item.icon}</div>
                          <div>
                            <div className="info-label" style={{ color: textMuted }}>{item.title}</div>
                            <div className="info-value" style={{ color: textPri }}>{item.value}</div>
                          </div>
                        </div>
                      )}
                      {i < contactInfo.length - 1 && (
                        <hr style={{ border: "none", borderTop: `1px solid ${dividerColor}`, margin: "0 12px" }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Counties */}
                <div className={`fade-up d2 ${infoInView ? "visible" : ""}`} style={{ marginTop: "20px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: textMuted, margin: "0 0 10px" }}>
                    <FaMapMarkerAlt style={{ marginRight: "6px", color: darkMode ? "#FFE11A" : ACCENT_PURPLE, fontSize: "9px" }} />
                    Counties We Serve
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {counties.map((c) => (
                      <span key={c} className="county-badge" style={{
                        background: darkMode ? "rgba(255,225,26,0.08)" : "#F8F0FF",
                        border: `1px solid ${darkMode ? "rgba(255,225,26,0.2)" : ACCENT_PURPLE + "22"}`,
                        color: darkMode ? "#FFE11A" : ACCENT_PURPLE,
                      }}>
                        <FaCheckCircle style={{ fontSize: "8px" }} /> {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className={`quote-card fade-up d3 ${infoInView ? "visible" : ""}`} style={{ marginTop: "20px", background: quoteBg }}>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} style={{ color: PRIMARY_YELLOW, fontSize: "13px" }} />
                    ))}
                  </div>
                  <p className="quote-text" style={{ color: darkMode ? "#DDD" : "#444" }}>
                    "Junk R Us showed up on time, gave me a fair price, and had my
                    entire garage cleared in under 2 hours!"
                  </p>
                  <p className="quote-author" style={{ color: darkMode ? PRIMARY_YELLOW : ACCENT_PURPLE }}>
                    — Doug F., Evensville, TN
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;