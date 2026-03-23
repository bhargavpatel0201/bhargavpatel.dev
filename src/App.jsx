import { useEffect, useLayoutEffect, useState, useRef, lazy, Suspense } from "react"
import { IconSun, IconMoon } from "./NavIcons"
import profileImg from "./assets/Profile.PNG"

const PageContent = lazy(() => import("./PageContent.jsx"))

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

const THEME_STORAGE_KEY = "jules-theme"

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === "dark" || stored === "light") return stored
  } catch (_) {}
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"
  return "light"
}

const NAV_OFFSET = 70

function scrollToId(id) {
  const doScroll = (el) => {
    if (!el) return false
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET)
    window.scrollTo({ top, behavior: "smooth" })
    return true
  }

  const el = document.getElementById(id)
  if (doScroll(el)) return

  // Retry when section is lazy-loaded (PageContent)
  let attempts = 0
  const maxAttempts = 40
  const iv = setInterval(() => {
    attempts++
    if (doScroll(document.getElementById(id)) || attempts >= maxAttempts) clearInterval(iv)
  }, 50)
}

export default function App() {
  const navRef = useRef(null)
  const [theme, setTheme] = useState(getInitialTheme)
  const [isProfileImgOk, setIsProfileImgOk] = useState(true)

  useLayoutEffect(() => {
    document.documentElement.classList.add("jules-page")
    document.documentElement.setAttribute("data-theme", theme)
    history.scrollRestoration && (history.scrollRestoration = "manual")
    window.scrollTo(0, 0)
    return () => document.documentElement.classList.remove("jules-page")
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch (_) {}
  }

  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) navRef.current.classList.toggle("jules-nav-scrolled", window.scrollY > 60)
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const maxScroll = scrollHeight - clientHeight
      setScrollProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="jules-root jules-root-3d" data-theme={theme}>
      <div className="jules-scroll-progress" aria-hidden="true">
        <div className="jules-scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <a href="#main-content" className="jules-skip-link">Skip to main content</a>
      <div className="jules-bg-3d" aria-hidden="true">
        <div className="jules-bg-3d-overlay" />
      </div>
      <header className="jules-nav" ref={navRef}>
        <div className="jules-nav-inner">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollToId("hero")
            }}
            className="jules-logo"
          >
            <span className="jules-logo-mark">BP</span>
          </a>
          <nav className="jules-nav-links">
            {NAV_LINKS.map(({ id, label }) => (
              <button key={id} type="button" className="jules-nav-link" onClick={() => scrollToId(id)}>{label}</button>
            ))}
            <button type="button" className="jules-theme-toggle" onClick={toggleTheme} aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} title={theme === "light" ? "Dark mode" : "Light mode"}>
              {theme === "light" ? <IconMoon /> : <IconSun />}
            </button>
          </nav>
          <a href="/BHARGAV_RESUME.pdf" download="Bhargav_Patel_Resume.pdf" className="jules-btn jules-btn-cta">Download Resume</a>
        </div>
      </header>
      <div className="jules-content-wrap">
        <main id="main-content">
          <section id="hero" className="jules-hero">
            <div className="jules-container">
              <div className="jules-hero-grid">
                <div className="jules-hero-text">
                  <p className="jules-hero-eyebrow">Python & Software Developer · M.S. Computer Science</p>
                  <span className="jules-hero-pill jules-hero-pill-opportunities">Open to opportunities</span>
                  <h1 className="jules-hero-title">Building data‑driven <em>software</em>.</h1>
                  <p className="jules-hero-tagline">I'm Bhargav Patel — The Code Architect, focused on Python, Java, modern web (HTML, CSS, JavaScript), and data analysis to ship reliable, scalable solutions.</p>
                  <div className="jules-hero-cta">
                    <a href="#work" className="jules-btn jules-btn-primary" onClick={(e) => { e.preventDefault(); scrollToId("work"); }}>View my work</a>
                    <a href="#contact" className="jules-btn jules-btn-outline" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>Get in touch</a>
                  </div>
                </div>
                <div className="jules-hero-photo" aria-hidden={isProfileImgOk ? "false" : "true"}>
                  <div className="jules-hero-avatar" aria-label="Bhargav Patel profile photo">
                    {isProfileImgOk ? (
                      <img
                        src={profileImg}
                        alt="Bhargav Patel"
                        loading="eager"
                        decoding="async"
                        fetchpriority="high"
                        width={450}
                        height={450}
                        onError={() => setIsProfileImgOk(false)}
                      />
                    ) : (
                      <div className="jules-hero-avatar-fallback" aria-hidden="true">
                        <span>BP</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Suspense fallback={<div className="jules-sections-placeholder" aria-hidden="true" />}>
            <PageContent scrollToId={scrollToId} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
