import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved !== null ? JSON.parse(saved) : false
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const sectionsRef = useRef([])

  const projects = [
    {
      id: 1,
      title: 'Městské občanské fórum',
      description: 'Komunitní platforma pro studenty vysokých škol k výměně znalostí',
      tech: ['PHP', 'JavaScript', 'MySQL'],
      image: '👥'
    },
    {
      id: 2,
      title: 'Firemní Prezentace',
      description: 'Elegantní webové stránky pro moderní technologickou firmu',
      tech: ['React', 'Tailwind CSS', 'Vite'],
      image: '💼'
    },
  ]

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id')
          setActiveSection(sectionId)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* hlavička */}
      <header className="header">
        <div className="container">
          <div className="logo-section">
            <img src="/logo-fialove.svg" alt="Nexorum Logo" className="logo" />
            <span className="brand-name">Nexorum</span>
          </div>
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={isMenuOpen ? 'open' : ''}></span>
            <span className={isMenuOpen ? 'open' : ''}></span>
            <span className={isMenuOpen ? 'open' : ''}></span>
          </button>
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={closeMenu}>Domů</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={closeMenu}>O nás</a>
            <a href="#ja" className={activeSection === 'ja' ? 'active' : ''} onClick={closeMenu}>JA Czech</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={closeMenu}>Projekty</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={closeMenu}>Kontakt</a>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                // Ikonka Slunce (pro Dark Mode)
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                // Ikonka Měsíce (pro Light Mode)
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* hero sekce */}
      <section className="hero" id="home" ref={(el) => sectionsRef.current[0] = el}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Vytváříme <span className="gradient-text">digitální budoucnost</span>
            </h1>
            <p className="hero-subtitle">
              Jsme mladá česká JA Czech firma zaměřená na tvorbu moderních webových stránek a sociálních sítí
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">Naše projekty</a>
              <a href="#contact" className="btn btn-secondary">Kontaktujte nás</a>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>
        </div>
      </section>

      {/* sekce o nás */}
      <section className="about" id="about" ref={(el) => sectionsRef.current[1] = el}>
        <div className="container">
          <h2 className="section-title">Co děláme</h2>
          <div className="about-grid">
            <div className="about-card">
              <div className="card-icon">🌐</div>
              <h3>Webové Stránky</h3>
              <p>Vytváříme moderní, responzivní webové stránky s důrazem na uživatelský komfort a výkon</p>
            </div>
            <div className="about-card">
              <div className="card-icon">👥</div>
              <h3>Sociální Sítě</h3>
              <p>Vyvíjíme malé až střední sociální platformy pro specifické komunity a projekty</p>
            </div>
            <div className="about-card">
              <div className="card-icon">📱</div>
              <h3>Web Aplikace</h3>
              <p>Budujeme interaktivní webové aplikace s pokročilými funkcemi a možnostmi</p>
            </div>
            <div className="about-card">
              <div className="card-icon">⚡</div>
              <h3>Moderní Technologie</h3>
              <p>Používáme nejnovější technologie jako React, Node.js, JSX a další</p>
            </div>
          </div>
        </div>
      </section>

      {/* JA organizace sekce */}
      <section className="ja-section" id="ja" ref={(el) => sectionsRef.current[2] = el}>
        <div className="container">
          <h2 className="section-title">Junior Achievement</h2>
          <div className="ja-content">
            <div className="ja-badge">
              <img src="/ja_czech.png" alt="JA Czech" className="ja-logo" />
            </div>
            <h3 className="ja-subtitle">Fiktivní studentská firma</h3>
            <p className="ja-description">
              Nexorum je fiktivní firma vytvořená v rámci vzdělávacího programu <strong>Junior Achievement</strong>, 
              který studentům umožňuje získat praktické zkušenosti s podnikáním, týmovou prací a realizací skutečných projektů.
            </p>
            <p className="ja-description">
              Naším cílem je získat reálné dovednosti ve vývoji webu, projektovém řízení a komunikaci s klienty 
              v bezpečném a podporujícím vzdělávacím prostředí.
            </p>
          </div>
        </div>
      </section>

      {/* projektová sekce */}
      <section className="projects" id="projects" ref={(el) => sectionsRef.current[3] = el}>
        <div className="container">
          <h2 className="section-title">Naše Projekty</h2>
          <p className="section-subtitle">Ukázka našich realizovaných webových řešení</p>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-icon">{project.image}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Logo Loop */}
          <div className="logo-loop">
            <div className="logo-loop-container">
              <div className="logo-track">
                <div className="logo-item">
                  <img src="/logos/react.svg" alt="React" />
                </div>
                <div className="logo-item">
                  <img src="/logos/nodejs.svg" alt="Node.js" />
                </div>
                <div className="logo-item">
                  <img src="/logos/git-hub.svg" alt="GitHub" />
                </div>
                <div className="logo-item">
                  <img src="/logos/mysql.svg" alt="MySQL" />
                </div>
                <div className="logo-item">
                  <img src="/logos/php.svg" alt="PHP" />
                </div>
                <div className="logo-item">
                  <img src="/logos/javascript.svg" alt="JavaScript" />
                </div>
                {/* Duplicate for seamless loop */}
                <div className="logo-item">
                  <img src="/logos/react.svg" alt="React" />
                </div>
                <div className="logo-item">
                  <img src="/logos/nodejs.svg" alt="Node.js" />
                </div>
                <div className="logo-item">
                  <img src="/logos/git-hub.svg" alt="GitHub" />
                </div>
                <div className="logo-item">
                  <img src="/logos/mysql.svg" alt="MySQL" />
                </div>
                <div className="logo-item">
                  <img src="/logos/php.svg" alt="PHP" />
                </div>
                <div className="logo-item">
                  <img src="/logos/javascript.svg" alt="JavaScript" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* kontaktní sekce */}
      <section className="contact" id="contact" ref={(el) => sectionsRef.current[4] = el}>
        <div className="container">
          <h2 className="section-title">Kontaktujte nás</h2>
          <p className="section-subtitle">Máte projekt? Ozvěte se nám!</p>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:jakub.muzik@mendelova-stredni.cz">jakub.muzik@mendelova-stredni.cz</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <div>
                  <h4>Telefon</h4>
                  <a href="tel:+420739433570">+420 739 433 570</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📸</div>
                <div>
                  <h4>Instagram</h4>
                  <a href="https://instagram.com/nexorum.ja" target="_blank" rel="noopener noreferrer">@nexorum.ja</a>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form action="https://formspree.io/f/mankqrbj" method="POST">
                <input 
                  type="text" 
                  name="Jméno"   
                  placeholder="Vaše jméno" 
                  className="form-input" 
                  required       
                />
                <input 
                  type="email"
                  name="E-mail"
                  placeholder="Váš email" 
                  className="form-input" 
                  required 
                />
                <textarea 
                  name="Zpráva"
                  placeholder="Vaše zpráva" 
                  rows="5" 
                  className="form-input" 
                  required
                ></textarea>
                <button type="submit" className="btn btn-primary">Odeslat zprávu</button>
              </form>
          </div>
          </div>
        </div>
      </section>

      {/* patička */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="/logo-fialove.svg" alt="Nexorum Logo" className="footer-logo" />
              <span className="brand-name">Nexorum</span>
            </div>
            <p>© 2025 Nexorum. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
