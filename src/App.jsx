import { useEffect, useState } from 'react'
import {
  Home, FolderKanban, Palette, Mail, Bookmark, Layers3, Github,
  Linkedin, Download, Menu, X, ArrowUpRight, Code2, Database,
  Monitor, Smartphone, Send, ExternalLink, UserRound
} from 'lucide-react'

import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Services from './sections/Services';

const profile = {
  name: 'Saifuddin Mondal',
  role: 'Full Stack Developer',
  location: 'India',
  email: 'saifuddin3pixel@gmail.com',
  github: 'https://github.com/saif405-dev',
  linkedin: 'https://www.linkedin.com/in/saifuddin-mondal-82091434a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
}

const projects = [
  {
  number: '01',
  title: 'Liwaas Commerce',
  type: 'E-commerce Platform',
  description: 'A collaborative family business e-commerce project.',
  stack: ['PHP', 'MySQL', 'Tailwind CSS'],
  tone: 'plum',
  status: 'Live',
  link: 'https://liwaas.com',
  githubUrl: 'https://github.com/saif405-dev'
},
  {
    number: '02',
    title: 'Ruh & Radiance',
    type: 'Wellness Platform Concept',
    status: 'Concept',
    link: '#contact',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    number: '03',
    title: 'Resume Builder',
    type: 'Web Application',
    status: 'In Development',
    link: '#contact',
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
]

const services = [
  { icon: Monitor, title: 'Frontend Development', text: 'Responsive, clean and accessible interfaces built with React, JavaScript and Tailwind CSS.' },
  { icon: Database, title: 'Backend Development', text: 'Server-side functionality, REST APIs, authentication flows and database integration.' },
  { icon: Code2, title: 'Full Stack Websites', text: 'End-to-end web application development, from the first screen to data and deployment.' },
  { icon: Smartphone, title: 'Responsive UI Design', text: 'Layouts that feel polished and work smoothly across desktop, tablet and mobile.' },
]


const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: UserRound },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'services', label: 'Services', icon: Palette },
  { id: 'contact', label: 'Contact', icon: Mail },
]


