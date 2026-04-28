import { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaCommentDots, FaTimes, FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const PRIMARY_YELLOW = "#FFE11A";
const ACCENT_PURPLE = "#4A154B";

const QUICK_REPLIES = ["Free quote", "Areas served?", "Same day?", "Pricing?"];
const BOT = {
  "free quote": "Call (904) 430-3838 or fill our contact form — we reply within 2 hours! 📞",
  "areas served": "Rhea, Meigs, Bledsoe, Roane, McMinn & Bradley counties 🗺️",
  "same day": "Yes! Same-day & next-day available. Call to check! ⚡",
  "pricing": "By volume — pay only for space your junk takes. No hidden fees! 💰",
};

const FloatingButtons = () => {
  const { darkMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState([{ from: "bot", text: "👋 Need junk gone? Ask us anything!" }]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  // Auto-scroll
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msg]);

  const send = (text) => {
    const txt = (text || input.trim());
    if (!txt) return;
    setMsg((p) => [...p, { from: "user", text: txt }]);
    setInput("");
    setTimeout(() => {
      const key = Object.keys(BOT).find((k) => txt.toLowerCase().includes(k));
      setMsg((p) => [...p, { from: "bot", text: BOT[key] || "Call (904) 430-3838 for immediate help! 📞" }]);
    }, 500);
  };

  const d = darkMode;
  const c = {
    bg: d ? "#1A1A1A" : "#fff",
    body: d ? "#141414" : "#F7F7F5",
    header: ACCENT_PURPLE,
    botBg: d ? "#252525" : "#fff",
    botBorder: d ? "#333" : "#E8E5DF",
    botText: d ? "#CCC" : "#333",
    userBg: PRIMARY_YELLOW,
    userText: "#1A1A1A",
    inputBg: d ? "#252525" : "#fff",
    inputBorder: d ? "#333" : "#DDD",
    quickBg: d ? "#1A1A1A" : "#fff",
    quickBorder: d ? "#333" : "#EEE",
    quickBtnBg: d ? "#252525" : "#fff",
    quickBtnBorder: d ? "#444" : "#DDD",
    quickBtnText: d ? "#AAA" : "#555",
  };

  return (
    <>
      <style>{`
        .fb-root { position:fixed; bottom:24px; right:24px; z-index:99999; display:flex; flex-direction:column; gap:12px; align-items:flex-end; }
        .fb-btn { width:52px; height:52px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:22px; color:#fff; text-decoration:none; box-shadow:0 6px 20px rgba(0,0,0,0.25); transition:all 0.3s; position:relative; }
        .fb-btn:hover { transform:translateY(-3px) scale(1.06); }
        .fb-btn:active { transform:scale(0.94); }
        .fb-wa { background:#25D366; }
        .fb-wa:hover { background:#1DA851; box-shadow:0 8px 28px rgba(37,211,102,0.5); }
        .fb-ch { background:${ACCENT_PURPLE}; }
        .fb-ch:hover { background:#3A103B; box-shadow:0 8px 28px rgba(74,21,75,0.5); }
        .fb-ch.open { background:#E74C3C; }
        .fb-ch.open:hover { background:#C0392B; }

        .fb-win { width:340px; max-height:440px; border-radius:18px; box-shadow:0 16px 48px rgba(0,0,0,0.25); overflow:hidden; display:flex; flex-direction:column; animation:fbSlide 0.3s ease-out; }
        @keyframes fbSlide { from { opacity:0; transform:translateY(16px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }

        .fb-hdr { padding:14px 16px; display:flex; align-items:center; justify-content:space-between; }
        .fb-hdr-l { display:flex; align-items:center; gap:10px; }
        .fb-av { width:36px; height:36px; border-radius:50%; background:${PRIMARY_YELLOW}; display:flex; align-items:center; justify-content:center; color:#1A1A1A; font-size:15px; }
        .fb-hdr-t { font-weight:700; font-size:14px; font-family:sans-serif; }
        .fb-hdr-s { font-size:10px; opacity:0.7; display:flex; align-items:center; gap:4px; }
        .fb-dot { width:6px; height:6px; border-radius:50%; background:#2ECC71; }
        .fb-cls { background:none; border:none; color:#fff; font-size:16px; cursor:pointer; padding:4px 8px; border-radius:4px; opacity:0.7; }
        .fb-cls:hover { opacity:1; background:rgba(255,255,255,0.12); }

        .fb-body { flex:1; overflow-y:auto; padding:10px 12px; display:flex; flex-direction:column; gap:6px; max-height:240px; }
        .fb-body::-webkit-scrollbar { width:3px; }
        .fb-body::-webkit-scrollbar-thumb { background:#CCC; border-radius:3px; }
        .fb-m { max-width:84%; padding:8px 12px; border-radius:12px; font-size:12px; line-height:1.5; font-family:sans-serif; animation:fbPop 0.25s ease-out; }
        @keyframes fbPop { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .fb-m.bot { align-self:flex-start; border-bottom-left-radius:2px; }
        .fb-m.user { align-self:flex-end; border-bottom-right-radius:2px; font-weight:500; }

        .fb-q { display:flex; flex-wrap:wrap; gap:5px; padding:8px 10px; border-top:1px solid; }
        .fb-qb { padding:5px 10px; border-radius:999px; border:1px solid; font-size:10px; cursor:pointer; font-family:sans-serif; transition:all 0.2s; }
        .fb-qb:hover { background:${PRIMARY_YELLOW}; border-color:${PRIMARY_YELLOW}; color:#1A1A1A; }

        .fb-in { display:flex; align-items:center; gap:5px; padding:8px 10px; border-top:1px solid; }
        .fb-inp { flex:1; border:1px solid; border-radius:999px; padding:8px 12px; font-size:12px; outline:none; font-family:sans-serif; }
        .fb-snd { width:34px; height:34px; border-radius:50%; background:${PRIMARY_YELLOW}; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#1A1A1A; font-size:13px; flex-shrink:0; transition:all 0.2s; }
        .fb-snd:hover { background:${ACCENT_PURPLE}; color:#fff; }

        @media(max-width:480px) {
          .fb-root { bottom:12px; right:12px; gap:10px; }
          .fb-btn { width:44px; height:44px; font-size:19px; }
          .fb-win { width:calc(100vw - 24px); max-width:340px; }
        }
      `}</style>

      <div className="fb-root">
        {open && (
          <div className="fb-win" style={{ background: c.bg }}>
            <div className="fb-hdr" style={{ background: c.header, color: "#fff" }}>
              <div className="fb-hdr-l">
                <div className="fb-av"><FaRobot /></div>
                <div>
                  <div className="fb-hdr-t">Junk R Us</div>
                  <div className="fb-hdr-s"><span className="fb-dot" />Online now</div>
                </div>
              </div>
              <button className="fb-cls" onClick={() => setOpen(false)}><FaTimes /></button>
            </div>
            <div className="fb-body" ref={bodyRef} style={{ background: c.body }}>
              {msg.map((m, i) => (
                <div key={i} className={`fb-m ${m.from}`}
                  style={m.from === "bot" ? { background: c.botBg, border: `1px solid ${c.botBorder}`, color: c.botText } : { background: c.userBg, color: c.userText }}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="fb-q" style={{ background: c.quickBg, borderTopColor: c.quickBorder }}>
              {QUICK_REPLIES.map((q, i) => (
                <button key={i} className="fb-qb" onClick={() => send(q)}
                  style={{ background: c.quickBtnBg, borderColor: c.quickBtnBorder, color: c.quickBtnText }}>{q}</button>
              ))}
            </div>
            <div className="fb-in" style={{ background: c.bg, borderTopColor: c.quickBorder }}>
              <input className="fb-inp" placeholder="Type..." value={input}
                style={{ background: c.inputBg, borderColor: c.inputBorder, color: c.botText }}
                onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
              <button className="fb-snd" onClick={() => send()}><FaPaperPlane /></button>
            </div>
          </div>
        )}

        <a href="https://wa.me/19044303838?text=Hi%20Junk%20R%20Us!%20I%20need%20help%20with%20junk%20removal."
          target="_blank" rel="noopener noreferrer" className="fb-btn fb-wa" title="WhatsApp">
          <FaWhatsapp />
        </a>

        <button className={`fb-btn fb-ch ${open ? "open" : ""}`} onClick={() => setOpen(!open)}
          title={open ? "Close" : "Chat"}>
          {open ? <FaTimes /> : <FaCommentDots />}
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;