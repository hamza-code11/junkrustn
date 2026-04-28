import { useEffect, useRef, useState } from "react";
import {
  FaTruck, FaHome, FaBuilding, FaLeaf,
  FaCheckCircle, FaPhoneAlt, FaArrowRight,
  FaStar, FaClock, FaShieldAlt, FaPlay,
} from "react-icons/fa";
import { MdOutlineMoving, MdOutlineCleaningServices, MdRecycling, MdAutoAwesome } from "react-icons/md";
import { GiSofa, GiBroom } from "react-icons/gi";
import { useTheme } from "../context/ThemeContext";

const PRIMARY_YELLOW = "#FFE11A";
const ACCENT_PURPLE = "#4A154B";

const services = [
  {
    id: "junk-removal",
    icon: <FaTruck />,
    title: "Junk Removal",
    tagline: "We haul it all — fast.",
    desc: "From old furniture to piles of debris, we load it, haul it, and dispose of it responsibly.",
    items: ["Furniture & appliances", "Household clutter", "Construction debris", "Yard waste", "Hot tub removal"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    color: "#FF6B35",
    featured: true,
  },
  {
    id: "moving",
    icon: <MdOutlineMoving />,
    title: "Moving Help",
    tagline: "Handle your treasure with care.",
    desc: "Need muscle for moving day? We help load, unload, and rearrange furniture.",
    items: ["Loading & unloading", "Furniture rearranging", "Home-to-home moves", "Storage moves", "Heavy item handling"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    color: "#2D7DD2",
  },
  {
    id: "estate-cleanouts",
    icon: <FaHome />,
    title: "Estate Clean-Outs",
    tagline: "Respectful, thorough, fast.",
    desc: "Let us handle the heavy lifting during emotional times. We treat every estate with dignity.",
    items: ["Full property cleanouts", "Hoarding situations", "Foreclosure cleanups", "Donation sorting", "Attic clearing"],
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    color: "#7B2D8B",
  },
  {
    id: "commercial",
    icon: <FaBuilding />,
    title: "Commercial Clean-Outs",
    tagline: "Keep your business moving.",
    desc: "Office relocations, retail cleanouts, warehouse junk — handled quickly and professionally.",
    items: ["Office furniture removal", "Retail store cleanouts", "Warehouse clearing", "Renovation debris", "Equipment hauling"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    color: "#1A8C5B",
  },
  {
    id: "yard-debris",
    icon: <FaLeaf />,
    title: "Yard & Debris",
    tagline: "Your yard, spotless again.",
    desc: "Storm cleanup, tree branches, old mulch, scrap metal — if it's outside, we'll take it.",
    items: ["Tree limbs & branches", "Storm debris cleanup", "Old mulch & soil", "Scrap metal removal", "Fence teardown"],
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    color: "#2ECC71",
  },
  {
    id: "appliance",
    icon: <GiSofa />,
    title: "Appliances & Furniture",
    tagline: "Old stuff, gone today.",
    desc: "Single item pickup available. Couches, fridges, washers, mattresses — we take it all.",
    items: ["Couches & sofas", "Refrigerators", "Washers & dryers", "Mattresses", "Old electronics"],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    color: "#E67E22",
  },
];

const process = [
  { step: "01", icon: <FaPhoneAlt />, title: "Call or Book", desc: "Reach out by phone or form. Fast response — usually same day." },
  { step: "02", icon: <FaClock />, title: "We Schedule", desc: "Pick a time that works. We arrive on time, every time." },
  { step: "03", icon: <GiBroom />, title: "We Haul & Clean", desc: "We load everything, sweep up, leave your space spotless." },
  { step: "04", icon: <FaStar />, title: "You Relax", desc: "No stress, no mess. Your space is yours again." },
];

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

const ServiceCard = ({ service, index, inView, darkMode, bgCard, border, textPri, textSec, yellowSoft }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`svc-card fade-up d${(index % 3) + 1} ${inView ? "visible" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? (darkMode ? "#1E1E1E" : service.color + "08") : bgCard,
        borderColor: hovered ? service.color + "55" : border,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 56px ${service.color}15` : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Featured badge */}
      {service.featured && (
        <div className="svc-featured-badge">
          <MdAutoAwesome style={{ fontSize: "10px" }} /> Most Popular
        </div>
      )}

      {/* Top accent bar */}
      <div
        className="svc-top-bar"
        style={{
          background: `linear-gradient(90deg, ${service.color}, ${service.color}88)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      {/* Icon */}
      <div
        className="svc-icon-wrap"
        style={{
          background: hovered ? service.color : (darkMode ? service.color + "20" : service.color + "12"),
          color: hovered ? "#fff" : service.color,
          boxShadow: hovered ? `0 8px 24px ${service.color}40` : "none",
        }}
      >
        {service.icon}
      </div>

      {/* Tagline */}
      <div className="svc-tagline" style={{ color: service.color }}>{service.tagline}</div>

      {/* Title */}
      <h3 className="svc-title" style={{ color: textPri }}>{service.title}</h3>

      {/* Description */}
      <p className="svc-desc" style={{ color: textSec }}>{service.desc}</p>

      {/* Checklist */}
      <ul className="svc-list">
        {service.items.map((item, i) => (
          <li key={i} className="svc-list-item" style={{ color: textSec }}>
            <FaCheckCircle style={{ color: service.color, fontSize: "11px", flexShrink: 0 }} />
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="svc-btn"
        style={{
          background: hovered ? service.color : "transparent",
          color: hovered ? "#fff" : service.color,
          borderColor: service.color + "55",
        }}
      >
        Get a Quote <FaArrowRight style={{ fontSize: "10px", transition: "transform 0.2s" }} />
      </a>
    </div>
  );
};

const Services = () => {
  const { darkMode } = useTheme();
  const [heroRef, heroInView] = useInView(0.1);
  const [cardsRef, cardsInView] = useInView(0.05);
  const [processRef, processInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.1);

  const bg = darkMode ? "#0A0A0A" : "#FAFAF8";
  const bgWhite = darkMode ? "#141414" : "#FFFFFF";
  const textPri = darkMode ? "#FFFFFF" : "#1A1A1A";
  const textSec = darkMode ? "#AAAAAA" : "#666666";
  const border = darkMode ? "rgba(255,255,255,0.06)" : "#F0EDE8";
  const cardBg = darkMode ? "#1A1A1A" : "#FFFFFF";
  const yellowSoft = darkMode ? "rgba(255,225,26,0.12)" : "#FFF9D6";
  const heroBg = darkMode
    ? "linear-gradient(135deg, #1A1A1A 0%, #1A1020 50%, #0F0F0F 100%)"
    : "linear-gradient(135deg, #FFFDF0 0%, #FFF8E7 60%, #F8F0FF 100%)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

        .svc-root { font-family: 'DM Sans', sans-serif; overflow-x: hidden; transition: background 0.4s ease; }

        /* ═══ FADE UP ═══ */
        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.05s; } .d2 { transition-delay: 0.15s; } .d3 { transition-delay: 0.25s; }
        .d4 { transition-delay: 0.35s; } .d5 { transition-delay: 0.45s; } .d6 { transition-delay: 0.55s; }

        /* ═══ EYEBROW ═══ */
        .eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; margin-bottom: 16px; transition: color 0.3s;
        }
        .eyebrow .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: ${PRIMARY_YELLOW};
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,225,26,0.6); }
          50% { box-shadow: 0 0 0 8px rgba(255,225,26,0); }
        }

        /* ═══ SECTION TITLE ═══ */
        .sec-title {
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

        /* ═══ SERVICE CARD ═══ */
        .svc-card {
          border-radius: 22px; border: 1.5px solid;
          padding: 28px 24px 24px; position: relative;
          overflow: hidden; transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          display: flex; flex-direction: column; cursor: default;
        }
        .svc-top-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px; transform-origin: left;
          transition: transform 0.4s ease;
        }
        .svc-featured-badge {
          position: absolute; top: 14px; right: 14px;
          background: ${PRIMARY_YELLOW}; color: #1A1A1A;
          font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; padding: 5px 12px;
          border-radius: 999px; display: flex; align-items: center; gap: 5px;
          z-index: 2;
        }
        .svc-icon-wrap {
          width: 54px; height: 54px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 16px;
          transition: all 0.35s ease;
        }
        .svc-tagline {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 6px;
        }
        .svc-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px; font-weight: 700;
          margin-bottom: 10px; line-height: 1.1; transition: color 0.3s;
        }
        .svc-desc {
          font-size: 14px; line-height: 1.7;
          margin-bottom: 18px; transition: color 0.3s;
        }
        .svc-list {
          list-style: none; padding: 0; margin: 0 0 20px;
          display: flex; flex-direction: column; gap: 8px; flex: 1;
        }
        .svc-list-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 500; transition: color 0.3s;
        }
        .svc-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 999px;
          font-size: 13px; font-weight: 700;
          text-decoration: none; border: 1.5px solid;
          transition: all 0.3s ease; align-self: flex-start;
          letter-spacing: 0.02em;
        }
        .svc-btn:hover { transform: translateX(4px); }

        /* ═══ GRID ═══ */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1100px) { .svc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .svc-grid { grid-template-columns: 1fr; } }

        /* ═══ PROCESS ═══ */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0; position: relative;
        }
        .process-grid::before {
          content: ''; position: absolute;
          top: 36px; left: 12%; right: 12%;
          height: 2px;
          background: repeating-linear-gradient(
            90deg,
            ${PRIMARY_YELLOW} 0px, ${PRIMARY_YELLOW} 6px,
            transparent 6px, transparent 14px
          );
          z-index: 0;
        }
        .process-step {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 0 16px; position: relative; z-index: 1;
        }
        .process-num-wrap {
          width: 72px; height: 72px; border-radius: 50%;
          border: 3px solid ${PRIMARY_YELLOW};
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          margin-bottom: 18px;
          box-shadow: 0 8px 24px rgba(255,225,26,0.25);
          transition: all 0.3s ease;
        }
        .process-step:hover .process-num-wrap {
          background: ${PRIMARY_YELLOW};
          transform: scale(1.08);
          box-shadow: 0 12px 32px rgba(255,225,26,0.4);
        }
        .process-icon {
          font-size: 22px;
          transition: color 0.3s;
        }
        .process-step-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; margin-top: 2px;
          transition: color 0.3s;
        }
        .process-step-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 17px; font-weight: 700;
          margin-bottom: 8px; transition: color 0.3s;
        }
        .process-step-desc {
          font-size: 13px; line-height: 1.65;
          transition: color 0.3s;
        }

        @media (max-width: 768px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); gap: 36px; }
          .process-grid::before { display: none; }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr; }
        }

        /* ═══ TRUST BAR ═══ */
        .trust-bar {
          display: flex; align-items: center;
          justify-content: center; gap: 36px;
          flex-wrap: wrap; padding: 32px 0;
          transition: border-color 0.3s;
        }
        .trust-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; font-weight: 600; transition: color 0.3s;
        }
        .trust-icon-wrap {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; transition: background 0.3s, color 0.3s;
        }

        /* ═══ CTA STRIP ═══ */
        .svc-cta {
          border-radius: 28px; padding: 52px 52px;
          position: relative; overflow: hidden;
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
          flex-wrap: wrap;
          background: linear-gradient(135deg, ${ACCENT_PURPLE} 0%, #2D0A2E 100%);
        }
        .svc-cta::before {
          content: ''; position: absolute;
          right: -80px; top: -80px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,225,26,0.12) 0%, transparent 70%);
        }
        .svc-cta::after {
          content: ''; position: absolute;
          left: 5%; bottom: -30%;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
        }
        .cta-primary-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px; border-radius: 999px;
          font-weight: 700; font-size: 15px;
          background: ${PRIMARY_YELLOW}; color: #1A1A1A;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(255,225,26,0.4);
          transition: all 0.3s ease;
          position: relative; overflow: hidden; z-index: 1;
        }
        .cta-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(255,225,26,0.6);
        }
        .cta-outline-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 28px; border-radius: 999px;
          font-weight: 600; font-size: 14px; color: #fff;
          border: 2px solid rgba(255,255,255,0.3);
          text-decoration: none; transition: all 0.3s;
          z-index: 1; position: relative;
        }
        .cta-outline-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.6);
        }

        @media (max-width: 640px) {
          .svc-cta { padding: 32px 24px; }
          .trust-bar { gap: 20px; }
        }
      `}</style>

      <div className="svc-root" id="services" style={{ background: bg }}>

        {/* ═══════════ HERO HEADER ═══════════ */}
        <section ref={heroRef} style={{ background: heroBg, padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: darkMode ? 0.15 : 0.35,
            backgroundImage: "radial-gradient(circle, #FFE11A 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,225,26,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
              <span className={`eyebrow fade-up ${heroInView ? "visible" : ""}`}
                style={{ color: darkMode ? "#FFE11A" : ACCENT_PURPLE }}>
                <span className="dot" /> What We Do
              </span>
              <h1 className={`sec-title fade-up d1 ${heroInView ? "visible" : ""}`}
                style={{ fontSize: "clamp(38px, 6vw, 64px)", marginBottom: "18px", color: textPri }}>
                Every Job. Every Size.{" "}
                <span style={{ color: darkMode ? "#FFE11A" : ACCENT_PURPLE }}>Done Right.</span>
              </h1>
              <p className={`fade-up d2 ${heroInView ? "visible" : ""}`}
                style={{ fontSize: "17px", color: textSec, lineHeight: 1.7, marginBottom: "28px" }}>
                From a single couch to a full estate cleanout — we show up, work hard,
                and leave your space spotless.
              </p>

              <div className={`trust-bar fade-up d3 ${heroInView ? "visible" : ""}`}
                style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
                {[
                  { icon: <FaClock />, text: "Same-Day Available" },
                  { icon: <FaShieldAlt />, text: "Licensed & Insured" },
                  { icon: <MdRecycling />, text: "Eco-Friendly" },
                  { icon: <FaStar />, text: "5-Star Rated" },
                ].map((t, i) => (
                  <div key={i} className="trust-item" style={{ color: textPri }}>
                    <div className="trust-icon-wrap" style={{ background: yellowSoft, color: darkMode ? PRIMARY_YELLOW : ACCENT_PURPLE }}>{t.icon}</div>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SERVICE CARDS ═══════════ */}
        <section ref={cardsRef} style={{ padding: "64px 0 72px", background: bg }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div className="svc-grid">
              {services.map((svc, i) => (
                <ServiceCard
                  key={svc.id}
                  service={svc}
                  index={i}
                  inView={cardsInView}
                  darkMode={darkMode}
                  bgCard={cardBg}
                  border={border}
                  textPri={textPri}
                  textSec={textSec}
                  yellowSoft={yellowSoft}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        {/* ═══════════ HOW IT WORKS ═══════════ */}
<section ref={processRef} style={{ padding: "72px 0", background: bgWhite, transition: "background 0.3s" }}>
  <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
    <div style={{ textAlign: "center", marginBottom: "60px" }}>
      <span className={`eyebrow fade-up ${processInView ? "visible" : ""}`}
        style={{ color: darkMode ? "#FFE11A" : ACCENT_PURPLE }}>
        <span className="dot" /> Simple Process
      </span>
      <h2 className={`sec-title fade-up d1 ${processInView ? "visible" : ""}`}
        style={{ fontSize: "clamp(28px, 4vw, 48px)", color: textPri }}>
        How It <span className="yellow-mark" style={{ color: textPri }}>Works</span>
      </h2>
      <p className={`fade-up d2 ${processInView ? "visible" : ""}`}
        style={{ fontSize: "16px", color: textSec, maxWidth: "480px", margin: "12px auto 0", lineHeight: 1.7 }}>
        Getting rid of your junk is easier than you think. Just 4 steps.
      </p>
    </div>

    <div className="process-grid">
      {process.map((p, i) => (
        <div key={i} className={`process-step fade-up d${i + 1} ${processInView ? "visible" : ""}`}>
          <div className="process-num-wrap" 
            style={{ 
              background: darkMode ? "#1A1A1A" : "#fff",
              // 🔥 FIX: Dark mode mein yellow icons, light mode mein purple
            }}>
            <span className="process-icon" style={{ 
              color: darkMode ? "#FFE11A" : ACCENT_PURPLE  // ← Yeh line fix hui
            }}>
              {p.icon}
            </span>
            <span className="process-step-num" style={{ color: darkMode ? "#888" : "#999" }}>{p.step}</span>
          </div>
          <div className="process-step-title" style={{ color: textPri }}>{p.title}</div>
          <div className="process-step-desc" style={{ color: textSec }}>{p.desc}</div>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* ═══════════ CTA STRIP ═══════════ */}
        <section ref={ctaRef} style={{ padding: "48px 24px 80px", background: bg }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className={`svc-cta fade-up ${ctaInView ? "visible" : ""}`}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 700, color: "#fff", margin: "0 0 6px", lineHeight: 1.1 }}>
                  Don't See What You Need?
                </p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", margin: 0 }}>
                  Just call — if we can help, we will. Free quotes, no pressure.
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                <a href="tel:+19044303838" className="cta-primary-btn">
                  <FaPhoneAlt /> (904) 430-3838
                </a>
                <a href="#contact" className="cta-outline-btn">
                  Book Online <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;