function App() {
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const navigate = (id) => {
    setActive(id)
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Update the sidebar highlight as the user scrolls between sections.
  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible[0]) setActive(visible[0].target.id)
    }, {
      rootMargin: '-22% 0px -48% 0px',
      threshold: [0, 0.15, 0.3, 0.5, 0.75]
    })

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const submitForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '').trim()
    const company = String(data.get('company') || '').trim()
    const message = String(data.get('message') || '').trim()
    const recipient = profile.email
    if (recipient.includes('YOUR_EMAIL')) {
      setSent(true)
      return
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nCompany: ${company || 'Not provided'}\n\n${message}`)
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="scene">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="portfolio-shell">
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-top">
            <div className="identity">

              <div className="avatar">
                <img src="/Saifuddin.jpeg" alt="SAIF"
                />
              </div>

              <div>
                <div className="identity-name">{profile.name}</div>
                <div className="identity-role">{profile.role}</div>
              </div>
            </div>

            <nav className="main-nav" aria-label="Main navigation">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button key={id} className={`nav-item ${active === id ? 'active' : ''}`} onClick={() => navigate(id)}>
                  <Icon size={15} strokeWidth={1.7} /><span>{label}</span>
                </button>
              ))}
            </nav>

            <div className="nav-label">RESOURCES</div>
            <div className="resource-links">
              <a href="#projects" onClick={(event) => { event.preventDefault(); navigate('projects') }}><Bookmark size={14} />Bookmarks</a>
              <a href="#services" onClick={(event) => { event.preventDefault(); navigate('services') }}><Layers3 size={14} />Stack</a>
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={14} />GitHub <ExternalLink size={11} /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14} />LinkedIn <ExternalLink size={11} /></a>
            </div>
          </div>

          <div className="sidebar-bottom">
            <div className="date-card">
              <div className="date-value">{new Date().toLocaleDateString('en-GB')}</div>
              <div className="date-location">{profile.location}</div>
            </div>
            <a className="download-button" href="/SaifuddinMondal_CV.pdf" download>
              <Download size={14} /> Download CV
            </a>
            <div className="sidebar-foot">© {new Date().getFullYear()} SAIFUDDIN</div>
          </div>
        </aside>

        <main className="content">
          <section className="page-section home-section" id="home">
            <div className="section-kicker">PORTFOLIO / 2026</div>
            <div className="home-layout">
              <div className="home-copy">
                <div className="availability"><span /> AVAILABLE FOR OPPORTUNITIES</div>
                <h1>Building digital<br /><em>experiences</em><br />with purpose.</h1>
                <p className="lead">Hey, I'm <strong>Saifuddin</strong> — a Computer Science learner and aspiring Full Stack Developer. I build modern web experiences that bring thoughtful design and practical functionality together.</p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => navigate('projects')}>Explore projects <ArrowUpRight size={16} /></button>
                  <button className="text-button" onClick={() => navigate('contact')}>Let's talk <ArrowUpRight size={15} /></button>
                </div>
              </div>

              <div className="visual-card profile-visual">

                <img
                  src="/Saifuddin.jpeg"
                  alt="Saifuddin Mondal"
                  className="hero-profile-image"
                />

                <div className="photo-overlay"></div>

                <div className="visual-card-top">
                  <span>FULL STACK DEVELOPER</span>
                  <span>IND</span>
                </div>

                <div className="visual-card-bottom">
                  <div>
                    <strong>Saifuddin Mondal</strong>
                    <span>Creative Developer</span>
                  </div>

                  <span className="profile-status">AVAILABLE</span>
                </div>

              </div>

            </div>
            <div className="home-bottom">
              <span>SCROLL TO EXPLORE</span><span className="scroll-line" /><span>01 — 04</span>
            </div>
          </section>
          <About />
          <Skills />
          <Projects
            projects={projects}
            onDiscuss={() => navigate('contact')} />

          <Services onDiscuss={() => navigate('contact')} />

          <section className="page-section" id="services">
            <div className="section-kicker">02 / WHAT I DO</div>
            <div className="section-title-row"><div><h2>Services &<br /><em>capabilities.</em></h2><p>From a first idea to a working web experience.</p></div></div>
            <div className="services-grid">
              {services.map(({ icon: Icon, title, text }, index) => (
                <article className="service-card" key={title}>
                  <div className="service-top"><Icon size={19} /><span>0{index + 1}</span></div>
                  <h3>{title}</h3><p>{text}</p><div className="service-arrow"><ArrowUpRight size={17} /></div>
                </article>
              ))}
            </div>
            <div className="tech-panel">
              <div><span className="panel-label">MY TOOLKIT</span><h3>Technologies I enjoy working with.</h3></div>
              <div className="tech-tags">{['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'PHP', 'Git', 'Vercel'].map(x => <span key={x}>{x}</span>)}</div>
            </div>
          </section>

          <section className="page-section contact-section" id="contact">
            <div className="section-kicker">03 / CONTACT</div>
            <div className="contact-heading"><h2>Get in Touch</h2><p>Let's connect and start something great,<br className="desktop-break" /> tailored just for you.</p></div>
            <form className="contact-form" onSubmit={submitForm}>
              <div className="form-row">
                <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
                <label>Company<input name="company" type="text" placeholder="Your company (optional)" /></label>
              </div>
              <label>Message<textarea name="message" placeholder="Tell me about your idea..." required /></label>
              <button type="submit" className="submit-button"><span>Submit</span><Send size={15} /></button>
              {sent && <p className="form-feedback">{profile.email.includes('YOUR_EMAIL') ? 'Please add your email address in src/App.jsx to activate email contact.' : 'Your email app should open with the message prepared.'}</p>}
              <p className="form-note">This form opens your email application. Connect a form backend to receive submissions directly on the website.</p>
            </form>
            <div className="contact-bottom"><span>BASED IN {profile.location.toUpperCase()}</span><a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={13} /></a></div>
          </section>

          <footer className="content-footer"><span>© {new Date().getFullYear()} {profile.name.toUpperCase()}</span><span>DESIGNED & BUILT WITH CARE</span><button onClick={() => navigate('home')}>BACK TO TOP ↑</button></footer>
        </main>
      </div>
    </div >
  )
}

export default App
