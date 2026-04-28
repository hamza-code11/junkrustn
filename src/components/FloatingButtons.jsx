import { useState } from "react";
import { FaWhatsapp, FaCommentDots, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";

const PRIMARY_YELLOW = "#FFE11A";
const ACCENT_PURPLE = "#4A154B";

const FloatingButtons = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hey there! Need junk gone? Ask us anything — we're here to help!",
    },
  ]);
  const [input, setInput] = useState("");

  const quickReplies = [
    "Get a free quote",
    "What areas do you serve?",
    "Same day service?",
    "How pricing works",
  ];

  const botResponses = {
    "get a free quote":
      "Sure! Call us at (904) 430-3838 or fill out our contact form. We'll get back to you within 2 hours! 📞",
    "what areas do you serve":
      "We proudly serve Rhea, Meigs, Bledsoe, Roane, McMinn, and Bradley counties in Southeast Tennessee! 🗺️",
    "same day service":
      "Yes! We offer same-day and next-day service in most cases. Call now to check availability! ⚡",
    "how pricing works":
      "We charge by volume — you only pay for the space your junk takes up in our truck. No hidden fees, upfront pricing! 💰",
  };

  const handleSend = (text) => {
    const msgToSend = text || input.trim();
    if (!msgToSend) return;

    setMessages((prev) => [...prev, { from: "user", text: msgToSend }]);
    setInput("");

    setTimeout(() => {
      const lowerMsg = msgToSend.toLowerCase();
      let reply =
        "Thanks for your message! For immediate help, call us at (904) 430-3838. We're available Mon-Sat, 7AM-7PM! 📞";

      Object.keys(botResponses).forEach((key) => {
        if (lowerMsg.includes(key)) {
          reply = botResponses[key];
        }
      });

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* ═══════════════ INLINE STYLES (No external CSS dependency) ═══════════════ */}
      <style>{`
        .fb-container {
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          z-index: 99999 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 14px !important;
          align-items: flex-end !important;
        }

        .fb-btn {
          width: 56px !important;
          height: 56px !important;
          border-radius: 50% !important;
          border: none !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 26px !important;
          color: #fff !important;
          text-decoration: none !important;
          box-shadow: 0 6px 24px rgba(0,0,0,0.2) !important;
          transition: all 0.3s ease !important;
          position: relative !important;
        }
        .fb-btn:hover {
          transform: translateY(-3px) scale(1.05) !important;
        }

        .fb-whatsapp {
          background: #25D366 !important;
        }
        .fb-whatsapp:hover {
          background: #1DA851 !important;
        }

        .fb-chat {
          background: #4A154B !important;
        }
        .fb-chat:hover {
          background: #3A103B !important;
        }
        .fb-chat.open {
          background: #E74C3C !important;
        }

        /* Chat Window */
        .fb-chat-window {
          width: 340px !important;
          max-height: 460px !important;
          background: #fff !important;
          border-radius: 16px !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.2) !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
          margin-bottom: 6px !important;
        }

        .fb-chat-header {
          background: #4A154B !important;
          color: #fff !important;
          padding: 14px 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
        }
        .fb-chat-header-left {
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
        }
        .fb-avatar {
          width: 38px !important;
          height: 38px !important;
          border-radius: 50% !important;
          background: #FFE11A !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #1A1A1A !important;
          font-size: 16px !important;
        }
        .fb-chat-title {
          font-weight: 700 !important;
          font-size: 15px !important;
          font-family: sans-serif !important;
        }
        .fb-online {
          font-size: 11px !important;
          color: rgba(255,255,255,0.7) !important;
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
        }
        .fb-online-dot {
          width: 7px !important;
          height: 7px !important;
          border-radius: 50% !important;
          background: #2ECC71 !important;
        }
        .fb-close-btn {
          background: none !important;
          border: none !important;
          color: #fff !important;
          font-size: 18px !important;
          cursor: pointer !important;
          padding: 4px 8px !important;
          border-radius: 4px !important;
        }
        .fb-close-btn:hover {
          background: rgba(255,255,255,0.15) !important;
        }

        .fb-chat-body {
          flex: 1 !important;
          overflow-y: auto !important;
          padding: 12px 14px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
          max-height: 250px !important;
          background: #F7F7F5 !important;
        }

        .fb-msg {
          max-width: 82% !important;
          padding: 10px 14px !important;
          border-radius: 14px !important;
          font-size: 13px !important;
          line-height: 1.5 !important;
          font-family: sans-serif !important;
        }
        .fb-msg.bot {
          background: #fff !important;
          border: 1px solid #E8E5DF !important;
          align-self: flex-start !important;
          color: #333 !important;
        }
        .fb-msg.user {
          background: #FFE11A !important;
          align-self: flex-end !important;
          color: #1A1A1A !important;
          font-weight: 500 !important;
        }

        .fb-quick-replies {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 6px !important;
          padding: 8px 12px !important;
          background: #fff !important;
          border-top: 1px solid #EEE !important;
        }
        .fb-quick-btn {
          padding: 6px 12px !important;
          border-radius: 999px !important;
          border: 1px solid #DDD !important;
          background: #fff !important;
          font-size: 11px !important;
          cursor: pointer !important;
          color: #555 !important;
          font-family: sans-serif !important;
        }
        .fb-quick-btn:hover {
          background: #FFE11A !important;
          border-color: #FFE11A !important;
          color: #1A1A1A !important;
        }

        .fb-input-wrap {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 10px 12px !important;
          background: #fff !important;
          border-top: 1px solid #EEE !important;
        }
        .fb-input {
          flex: 1 !important;
          border: 1px solid #DDD !important;
          border-radius: 999px !important;
          padding: 10px 14px !important;
          font-size: 13px !important;
          outline: none !important;
          font-family: sans-serif !important;
        }
        .fb-input:focus {
          border-color: #FFE11A !important;
        }
        .fb-send-btn {
          width: 38px !important;
          height: 38px !important;
          border-radius: 50% !important;
          background: #FFE11A !important;
          border: none !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #1A1A1A !important;
          font-size: 14px !important;
        }

        @media (max-width: 480px) {
          .fb-container {
            bottom: 14px !important;
            right: 14px !important;
          }
          .fb-btn {
            width: 48px !important;
            height: 48px !important;
            font-size: 22px !important;
          }
          .fb-chat-window {
            width: calc(100vw - 28px) !important;
            max-width: 340px !important;
          }
        }
      `}</style>

      {/* ═══════════════ FLOATING BUTTONS ═══════════════ */}
      <div className="fb-container">
        {/* Chat Window */}
        {chatOpen && (
          <div className="fb-chat-window">
            {/* Header */}
            <div className="fb-chat-header">
              <div className="fb-chat-header-left">
                <div className="fb-avatar">
                  <FaUser />
                </div>
                <div>
                  <div className="fb-chat-title">Junk R Us</div>
                  <div className="fb-online">
                    <span className="fb-online-dot" />
                    Online — replies fast
                  </div>
                </div>
              </div>
              <button className="fb-close-btn" onClick={() => setChatOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="fb-chat-body">
              {messages.map((msg, i) => (
                <div key={i} className={`fb-msg ${msg.from}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="fb-quick-replies">
              {quickReplies.map((qr, i) => (
                <button
                  key={i}
                  className="fb-quick-btn"
                  onClick={() => handleSend(qr)}
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="fb-input-wrap">
              <input
                type="text"
                className="fb-input"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="fb-send-btn" onClick={() => handleSend()}>
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}

        {/* ═══ WHATSAPP BUTTON ═══ */}
        <a
          href="https://wa.me/19044303838?text=Hi%20Junk%20R%20Us!%20I%20need%20help%20with%20junk%20removal."
          target="_blank"
          rel="noopener noreferrer"
          className="fb-btn fb-whatsapp"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>

        {/* ═══ CHAT BUTTON ═══ */}
        <button
          className={`fb-btn fb-chat ${chatOpen ? "open" : ""}`}
          onClick={() => setChatOpen(!chatOpen)}
          title={chatOpen ? "Close chat" : "Chat with us"}
          aria-label={chatOpen ? "Close chat" : "Chat with us"}
        >
          {chatOpen ? <FaTimes /> : <FaCommentDots />}
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;