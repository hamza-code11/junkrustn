import { useEffect, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaTruck,
  FaHandshake,
  FaHeart,
  FaLeaf,
  FaStar,
  FaQuoteLeft,
  FaPhoneAlt,
  FaArrowRight,
  FaUsers,
  FaMapMarkerAlt,
  FaRecycle,
  FaPlay,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import { MdVerified, MdAutoAwesome } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const PRIMARY_YELLOW = "#FFE11A";
const ACCENT_PURPLE = "#4A154B";

const stats = [
  { value: "500+", label: "Jobs Completed", icon: <FaTruck />, suffix: "+" },
  { value: "6", label: "Counties Served", icon: <FaMapMarkerAlt />, suffix: "" },
  { value: "100", label: "Satisfaction Rate", icon: <FaStar />, suffix: "%" },
  { value: "5", label: "Star Rating", icon: <MdVerified />, suffix: "★" },
];

const values = [
  {
    icon: <FaHeart />,
    title: "God First",
    desc: "Our faith guides every decision — from customer care to business ethics.",
    color: "#FF6B6B",
    gradient: "from-red-500/10 to-orange-500/5",
  },
  {
    icon: <FaHandshake />,
    title: "Honest Work",
    desc: "No hidden fees. Fair price upfront. Every single time.",
    color: "#4A154B",
    gradient: "from-purple-500/10 to-pink-500/5",
  },
  {
    icon: <FaUsers />,
    title: "Community Driven",
    desc: "Southeast Tennessee locals who care about our neighbors.",
    color: "#2D7DD2",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: <FaLeaf />,
    title: "Eco Responsible",
    desc: "Donate, recycle, repurpose — less to landfills.",
    color: "#2ECC71",
    gradient: "from-green-500/10 to-emerald-500/5",
  },
];

const reasons = [
  { text: "Same-day & next-day availability", icon: <FaClock /> },
  { text: "Licensed, insured & fully equipped", icon: <FaShieldAlt /> },
  { text: "Upfront pricing — no hidden costs", icon: <FaCheckCircle /> },
  { text: "We handle the heavy lifting for you", icon: <FaTruck /> },
  { text: "Eco-friendly disposal & donations", icon: <FaRecycle /> },
  { text: "Locally owned & operated", icon: <FaMapMarkerAlt /> },
];

const testimonials = [
  {
    quote: "Junk R Us cleared my entire garage in 2 hours. Fair price, super professional!",
    author: "Janice K.",
    location: "Dayton, TN",
    rating: 5,
  },
  {
    quote: "They showed up on time, worked fast, and left my driveway spotless. Highly recommend!",
    author: "Doug F.",
    location: "Evensville, TN",
    rating: 5,
  },
  {
    quote: "Best junk removal service in Southeast TN. I've used them 3 times now!",
    author: "Lianne S.",
    location: "Spring City, TN",
    rating: 5,
  },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, "")) || 0;
    if (num === 0) { setCount(target); return; }
    let start = 0;
    const step = Math.ceil(num / 30);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 40);
    return () => clearInterval(timer);
  }, [inView]);
  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const { darkMode } = useTheme();
  const [storyRef, storyInView] = useInView(0.1);
  const [valuesRef, valuesInView] = useInView(0.1);
  const [whyRef, whyInView] = useInView(0.1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const bg = darkMode ? "#0A0A0A" : "#FAFAF8";
  const bgCard = darkMode ? "#141414" : "#FFFFFF";
  const bgElevated = darkMode ? "#1A1A1A" : "#FFFFFF";
  const textPri = darkMode ? "#FFFFFF" : "#1A1A1A";
  const textSec = darkMode ? "#AAAAAA" : "#666666";
  const border = darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const glassBg = darkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)";
  const yellowSoft = darkMode ? "rgba(255,225,26,0.12)" : "rgba(255,225,26,0.2)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Lora:ital,wght@0,500;1,400&display=swap');

        .about-root { font-family: 'DM Sans', sans-serif; overflow-x: hidden; transition: background 0.4s ease; }

        /* ═══ GLASS CARD ═══ */
        .glass-card {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.15);
        }

        /* ═══ FADE UP ═══ */
        .fade-up {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.1s; } .d2 { transition-delay: 0.2s; }
        .d3 { transition-delay: 0.3s; } .d4 { transition-delay: 0.4s; }
        .d5 { transition-delay: 0.5s; } .d6 { transition-delay: 0.6s; }

        /* ═══ SECTION EYEBROW ═══ */
        .section-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; margin-bottom: 16px;
        }
        .section-eyebrow .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${PRIMARY_YELLOW};
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,225,26,0.6); }
          50% { box-shadow: 0 0 0 8px rgba(255,225,26,0); }
        }

        /* ═══ SECTION TITLE ═══ */
        .section-title {
          font-family: 'Rajdhani', sans-serif; font-weight: 700;
          line-height: 1.05; letter-spacing: -0.02em; transition: color 0.3s;
        }
        .yellow-mark {
          position: relative; display: inline-block;
        }
        .yellow-mark::after {
          content: ''; position: absolute;
          bottom: 2px; left: -4px; right: -4px; height: 12px;
          background: ${PRIMARY_YELLOW}; opacity: 0.35;
          z-index: -1; border-radius: 3px; transform: rotate(-1deg);
        }

        /* ═══ STAT COUNTER CARD ═══ */
        .stat-card {
          text-align: center; padding: 32px 20px; border-radius: 20px;
          position: relative; overflow: hidden; transition: all 0.35s ease;
        }
        .stat-card .stat-bg-icon {
          position: absolute; bottom: -10px; right: -10px;
          font-size: 60px; opacity: 0.06; transition: all 0.35s;
        }
        .stat-card:hover .stat-bg-icon { opacity: 0.12; transform: rotate(-10deg) scale(1.1); }
        .stat-card:hover { transform: translateY(-6px); }
        .stat-icon-wrap {
          width: 52px; height: 52px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px; font-size: 20px;
        }
        .stat-value {
          font-family: 'Rajdhani', sans-serif;
          font-size: 44px; font-weight: 700; line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }

        /* ═══ STORY ═══ */
        .story-img-wrap { position: relative; }
        .story-img-wrap img {
          width: 100%; border-radius: 28px; object-fit: cover;
          height: 480px; transition: all 0.4s;
        }
        .story-img-wrap:hover img { transform: scale(1.02); }
        .floating-badge {
          position: absolute; bottom: -24px; left: -20px;
          background: ${PRIMARY_YELLOW}; border-radius: 20px;
          padding: 18px 24px; box-shadow: 0 16px 40px rgba(255,225,26,0.45);
          z-index: 2; animation: floatBadge 3s ease-in-out infinite;
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .floating-tag {
          position: absolute; top: 24px; right: -12px;
          background: ${ACCENT_PURPLE}; color: #fff;
          padding: 10px 18px; border-radius: 14px;
          font-size: 13px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 10px 30px rgba(74,21,75,0.4);
          z-index: 2;
        }

        /* ═══ QUOTE ═══ */
        .quote-block {
          border-left: 4px solid ${PRIMARY_YELLOW};
          padding: 16px 22px; border-radius: 0 14px 14px 0;
          margin: 28px 0; transition: background 0.3s;
          position: relative;
        }
        .quote-block::before {
          content: '"'; position: absolute; top: -10px; left: 10px;
          font-size: 60px; color: ${PRIMARY_YELLOW}; opacity: 0.2;
          font-family: serif; line-height: 1;
        }

        /* ═══ TESTIMONIAL CAROUSEL ═══ */
        .testimonial-card {
          border-radius: 20px; padding: 32px 28px;
          text-align: center; transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .testimonial-card .stars {
          display: flex; justify-content: center; gap: 4px; margin-bottom: 16px;
        }
        .testimonial-dots { display: flex; gap: 6px; justify-content: center; margin-top: 16px; }
        .testimonial-dot {
          width: 8px; height: 8px; border-radius: 50%;
          border: none; cursor: pointer; transition: all 0.3s;
        }

        /* ═══ VALUE CARDS ═══ */
        .value-card {
          border-radius: 24px; padding: 32px 24px;
          transition: all 0.35s ease; position: relative;
          overflow: hidden;
        }
        .value-card::after {
          content: ''; position: absolute; top: -50%; right: -50%;
          width: 150px; height: 150px; border-radius: 50%;
          transition: all 0.5s ease;
        }
        .value-card:hover::after { transform: scale(2); opacity: 0.03; }
        .value-card:hover { transform: translateY(-8px); }
        .value-icon-wrap {
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; margin-bottom: 18px;
        }

        /* ═══ CHECKLIST ═══ */
        .check-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px; border-radius: 14px;
          transition: all 0.25s ease; cursor: default;
        }
        .check-item:hover { transform: translateX(6px); }
        .check-icon {
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0;
        }

        /* ═══ CTA STRIP ═══ */
        .cta-strip {
          border-radius: 32px; padding: 56px 52px;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, ${ACCENT_PURPLE} 0%, #2D0A2E 100%);
        }
        .cta-strip::before {
          content: ''; position: absolute;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,225,26,0.15) 0%, transparent 70%);
          top: -100px; right: -100px;
        }
        .cta-strip::after {
          content: ''; position: absolute;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,225,26,0.08) 0%, transparent 70%);
          bottom: -50px; left: 10%;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 16px 32px; border-radius: 999px;
          font-weight: 700; font-size: 16px;
          background: ${PRIMARY_YELLOW}; color: #1A1A1A;
          text-decoration: none;
          box-shadow: 0 8px 32px rgba(255,225,26,0.5);
          transition: all 0.3s ease;
        }
        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(255,225,26,0.7);
        }
        .cta-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 28px; border-radius: 999px;
          font-weight: 600; font-size: 15px; color: #fff;
          border: 2px solid rgba(255,255,255,0.3);
          text-decoration: none; transition: all 0.3s;
        }
        .cta-btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.6);
        }

        /* ═══ GRIDS ═══ */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .grid-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

        @media (max-width: 1024px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .grid-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr; gap: 40px; }
          .grid-4 { grid-template-columns: 1fr; }
          .grid-stats { grid-template-columns: repeat(2, 1fr); }
          .cta-strip { padding: 36px 24px; border-radius: 24px; }
          .story-img-wrap img { height: 320px; }
        }
      `}</style>

      <div className="about-root" id="about" style={{ background: bg }}>

        {/* ═══════════ STATS ROW ═══════════ */}
        <section style={{ padding: "70px 0 30px", background: bg }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div className="grid-stats">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`stat-card glass-card fade-up d${i + 1} ${storyRef.current ? "visible" : ""}`}
                  style={{ background: glassBg, border: `1px solid ${border}` }}
                >
                  <div className="stat-bg-icon" style={{ color: darkMode ? "#fff" : "#000" }}>{s.icon}</div>
                  <div className="stat-icon-wrap" style={{ background: yellowSoft, color: darkMode ? PRIMARY_YELLOW : ACCENT_PURPLE }}>
                    {s.icon}
                  </div>
                  <div className="stat-value" style={{ color: textPri }}>
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="stat-label" style={{ color: textSec }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ OUR STORY ═══════════ */}
        <section ref={storyRef} style={{ padding: "50px 0 90px", background: bg }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div className="grid-2">
              {/* Image */}
              <div className={`story-img-wrap fade-up ${storyInView ? "visible" : ""}`}>
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" alt="Junk R Us team" />
                <div className="floating-badge">
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "38px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>5★</div>
                  <div style={{ fontSize: "11px", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em" }}>Rated Service</div>
                </div>
                <div className="floating-tag">
                  <MdVerified style={{ color: PRIMARY_YELLOW, fontSize: "15px" }} />
                  Licensed & Insured
                </div>
              </div>

              {/* Text */}
              <div className={`fade-up d2 ${storyInView ? "visible" : ""}`}>
                <span className="section-eyebrow" style={{ color: darkMode ? "#FFE11A" : ACCENT_PURPLE }}>
                  <span className="dot" /> Who We Are
                </span>
                <h2 className="section-title" style={{ fontSize: "clamp(30px, 4.5vw, 48px)", marginBottom: "22px", color: textPri }}>
                  Southeast Tennessee's{" "}
                  <span style={{ color: darkMode ? "#FFE11A" : ACCENT_PURPLE }}>Trusted</span> Junk Removal
                </h2>

                <p style={{ color: textSec, fontSize: "16px", lineHeight: 1.85, marginBottom: "16px" }}>
                  <strong style={{ color: textPri }}>Junk R Us LLC</strong> is locally owned and proudly serving
                  Rhea, Meigs, Bledsoe, Roane, McMinn, and Bradley counties. We're not a franchise — we're your neighbors.
                </p>

                <div className="quote-block" style={{ background: darkMode ? "rgba(255,225,26,0.04)" : "#FFFDF0" }}>
                  <FaQuoteLeft style={{ color: PRIMARY_YELLOW, fontSize: "18px", marginBottom: "8px" }} />
                  <p style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: "16px", color: darkMode ? "#DDD" : "#333", lineHeight: 1.7, paddingLeft: "8px" }}>
                    "We serve God. We serve people. We serve businesses."
                  </p>
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["Family Owned", "Faith Driven", "Locally Rooted"].map((tag) => (
                    <span key={tag} style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: yellowSoft, border: `1px solid ${PRIMARY_YELLOW}33`,
                      padding: "7px 16px", borderRadius: "999px",
                      fontSize: "13px", fontWeight: 600, color: darkMode ? "#fff" : "#333",
                    }}>
                      <FaCheckCircle style={{ color: PRIMARY_YELLOW, fontSize: "10px" }} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ TESTIMONIAL CAROUSEL ═══════════ */}
        <section style={{ padding: "0 0 70px", background: bg }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
            <div className={`testimonial-card glass-card fade-up`}
              style={{ background: glassBg, border: `1px solid ${border}` }}>
              <div className="stars">
                {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                  <FaStar key={i} style={{ color: PRIMARY_YELLOW, fontSize: "18px" }} />
                ))}
              </div>
              <p style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: "18px", color: textPri, lineHeight: 1.8, marginBottom: "20px" }}>
                "{testimonials[testimonialIndex].quote}"
              </p>
              <p style={{ fontWeight: 700, color: PRIMARY_YELLOW, fontSize: "15px", margin: 0 }}>
                {testimonials[testimonialIndex].author}
              </p>
              <p style={{ color: textSec, fontSize: "13px", margin: "4px 0 0" }}>
                {testimonials[testimonialIndex].location}
              </p>
              <div className="testimonial-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className="testimonial-dot"
                    onClick={() => setTestimonialIndex(i)}
                    style={{
                      background: i === testimonialIndex ? PRIMARY_YELLOW : darkMode ? "#333" : "#DDD",
                      width: i === testimonialIndex ? "24px" : "8px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ OUR VALUES ═══════════ */}
        <section ref={valuesRef} style={{ padding: "70px 0", background: bgElevated }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <span className={`section-eyebrow fade-up ${valuesInView ? "visible" : ""}`}
                style={{ color: darkMode ? "#FFE11A" : ACCENT_PURPLE }}>
                <span className="dot" /> What Drives Us
              </span>
              <h2 className={`section-title fade-up d1 ${valuesInView ? "visible" : ""}`}
                style={{ fontSize: "clamp(30px, 4.5vw, 48px)", color: textPri }}>
                Rooted in <span className="yellow-mark">Values</span>
              </h2>
            </div>

            <div className="grid-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className={`value-card glass-card fade-up d${i + 1} ${valuesInView ? "visible" : ""}`}
                  style={{ background: glassBg, border: `1px solid ${border}` }}
                >
                  <div className="value-icon-wrap" style={{ background: v.color + "18", color: v.color }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "22px", fontWeight: 700, color: textPri, marginBottom: "10px" }}>
                    {v.title}
                  </h3>
                  <p style={{ color: textSec, fontSize: "14px", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ WHY CHOOSE US ═══════════ */}
        <section ref={whyRef} style={{ padding: "70px 0", background: bg }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div className="grid-2">
              <div className={`fade-up ${whyInView ? "visible" : ""}`}>
                <span className="section-eyebrow" style={{ color: darkMode ? "#FFE11A" : ACCENT_PURPLE }}>
                  <span className="dot" /> The Difference
                </span>
                <h2 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "28px", color: textPri }}>
                  Why <span className="yellow-mark">Hundreds</span> Choose Us
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {reasons.map((r, i) => (
                    <div key={i} className={`check-item fade-up d${i + 1} ${whyInView ? "visible" : ""}`}
                      style={{ color: textSec }}
                      onMouseEnter={(e) => e.currentTarget.style.background = yellowSoft}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <div className="check-icon" style={{ background: PRIMARY_YELLOW, color: "#1A1A1A" }}>
                        {r.icon}
                      </div>
                      {r.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className={`fade-up d2 ${whyInView ? "visible" : ""}`} style={{ position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                  alt="Junk removal service"
                  style={{ width: "100%", borderRadius: "28px", height: "400px", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", bottom: "24px", right: "-20px",
                  background: PRIMARY_YELLOW, borderRadius: "18px",
                  padding: "16px 22px", boxShadow: "0 10px 36px rgba(255,225,26,0.5)",
                }}>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "30px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>
                    Same Day
                  </div>
                  <div style={{ fontSize: "11px", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Service Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CTA STRIP ═══════════ */}
        <section style={{ padding: "50px 24px 90px", background: bg }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="cta-strip">
              <div style={{ position: "relative", zIndex: 2 }}>
                <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, color: "#fff", margin: "0 0 8px", lineHeight: 1.1 }}>
                  Ready to <span style={{ color: PRIMARY_YELLOW }}>Reclaim</span> Your Space?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: "0 0 28px" }}>
                  Free quotes. Same-day service. No pressure.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <a href="tel:+19044303838" className="cta-btn-primary">
                    <FaPhoneAlt /> (904) 430-3838
                  </a>
                  <a href="#contact" className="cta-btn-outline">
                    Free Quote <FaArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
