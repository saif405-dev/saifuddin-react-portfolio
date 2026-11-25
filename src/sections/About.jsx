
import React from "react";
import {
  ArrowUpRight,
  Code2,
  Lightbulb,
  Rocket,
  Target,
  Monitor,
  Database,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description:
      "Building modern web applications with frontend and backend technologies.",
  },
  {
    icon: Lightbulb,
    title: "Creative Thinking",
    description:
      "Combining creative ideas with practical solutions to build useful digital experiences.",
  },
  {
    icon: Rocket,
    title: "Continuous Learning",
    description:
      "Always exploring new technologies and improving my development skills.",
  },
  {
    icon: Target,
    title: "Problem Solving",
    description:
      "Focused on writing clean code and creating user-friendly solutions.",
  },
];

const journey = [
  {
    number: "01",
    title: "My Foundation",
    description:
      "Completed a Diploma in Computer Science & Engineering from Brainware University, building a foundation in programming and computer science.",
  },
  {
    number: "02",
    title: "My Development Journey",
    description:
      "Started building practical projects using HTML, CSS, JavaScript, PHP, MySQL and modern web technologies.",
  },
  {
    number: "03",
    title: "Full Stack Development",
    description:
      "Expanded my skills into React, Node.js, Express and MongoDB while developing real-world web application projects.",
  },
  {
    number: "04",
    title: "What's Next",
    description:
      "Continuously improving my technical abilities, exploring new technologies and working towards becoming a professional software developer.",
  },
];

function About() {
  return (
    <section id="about" className="page-section about-section">
      <div className="section-kicker">
        01 / ABOUT ME
      </div>

      <div className="section-title-row">
        <div>
          <h2>
            A little about
            <br />
            <em>who I am.</em>
          </h2>

          <p>
            My background, passion and journey into technology.
          </p>
        </div>

        <span className="count-label">MY STORY</span>
      </div>

      {/* Introduction */}
      <div className="about-intro">
        <div className="about-main-card">
          <span className="about-label">HELLO, I'M SAIFUDDIN</span>

          <h3>
            Turning ideas into
            <br />
            <em>digital experiences.</em>
          </h3>

          <p>
            I'm Saifuddin Mondal, an aspiring Full Stack Developer
            passionate about building modern, responsive and
            functional web applications.

            I enjoy transforming ideas into digital solutions
            through thoughtful design, clean code and practical
            development.
          </p>

          <p>
            My development journey includes working with frontend
            technologies, backend systems, databases and API
            integrations. I love learning new technologies and
            improving my ability to solve real-world problems.
          </p>

          <a href="#contact" className="about-contact-link">
            Let's work together
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="about-profile-card">
          <div className="about-profile-image">
            <img
              src="/Saifuddin.jpeg"
              alt="Saifuddin Mondal"
            />
          </div>

          <div className="about-profile-info">
            <span>DEVELOPER PROFILE</span>
            <h3>Saifuddin Mondal</h3>
            <p>Full Stack Developer</p>
          </div>

          <div className="about-profile-details">
            <div>
              <Monitor size={16} />
              <span>Web Development</span>
            </div>

            <div>
              <Database size={16} />
              <span>Backend & Database</span>
            </div>

            <div>
              <GraduationCap size={16} />
              <span>Computer Science</span>
            </div>

            <div>
              <BriefcaseBusiness size={16} />
              <span>Open to Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="about-subheading">
        <div>
          <span className="panel-label">WHAT DEFINES ME</span>
          <h3>How I approach development.</h3>
        </div>
      </div>

      <div className="about-highlights">
        {highlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <article className="about-highlight-card" key={item.title}>
              <div className="about-highlight-top">
                <Icon size={20} />
                <span>0{index + 1}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>

      {/* Journey */}
      <div className="about-subheading journey-heading">
        <div>
          <span className="panel-label">MY JOURNEY</span>
          <h3>From learning to building.</h3>
        </div>
      </div>

      <div className="about-timeline">
        {journey.map((item) => (
          <article className="about-timeline-item" key={item.number}>
            <div className="timeline-number">{item.number}</div>

            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Closing */}
      <div className="about-closing">
        <div>
          <span className="panel-label">THE NEXT CHAPTER</span>
          <h3>
            Always learning.
            <br />
            Always building.
          </h3>
          <p>
            I'm looking forward to collaborating with people,
            contributing to meaningful projects and growing
            as a developer.
          </p>
        </div>

        <a href="#contact" className="about-closing-button">
          Get in touch
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}

export default About;
