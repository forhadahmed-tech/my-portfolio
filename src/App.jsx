import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = {
  Frontend: ["Next.js", "React", "Redux", "Zustand", "React Query", "PWA"],
  Backend: ["Node.js", "Next.js API", "REST APIs"],
  Database: ["MySQL", "MongoDB", "Redis"],
  DevOps: ["Docker", "CI/CD", "AWS"],
  Core: ["JavaScript", "DSA", "System Design"],
  Architecture: ["Microservices", "Monorepo", "Caching", "BullMQ"],
};

const EXPERIENCES = [
  {
    company: "Apex Holdings Limited",
    role: "Lead Software Engineer",
    sub: "ERP & DevOps",
    period: "Dec 2024 – Present",
    stack: ["Next.js", "Node.js", "Redis", "Redux", "Docker", "CI/CD", "ACL"],
    points: [
      "Led full-cycle architecture for ABBL and ACFL ERP systems, improving process automation.",
      "Maintained Andron — a centralized authentication and RBAC system.",
      "Developed Fusion, a utility management suite streamlining inter-departmental workflows.",
      "Built Apex Stream — video training system with transcoding and Redis-based caching.",
      "Designed and managed CI/CD pipelines for multi-project deployment.",
      "Mentored engineers and standardized reusable component and API practices.",
    ],
  },
  {
    company: "Fanfare Bangladesh Limited",
    role: "Software Engineer",
    sub: "Frontend-Backend Integration",
    period: "2022 – 2024",
    stack: ["Next.js", "Redux", "Node.js", "Redis"],
    points: [
      "Developed Admin Dashboard for the Fanfare mobile platform.",
      "Implemented 2FA, ACL, and RBAC for secure user management.",
      "Enhanced performance via code splitting, caching, and optimization.",
      "Collaborated with backend teams on API architecture and scalability.",
    ],
  },
  {
    company: "Datasoft Systems Bangladesh Limited",
    role: "Software Developer",
    sub: "Automation Project",
    period: "2021 – 2022",
    stack: ["React", "Node.js"],
    points: [
      "Contributed to digitization of Chittagong Port operations.",
      "Integrated Node.js APIs with React-based control panels.",
      "Focused on data synchronization, validation, and frontend performance.",
    ],
  },
];

// ── Replace liveUrl & screenshot per project when ready ──────────────────────
const PROJECTS = [
  {
    name: "Ecommerce Platform",
    icon: "🛍",
    stack: ["Next.js", "PWA", "Node.js", "Zustand", "React Query", "Redis", "BullMQ", "FFmpeg"],
    points: [
      "Led a 3-member team to build a modern PWA eCommerce solution.",
      "AI-integrated product recommendations and chat SDK.",
      "Backend queue processing with BullMQ and Redis caching.",
    ],
    liveUrl: "https://your-ecommerce-demo.com",
    screenshot: null, // replace with image URL string
  },
  {
    name: "RPA Automation System",
    icon: "🤖",
    stack: ["Monorepo", "Next.js", "Node.js", "Playwright", "BullMQ", "Redis", "Transformer.js"],
    points: [
      "Built automation framework for form submissions and data extraction via Playwright.",
      "Scalable worker queue management with future LLM-based automation integration.",
    ],
    liveUrl: "https://your-rpa-demo.com",
    screenshot: null,
  },
  {
    name: "Apex Bio-Fertilizer ERP",
    icon: "🌿",
    stack: ["Next.js", "Node.js", "Redis", "Docker", "CI/CD"],
    points: [
      "End-to-end ERP system streamlining fertilizer business operations.",
      "Built Andron auth system and Fusion utility suite as sub-products.",
    ],
    liveUrl: "https://your-erp-demo.com",
    screenshot: null,
  },
  {
    name: "Fanfare Social App",
    icon: "🎉",
    stack: ["Next.js", "Redux", "Node.js"],
    points: [
      "One of Bangladesh's first recreation-focused social media platforms.",
      "Full admin dashboard with 2FA, ACL, RBAC and performance optimizations.",
    ],
    liveUrl: "https://your-fanfare-demo.com",
    screenshot: null,
  },
];

