import { useState, useEffect, useCallback } from "react";
import {
  FaPhoneAlt, FaTruck, FaStar, FaArrowRight,
  FaCheckCircle, FaChevronLeft, FaChevronRight,
} from "react-icons/fa";
import { MdLocalOffer, MdOutlineCleaningServices } from "react-icons/md";

// ═══════════ THEME ═══════════
const PRIMARY_YELLOW = "#FFE11A";
const ACCENT_PURPLE = "#4A154B";

// ═══════════ SLIDES — LOCAL IMAGES ═══════════
const slides = [
  {
    // 🔴 CLIENT KI REAL IMAGE KA PATH
    image: "/hero/slide-1.jpg",
    // Fallback agar image load na ho
    fallback: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    tagline: "We Haul It All Away",
    heading: "Need Junk",
    highlight: "Gone?",
    sub: "Fast, affordable junk removal across Southeast Tennessee.",
  },
  {
    image: "/hero/slide-2.jpg",
    fallback: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
    tagline: "Your Space. Reclaimed.",
    heading: "We Move",
    highlight: "Treasure.",
    sub: "Careful, reliable moving help for your home or business.",
  },
  {
    image: "/hero/slide-3.jpg",
    fallback: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80",
    tagline: "Trusted Since Day One",
    heading: "Clean Outs",
    highlight: "Done Right.",
    sub: "Estate cleanouts, hoarding cleanups, yard debris — we handle it.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  // 🔴 Track which images failed to load
  const [failedImages, setFailedImages] = useState({});

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => goTo("next"), 5000);
    return () => clearInterval(timer);
  }, [current, animating]);

  const goTo = useCallback((dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "next"
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length
      );
      setAnimating(false);
    }, 600);
  }, [animating]);

  const goToSlide = (index) => {
    if (animating || index === current) return;
    setDirection(index > current ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 600);
  };

  // Touch swipe
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? "next" : "prev");
    setTouchStart(null);
  };

  // Handle image load error — switch to fallback
  const handleImageError = (index) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  const slide = slides[current];
  const useFallback = failedImages[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

        * { box-sizing: border-box; }

        .hero-heading {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 700;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }
        @media (max-width: 480px) {
          .hero-heading { font-size: clamp(2rem, 12vw, 3.5rem); }
        }

        .hero-subheading {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(1.4rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #FFE11A;
          margin-bottom: 1rem;
          text-shadow: 0 0 30px rgba(255,225,26,0.25);
        }
        @media (max-width: 480px) {
          .hero-subheading { font-size: clamp(1.1rem, 6vw, 1.8rem); }
        }

        .hero-tagline {
          color: #FFE11A;
          font-size: clamp(0.9rem, 2.5vw, 1.4rem);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        @media (max-width: 480px) {
          .hero-tagline { font-size: 0.85rem; }
        }

        .hero-sub {
          color: rgba(255,255,255,0.65);
          font-size: clamp(0.85rem, 1.8vw, 1.05rem);
          max-width: 500px;
          margin: 0 auto 0.75rem;
        }
        @media (max-width: 480px) {
          .hero-sub { font-size: 0.8rem; padding: 0 10px; }
        }

        /* ═══ BACKGROUND ═══ */
        .hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.4);
          transition: opacity 0.7s ease;
        }
        .hero-bg.enter-next { animation: bgEnterNext 0.7s ease forwards; }
        .hero-bg.enter-prev { animation: bgEnterPrev 0.7s ease forwards; }
        .hero-bg-active { animation: kenBurns 8s ease-in-out infinite alternate; }

        @keyframes bgEnterNext {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bgEnterPrev {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }

        /* ═══ CONTENT ANIMATIONS ═══ */
        .hero-content-wrap {
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .hero-content-wrap.fading {
          opacity: 0;
          transform: translateY(18px);
        }
        .hero-content-wrap.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim { opacity: 0; animation: slideUp 0.7s ease forwards; }
        .anim-0 { animation-delay: 0.05s; }
        .anim-1 { animation-delay: 0.15s; }
        .anim-2 { animation-delay: 0.25s; }
        .anim-3 { animation-delay: 0.35s; }
        .anim-4 { animation-delay: 0.45s; }
        .anim-5 { animation-delay: 0.55s; }
        .anim-6 { animation-delay: 0.65s; }

        /* ═══ CTA BUTTONS ═══ */
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: clamp(12px, 2vw, 16px) clamp(24px, 4vw, 36px);
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(14px, 2vw, 17px);
          background: #FFE11A;
          color: #1A1A1A;
          text-decoration: none;
          box-shadow: 0 6px 28px rgba(255,225,26,0.45);
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }
        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(255,225,26,0.55);
        }
        .cta-primary .shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .cta-primary:hover .shine { transform: translateX(100%); }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: clamp(12px, 2vw, 16px) clamp(20px, 3vw, 32px);
          border-radius: 999px;
          font-weight: 600;
          font-size: clamp(13px, 1.8vw, 15px);
          color: #FFE11A;
          border: 1.5px solid rgba(255,225,26,0.4);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .cta-secondary:hover {
          background: rgba(255,225,26,0.12);
          border-color: rgba(255,225,26,0.7);
          transform: translateY(-2px);
        }

        /* ═══ BADGES ═══ */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 6px 16px;
          color: rgba(255,255,255,0.9);
          font-size: clamp(11px, 1.5vw, 13px);
          font-weight: 500;
          letter-spacing: 0.04em;
        }
        @media (max-width: 480px) {
          .hero-badge { padding: 5px 12px; font-size: 11px; gap: 5px; }
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 6px 14px;
          color: rgba(255,255,255,0.8);
          font-size: clamp(11px, 1.4vw, 13px);
          font-weight: 500;
          transition: all 0.2s;
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .trust-badge { padding: 5px 10px; font-size: 10px; gap: 4px; }
        }

        /* ═══ SLIDER CONTROLS ═══ */
        .arrow-btn {
          width: clamp(36px, 5vw, 44px);
          height: clamp(36px, 5vw, 44px);
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          color: #fff;
          font-size: clamp(12px, 2vw, 14px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .arrow-btn:hover {
          background: #FFE11A;
          border-color: #FFE11A;
          color: #1A1A1A;
          transform: scale(1.08);
        }

        .slide-dot {
          width: clamp(6px, 1vw, 8px);
          height: clamp(6px, 1vw, 8px);
          border-radius: 999px;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }
        .slide-dot.active {
          width: clamp(22px, 3vw, 28px);
          background: #FFE11A;
        }

        /* ═══ DECORATIVE ICONS ═══ */
        .deco-truck {
          position: absolute;
          top: 6%;
          left: 3%;
          z-index: 10;
          pointer-events: none;
          opacity: 0.07;
          font-size: clamp(100px, 15vw, 220px);
          color: #FFE11A;
        }
        .deco-star {
          position: absolute;
          bottom: 10%;
          right: 3%;
          z-index: 10;
          pointer-events: none;
          opacity: 0.05;
          font-size: clamp(80px, 12vw, 160px);
          color: #FFE11A;
        }
        @media (max-width: 640px) {
          .deco-truck, .deco-star { display: none; }
        }

        /* ═══ ANIMATIONS ═══ */
        @keyframes phoneBounce {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(-12deg); }
          75% { transform: rotate(12deg); }
        }
        .phone-ring { animation: phoneBounce 1.8s ease-in-out infinite; }

        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }

        .underline-wave {
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
        }
        @media (max-width: 480px) {
          .underline-wave { bottom: -2px; }
        }
      `}</style>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section
        className="relative min-h-[100svh] flex items-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ═══ BACKGROUND IMAGE (Local + Fallback) ═══ */}
        <div
          key={current}
          className={`hero-bg hero-bg-active ${animating ? `enter-${direction}` : ""}`}
          style={{
            backgroundImage: `url('${useFallback ? slide.fallback : slide.image}')`,
          }}
        />
        {/* Hidden img tag to detect if local image loads */}
        <img
          src={slide.image}
          alt=""
          style={{ display: "none" }}
          onError={() => handleImageError(current)}
          key={`img-test-${current}`}
        />

        {/* ═══ GRADIENT OVERLAY ═══ */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(135deg, ${ACCENT_PURPLE}DD 0%, rgba(0,0,0,0.88) 50%, ${ACCENT_PURPLE}99 100%)`,
          }}
        />

        {/* ═══ DECORATIVE ICONS ═══ */}
        <FaTruck className="deco-truck" />
        <FaStar className="deco-star" />

        {/* ═══ MAIN CONTENT ═══ */}
        <div
          className={`hero-content-wrap relative z-20 w-full max-w-6xl mx-auto text-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 ${
            animating ? "fading" : "visible"
          }`}
          key={`content-${current}`}
        >
          {/* Badge */}
          <div className="anim anim-0" style={{ marginBottom: "clamp(12px, 2vw, 20px)" }}>
            <span className="hero-badge">
              <FaCheckCircle style={{ color: PRIMARY_YELLOW }} />
              {slide.tagline}
            </span>
          </div>

          {/* Tagline */}
          <p className="hero-tagline anim anim-1">
            We can haul off your junk or safely move your treasure.
          </p>
          <p
            className="anim anim-2"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
              marginBottom: "clamp(12px, 2vw, 20px)",
            }}
          >
            How can we help today?
          </p>

          {/* Main Heading */}
          <h1 className="hero-heading anim anim-3">
            {slide.heading}{" "}
            <span style={{ color: PRIMARY_YELLOW, position: "relative", display: "inline-block" }}>
              {slide.highlight}
              <svg className="underline-wave" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path
                  d="M0,5 Q25,1 50,5 Q75,9 100,5"
                  stroke={PRIMARY_YELLOW}
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.7"
                />
              </svg>
            </span>
          </h1>

          {/* Sub Heading */}
          <h2 className="hero-subheading anim anim-4">
            Junk R Us is Your Solution!
          </h2>

          {/* Slide Description */}
          <p className="hero-sub anim anim-5">{slide.sub}</p>

          {/* Counties */}
          <div
            className="anim anim-5"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "clamp(20px, 3vw, 32px)",
              flexWrap: "wrap",
            }}
          >
            <MdLocalOffer style={{ color: PRIMARY_YELLOW, fontSize: "clamp(14px, 2vw, 18px)", flexShrink: 0 }} />
            <p style={{
              color: "rgba(200,200,200,0.8)",
              fontSize: "clamp(0.7rem, 1.4vw, 0.94rem)",
              margin: 0,
            }}>
              <strong style={{ color: "#fff" }}>
                Rhea • Meigs • Bledsoe • Roane • McMinn • Bradley
              </strong>{" "}
              Counties
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="anim anim-6"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(8px, 1.5vw, 14px)",
              justifyContent: "center",
              marginBottom: "clamp(20px, 3vw, 36px)",
            }}
          >
            <a href="tel:+19044303838" className="cta-primary">
              <div className="shine" />
              <FaPhoneAlt className="phone-ring" style={{ position: "relative", zIndex: 1 }} />
              <span style={{ position: "relative", zIndex: 1 }}>(904) 430-3838</span>
            </a>
            <a href="#how-it-works" className="cta-secondary">
              How It Works
              <FaArrowRight style={{ transition: "transform 0.2s" }} />
            </a>
          </div>

          {/* Trust Badges */}
          <div
            className="anim anim-6"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "clamp(6px, 1vw, 10px)",
            }}
          >
            {[
              { icon: <FaStar />, text: "5-Star Service" },
              { icon: <MdOutlineCleaningServices />, text: "Spotless Finish" },
              { icon: <FaCheckCircle />, text: "100% Satisfaction" },
            ].map((b, i) => (
              <div key={i} className="trust-badge">
                <span style={{ color: PRIMARY_YELLOW }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ SLIDER CONTROLS ═══ */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(20px, 4vw, 32px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 2vw, 16px)",
          }}
        >
          <button className="arrow-btn" onClick={() => goTo("prev")} aria-label="Previous slide">
            <FaChevronLeft />
          </button>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div style={{ display: "flex", gap: "clamp(4px, 1vw, 6px)" }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`slide-dot ${i === current ? "active" : ""}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(10px, 1.5vw, 13px)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.1em",
              }}
            >
              <span style={{ color: PRIMARY_YELLOW }}>{current + 1}</span> / {slides.length}
            </span>
          </div>

          <button className="arrow-btn" onClick={() => goTo("next")} aria-label="Next slide">
            <FaChevronRight />
          </button>
        </div>

        {/* ═══ PROGRESS BAR ═══ */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "3px",
            width: "100%",
            background: "rgba(255,255,255,0.1)",
            zIndex: 30,
          }}
        >
          <div
            key={`progress-${current}`}
            style={{
              height: "100%",
              background: PRIMARY_YELLOW,
              animation: "progressBar 5s linear forwards",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;