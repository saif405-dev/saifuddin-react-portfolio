
import React, { useEffect, useState } from "react";
import {
  Home,
  FolderKanban,
  Palette,
  Mail,
  Bookmark,
  Layers3,
  Github,
  Linkedin,
  Download,
  Menu,
  X,
  ArrowUpRight,
  Code2,
  ExternalLink,
  UserRound,
  Send,
} from "lucide-react";

import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Services from "./sections/Services";

import AdminLogin from "./Pages/AdminLogin";
import AdminInbox from "./Pages/AdminInbox";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const profile = {
  name: "Saifuddin Mondal",
  role: "Full Stack Developer",
  location: "India",
  email: "saifuddin3pixel@gmail.com",
  github: "https://github.com/saif405-dev",
  linkedin:
    "https://www.linkedin.com/in/saifuddin-mondal-82091434a",
};

const projects = [
  {
    number: "01",
    title: "Liwaas Commerce",
    type: "E-commerce Platform",
    description: "A collaborative family business e-commerce project.",
    stack: ["PHP", "MySQL", "Tailwind CSS"],
    tone: "plum",
    status: "Live",
    link: "https://liwaas.com",
    githubUrl: "https://github.com/saif405-dev",
  },
  {
    number: "02",
    title: "Ruh & Radiance",
    type: "Wellness Platform Concept",
    description:
      "A wellness platform concept built with a modern full-stack architecture.",
    status: "Concept",
    link: "#contact",
    stack: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    number: "03",
    title: "Resume Builder",
    type: "Web Application",
    description:
      "A web application concept for creating and downloading professional resumes.",
    status: "In Development",
    link: "#contact",
    stack: ["HTML", "CSS", "JavaScript"],
  },
];

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: UserRound },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "services", label: "Services", icon: Palette },
  { id: "contact", label: "Contact", icon: Mail },
];

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [token, setToken] = useState(
    () => sessionStorage.getItem("adminToken") || ""
  );

  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [formFeedback, setFormFeedback] = useState("");

  const isAdminPage = path === "/admin";
  const isInboxPage = path === "/admin/inbox";
  const isPortfolioPage = !isAdminPage && !isInboxPage;

  // Simple browser navigation for Portfolio and Admin pages.
  const navigatePath = (newPath) => {
    window.history.pushState({}, "", newPath);
    setPath(newPath);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Protect the Inbox page.
  useEffect(() => {
    if (isInboxPage && !token) {
      navigatePath("/admin");
    }
  }, [isInboxPage, token]);

  // Portfolio navigation.
  const navigate = (id) => {
    setActive(id);
    setMobileOpen(false);

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Update active navigation while scrolling.
  useEffect(() => {
    if (!isPortfolioPage) return;

    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-22% 0px -48% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isPortfolioPage]);

  // Admin login success.
  const handleLogin = (newToken) => {
    sessionStorage.setItem("adminToken", newToken);
    setToken(newToken);
    navigatePath("/admin/inbox");
  };

  // Admin logout.
  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setToken("");
    navigatePath("/admin");
  };

  // Submit visitor message to backend.
  const submitForm = async (event) => {
    event.preventDefault();

    setSending(true);
    setFormFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const messageData = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      contact: String(formData.get("contact") || "").trim(),
      subject: "Portfolio Inquiry",
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Message could not be sent.");
      }

      setFormFeedback(
        "Your message has been sent successfully. Thank you!"
      );

      form.reset();
    } catch (error) {
      setFormFeedback(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  // Admin Login page.
  if (isAdminPage) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Admin Inbox page.
  if (isInboxPage) {
    if (!token) return null;

    return (
      <AdminInbox
        token={token}
        onLogout={handleLogout}
      />
    );
  }

  // Main Portfolio page.
  return (
    <div className="scene">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="portfolio-shell">
        <button
          className="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <aside
          className={`sidebar ${
            mobileOpen ? "sidebar-open" : ""
          }`}
        >
          <div className="sidebar-top">
            <div className="identity">
              <div className="avatar">
                <img src="/Saifuddin.jpeg" alt="SAIF" />
              </div>

              <div>
                <div className="identity-name">
                  {profile.name}
                </div>
                <div className="identity-role">
                  {profile.role}
                </div>
              </div>
            </div>

            <nav className="main-nav" aria-label="Main navigation">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={`nav-item ${
                    active === id ? "active" : ""
                  }`}
                  onClick={() => navigate(id)}
                >
                  <Icon size={15} strokeWidth={1.7} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            <div className="nav-label">RESOURCES</div>

            <div className="resource-links">
              <a
                href="#projects"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("projects");
                }}
              >
                <Bookmark size={14} />
                Bookmarks
              </a>

              <a
                href="#services"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("services");
                }}
              >
                <Layers3 size={14} />
                Stack
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={14} />
                GitHub
                <ExternalLink size={11} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={14} />
                LinkedIn
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          <div className="sidebar-bottom">
            <div className="date-card">
              <div className="date-value">
                {new Date().toLocaleDateString("en-GB")}
              </div>
              <div className="date-location">
                {profile.location}
              </div>
            </div>

            <a
              className="download-button"
              href="/SaifuddinMondal_CV.pdf"
              download
            >
              <Download size={14} />
              Download CV
            </a>

            <div className="sidebar-foot">
              © {new Date().getFullYear()} SAIFUDDIN
            </div>
          </div>
        </aside>

        <main className="content">
          <section className="page-section home-section" id="home">
            <div className="section-kicker">
              PORTFOLIO / 2026
            </div>

            <div className="home-layout">
              <div className="home-copy">
                <div className="availability">
                  <span />
                  AVAILABLE FOR OPPORTUNITIES
                </div>

                <h1>
                  Building digital
                  <br />
                  <em>experiences</em>
                  <br />
                  with purpose.
                </h1>

                <p className="lead">
                  Hey, I'm <strong>Saifuddin</strong> — a Computer
                  Science learner and aspiring Full Stack Developer.
                  I build modern web experiences that bring thoughtful
                  design and practical functionality together.
                </p>

                <div className="hero-actions">
                  <button
                    className="primary-button"
                    onClick={() => navigate("projects")}
                  >
                    Explore projects
                    <ArrowUpRight size={16} />
                  </button>

                  <button
                    className="text-button"
                    onClick={() => navigate("contact")}
                  >
                    Let's talk
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>

              <div className="visual-card profile-visual">
                <img
                  src="/Saifuddin.jpeg"
                  alt="Saifuddin Mondal"
                  className="hero-profile-image"
                />

                <div className="photo-overlay" />

                <div className="visual-card-top">
                  <span>FULL STACK DEVELOPER</span>
                  <span>IND</span>
                </div>

                <div className="visual-card-bottom">
                  <div>
                    <strong>Saifuddin Mondal</strong>
                    <span>Creative Developer</span>
                  </div>

                  <span className="profile-status">
                    AVAILABLE
                  </span>
                </div>
              </div>
            </div>

            <div className="home-bottom">
              <span>SCROLL TO EXPLORE</span>
              <span className="scroll-line" />
              <span>01 — 04</span>
            </div>
          </section>

          <About />

          <Skills />

          <Projects
            projects={projects}
            onDiscuss={() => navigate("contact")}
          />

          <Services
            onDiscuss={() => navigate("contact")}
          />

          <section
            className="page-section contact-section"
            id="contact"
          >
            <div className="section-kicker">
              03 / CONTACT
            </div>

            <div className="contact-heading">
              <h2>Get in Touch</h2>
              <p>
                Let's connect and start something great,
                <br className="desktop-break" />
                tailored just for you.
              </p>
            </div>

            <form
              className="contact-form"
              onSubmit={submitForm}
            >
              <div className="form-row">
                <label>
                  Name
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    maxLength={80}
                  />
                </label>

                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    required
                    maxLength={254}
                  />
                </label>
              </div>

              <label>
                Contact Number (optional)
                <input
                  name="contact"
                  type="tel"
                  placeholder="Your phone number"
                  maxLength={30}
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Tell me about your idea..."
                  required
                  maxLength={5000}
                />
              </label>

              <button
                type="submit"
                className="submit-button"
                disabled={sending}
              >
                <span>
                  {sending ? "Sending..." : "Send Message"}
                </span>
                <Send size={15} />
              </button>

              {formFeedback && (
                <p className="form-feedback" role="status">
                  {formFeedback}
                </p>
              )}

              <p className="form-note">
                Your message will be securely submitted to the
                portfolio inbox.
              </p>
            </form>

            <div className="contact-bottom">
              <span>
                BASED IN {profile.location.toUpperCase()}
              </span>

              <a href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight size={13} />
              </a>
            </div>
          </section>

          <footer className="content-footer">
            <span>
              © {new Date().getFullYear()}{" "}
              {profile.name.toUpperCase()}
            </span>

            <span>DESIGNED & BUILT WITH CARE</span>

            <button onClick={() => navigate("home")}>
              BACK TO TOP ↑
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