// ─── helpers ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
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
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function SectionHeader({ index, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 52 }}>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#e8ff47", letterSpacing: 2 }}>{index}</div>
      <div style={{ flex: 1, height: 1, background: "rgba(232,255,71,0.18)" }} />
      <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(2rem,6vw,4.5rem)", color: "#fff", margin: 0, letterSpacing: 2 }}>{title}</h2>
    </div>
  );
}

// ─── custom cursor (desktop only) ────────────────────────────────────────────

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    const m  = (e) => setPos({ x: e.clientX, y: e.clientY });
    const ov = (e) => setHov(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", m);
    window.addEventListener("mouseover", ov);
    return () => { window.removeEventListener("mousemove", m); window.removeEventListener("mouseover", ov); };
  }, []);
  return (
    <>
      <div style={{ position: "fixed", left: pos.x - 5, top: pos.y - 5, width: 10, height: 10, background: "#e8ff47", borderRadius: "50%", pointerEvents: "none", zIndex: 9999 }} />
      <div style={{ position: "fixed", left: pos.x - (hov ? 28 : 20), top: pos.y - (hov ? 28 : 20), width: hov ? 56 : 40, height: hov ? 56 : 40, border: `1.5px solid ${hov ? "#e8ff47" : "rgba(232,255,71,0.4)"}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transition: "left 0.08s,top 0.08s,width 0.2s,height 0.2s,border-color 0.2s" }} />
    </>
  );
}

// ─── navbar ───────────────────────────────────────────────────────────────────

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (l) => { setActive(l); setOpen(false); };

  // Bar style helper
  const bar = (rotate, ty, opacity = 1) => ({
    display: "block", width: 22, height: 2, background: "#e8ff47",
    transition: "transform 0.3s, opacity 0.3s",
    transform: rotate ? `rotate(${rotate}deg) translate(${ty})` : "none",
    opacity,
  });

  return (
    <>
      <style>{`
        .fa-desktop-nav { display: flex !important; }
        .fa-hamburger   { display: none !important; }
        @media (max-width: 768px) {
          .fa-desktop-nav { display: none !important; }
          .fa-hamburger   { display: flex !important; }
        }
      `}</style>

      {/* Bar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, padding: "0 clamp(1.2rem,5vw,4rem)", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled || open ? "rgba(10,10,10,0.96)" : "transparent", backdropFilter: scrolled || open ? "blur(14px)" : "none", borderBottom: scrolled && !open ? "1px solid rgba(232,255,71,0.1)" : "none", transition: "background 0.3s,border 0.3s" }}>
        <a href="#about" onClick={() => go("About")} style={{ fontFamily: "'Space Mono',monospace", fontSize: 16, fontWeight: 700, color: "#e8ff47", letterSpacing: 2, textDecoration: "none" }}>FA</a>

        {/* Desktop */}
        <div className="fa-desktop-nav" style={{ gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => go(l)} data-hover
              style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: active === l ? "#e8ff47" : "rgba(255,255,255,0.55)", textDecoration: "none", letterSpacing: 1, transition: "color 0.2s" }}>
              {l}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="fa-hamburger"
          style={{ flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8, zIndex: 301 }}>
          <span style={bar(open ? "45deg" : null, open ? "5px, 5px" : null)} />
          <span style={{ ...bar(null, null), opacity: open ? 0 : 1 }} />
          <span style={bar(open ? "-45deg" : null, open ? "5px, -5px" : null)} />
        </button>
      </nav>

      {/* Mobile full-screen drawer */}
      <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(10,10,10,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.3s" }}>
        {NAV_LINKS.map((l, i) => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => go(l)}
            style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(2.8rem,12vw,4.5rem)", color: active === l ? "#e8ff47" : "rgba(255,255,255,0.55)", textDecoration: "none", letterSpacing: 4, transform: open ? "translateY(0)" : "translateY(20px)", opacity: open ? 1 : 0, transition: `transform 0.4s ease ${i * 0.07}s, opacity 0.4s ease ${i * 0.07}s, color 0.2s` }}>
            {l}
          </a>
        ))}
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: 3, marginTop: 8 }}>FORHAD AHMED · DHAKA, BD</div>
      </div>
    </>
  );
}

// ─── hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const roles = ["React Developer", "Next.js Engineer", "Full-Stack Builder", "System Architect"];
  const [ri, setRi]     = useState(0);
  const [typed, setTyped] = useState("");
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    let i = 0, t;
    const type = () => {
      setTyped(roles[ri].slice(0, i + 1)); i++;
      if (i < roles[ri].length) t = setTimeout(type, 80);
      else t = setTimeout(() => { i = 0; setRi((r) => (r + 1) % roles.length); setTyped(""); setTimeout(type, 500); }, 2200);
    };
    type(); return () => clearTimeout(t);
  }, [ri]);

  useEffect(() => { const t = setInterval(() => setBlink((b) => !b), 500); return () => clearInterval(t); }, []);

  return (
    <section id="about" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "90px clamp(1.5rem,5vw,5rem) 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(232,255,71,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,255,71,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", zIndex: 0 }} />
      <div style={{ position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%)", width: 520, height: 520, background: "radial-gradient(circle,rgba(232,255,71,0.06) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#e8ff47", letterSpacing: 3, marginBottom: 22, display: "flex", alignItems: "center", gap: 12, opacity: 0, animation: "fadeUp 0.6s ease 0.1s forwards" }}>
          <span style={{ width: 32, height: 1, background: "#e8ff47", display: "block" }} />AVAILABLE FOR OPPORTUNITIES
        </div>

        <h1 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(4rem,13vw,10rem)", lineHeight: 0.9, color: "#fff", margin: "0 0 8px", letterSpacing: 2, opacity: 0, animation: "fadeUp 0.6s ease 0.2s forwards" }}>
          FORHAD<br /><span style={{ WebkitTextStroke: "2px #e8ff47", color: "transparent" }}>AHMED</span>
        </h1>

        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(0.85rem,2.5vw,1.35rem)", color: "#e8ff47", margin: "22px 0 26px", minHeight: "1.8rem", opacity: 0, animation: "fadeUp 0.6s ease 0.35s forwards" }}>
          {typed}<span style={{ opacity: blink ? 1 : 0 }}>_</span>
        </div>

        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(14px,1.8vw,16px)", color: "rgba(255,255,255,0.6)", maxWidth: 520, lineHeight: 1.85, margin: "0 0 40px", opacity: 0, animation: "fadeUp 0.6s ease 0.45s forwards" }}>
          Full-stack developer specializing in React-based frameworks. Passionate about crafting seamless, scalable, user-centric digital experiences that bring ideas to life.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", opacity: 0, animation: "fadeUp 0.6s ease 0.55s forwards" }}>
          <a href="#projects" data-hover style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, letterSpacing: 1, padding: "13px 30px", background: "#e8ff47", color: "#0a0a0a", textDecoration: "none", fontWeight: 700 }}>VIEW MY WORK →</a>
          <a href="#contact"  data-hover style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, letterSpacing: 1, padding: "13px 30px", border: "1px solid rgba(232,255,71,0.4)", color: "#e8ff47", textDecoration: "none" }}>GET IN TOUCH</a>
        </div>

        <div style={{ display: "flex", gap: "clamp(20px,5vw,48px)", marginTop: 64, flexWrap: "wrap", opacity: 0, animation: "fadeUp 0.6s ease 0.65s forwards" }}>
          {[["3+","Years Exp"],["5+","Products"],["3","Companies"],["∞","Commits"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#e8ff47", lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 2s infinite" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: 2 }}>SCROLL</div>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom,rgba(232,255,71,0.5),transparent)" }} />
      </div>
    </section>
  );
}

// ─── skills ───────────────────────────────────────────────────────────────────

function Skills() {
  const [hov, setHov] = useState(null);
  return (
    <section id="skills" style={{ padding: "100px clamp(1.5rem,5vw,5rem)" }}>
      <FadeIn><SectionHeader index="02" title="CORE SKILLS" /></FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 1, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.06)" }}>
        {Object.entries(SKILLS).map(([cat, items], i) => (
          <FadeIn key={cat} delay={i * 0.07}>
            <div style={{ padding: "26px 22px", background: "#0a0a0a" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#e8ff47", letterSpacing: 3, marginBottom: 14 }}>{cat.toUpperCase()}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {items.map((s) => (
                  <span key={s} onMouseEnter={() => setHov(s)} onMouseLeave={() => setHov(null)} data-hover
                    style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: "5px 12px", border: `1px solid ${hov === s ? "#e8ff47" : "rgba(255,255,255,0.12)"}`, color: hov === s ? "#e8ff47" : "rgba(255,255,255,0.65)", background: hov === s ? "rgba(232,255,71,0.05)" : "transparent", cursor: "default", transition: "all 0.2s" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── experience ───────────────────────────────────────────────────────────────

function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" style={{ padding: "100px clamp(1.5rem,5vw,5rem)", background: "rgba(255,255,255,0.015)" }}>
      <FadeIn><SectionHeader index="03" title="EXPERIENCE" /></FadeIn>
      <div style={{ display: "flex", gap: "clamp(20px,5vw,56px)", flexWrap: "wrap" }}>
        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 180, flex: "0 0 auto" }}>
          {EXPERIENCES.map((e, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <button onClick={() => setOpen(i)} data-hover
                style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "16px 18px", borderLeft: `2px solid ${open === i ? "#e8ff47" : "rgba(255,255,255,0.08)"}`, transition: "all 0.2s", marginBottom: 4 }}>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: open === i ? "#e8ff47" : "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 5, transition: "color 0.2s" }}>{e.period}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: open === i ? "#fff" : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}>{e.company}</div>
              </button>
            </FadeIn>
          ))}
        </div>
        {/* Detail */}
        <div style={{ flex: 1, minWidth: "min(280px,100%)" }}>
          {EXPERIENCES.map((e, i) => (
            <div key={i} style={{ display: open === i ? "block" : "none" }}>
              <FadeIn>
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "#fff", letterSpacing: 1 }}>{e.role}</span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#e8ff47", marginLeft: 12 }}>/ {e.sub}</span>
                  </div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 20, letterSpacing: 1 }}>{e.company} · {e.period}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 26 }}>
                    {e.stack.map((s) => <span key={s} style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, padding: "3px 9px", background: "rgba(232,255,71,0.08)", color: "#e8ff47", letterSpacing: 1 }}>{s}</span>)}
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {e.points.map((p, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                        <span style={{ color: "#e8ff47", marginTop: 2, flexShrink: 0 }}>▸</span>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── project card with screenshot + live link ─────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="#e8ff47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);

  return (
    <FadeIn delay={i * 0.1}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: hov ? "rgba(232,255,71,0.02)" : "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)", transition: "background 0.3s", display: "flex", flexDirection: "column", height: "100%" }}>

        {/* ── Screenshot panel ── */}
        <div style={{ position: "relative", overflow: "hidden", flexShrink: 0 }}>
          {p.screenshot ? (
            <img src={p.screenshot} alt={`${p.name} screenshot`}
              style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
          ) : (
            /* Placeholder browser mockup */
            <div style={{ width: "100%", aspectRatio: "16/9", background: "#111318", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
              {/* Browser chrome */}
              <div style={{ height: 30, background: "#1a1b22", display: "flex", alignItems: "center", gap: 6, padding: "0 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57", display: "block" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e", display: "block" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c940", display: "block" }} />
                <div style={{ flex: 1, height: 18, background: "#0f1016", borderRadius: 3, marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>{p.liveUrl}</span>
                </div>
              </div>
              {/* Body */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <div style={{ fontSize: 36, opacity: 0.4 }}>{p.icon}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.18)", letterSpacing: 2, textAlign: "center" }}>REPLACE WITH SCREENSHOT</div>
              </div>
              {/* Bottom accent */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#e8ff47,transparent)", opacity: hov ? 1 : 0, transition: "opacity 0.35s" }} />
            </div>
          )}

          {/* Hover overlay → open live link */}
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" data-hover
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10,10,10,0.72)", opacity: hov ? 1 : 0, transition: "opacity 0.3s", textDecoration: "none" }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#e8ff47", letterSpacing: 2, padding: "10px 22px", border: "1px solid #e8ff47", display: "flex", alignItems: "center", gap: 8 }}>
              VIEW LIVE <ArrowIcon />
            </div>
          </a>
        </div>

        {/* ── Card body ── */}
        <div style={{ padding: "24px 26px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
            <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 22, color: "#fff", letterSpacing: 1, margin: 0 }}>{p.name}</h3>
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" data-hover title="Open live demo"
              style={{ flexShrink: 0, width: 30, height: 30, border: "1px solid rgba(232,255,71,0.35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "border-color 0.2s", marginTop: 2 }}>
              <ArrowIcon />
            </a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {p.stack.map((s) => (
              <span key={s} style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, padding: "3px 8px", background: "rgba(232,255,71,0.06)", color: "rgba(232,255,71,0.8)", letterSpacing: 0.5 }}>{s}</span>
            ))}
          </div>

          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {p.points.map((pt, j) => (
              <li key={j} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ color: "#e8ff47", fontSize: 9, marginTop: 5, flexShrink: 0 }}>◆</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.58)", lineHeight: 1.65 }}>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "100px clamp(1.5rem,5vw,5rem)" }}>
      <FadeIn><SectionHeader index="04" title="PROJECTS" /></FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 16 }}>
        {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} i={i} />)}
      </div>
    </section>
  );
}

// ─── contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" style={{ padding: "100px clamp(1.5rem,5vw,5rem)", background: "rgba(255,255,255,0.015)", textAlign: "center" }}>
      <FadeIn>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#e8ff47", letterSpacing: 4, marginBottom: 20 }}>05 / CONTACT</div>
        <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(3rem,10vw,8rem)", color: "#fff", margin: "0 0 20px", letterSpacing: 2, lineHeight: 0.9 }}>
          LET'S<br /><span style={{ WebkitTextStroke: "2px #e8ff47", color: "transparent" }}>BUILD</span><br />TOGETHER
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 420, margin: "0 auto 40px", lineHeight: 1.85 }}>
          Open to freelance projects, full-time roles, or just a great conversation about tech and engineering.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
          <a href="mailto:forhad@example.com" data-hover style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, letterSpacing: 1, padding: "13px 32px", background: "#e8ff47", color: "#0a0a0a", textDecoration: "none", fontWeight: 700 }}>SEND EMAIL →</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" data-hover style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, letterSpacing: 1, padding: "13px 32px", border: "1px solid rgba(232,255,71,0.4)", color: "#e8ff47", textDecoration: "none" }}>LINKEDIN</a>
          <a href="https://github.com"   target="_blank" rel="noopener noreferrer" data-hover style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, letterSpacing: 1, padding: "13px 32px", border: "1px solid rgba(232,255,71,0.4)", color: "#e8ff47", textDecoration: "none" }}>GITHUB</a>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32, fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: 2 }}>
          FORHAD AHMED · DHAKA, BANGLADESH · FULL-STACK DEVELOPER
        </div>
      </FadeIn>
    </section>
  );
}

// ─── app root ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState("About");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    const s = document.createElement("style");
    s.textContent = `
      @media (pointer: fine) { html { cursor: none; } }
      @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
      @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-7px); } }
    `;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    const ids = ["about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); }),
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#0a0a0a", color: "#fff" }}>
      <Cursor />
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}