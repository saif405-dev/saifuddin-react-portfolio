
import React from "react";
import {
  Code2,
  Globe,
  Server,
  Database,
  Palette,
  Wrench,
  Layers,
  Terminal,
  GitBranch,
  Monitor,
  ShieldCheck,
  Sparkles,
} from "lucide-react";


const skillGroups = [
  {
    number: "01",
    title: "Frontend Development",
    subtitle: "Building modern user interfaces",
    icon: Monitor,
    skills: [
      { name: "HTML5", level: "Comfortable" },
      { name: "CSS3", level: "Comfortable" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "React.js", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Comfortable" },
    ],
  },
  {
    number: "02",
    title: "Backend Development",
    subtitle: "Server-side logic and APIs",
    icon: Server,
    skills: [
      { name: "Node.js", level: "Learning" },
      { name: "Express.js", level: "Learning" },
      { name: "PHP", level: "Comfortable" },
      { name: "REST API", level: "Learning" },
    ],
  },
  {
    number: "03",
    title: "Database Management",
    subtitle: "Data storage and management",
    icon: Database,
    skills: [
      { name: "MongoDB", level: "Learning" },
      { name: "MySQL", level: "Comfortable" },
    ],
  },
  {
    number: "04",
    title: "Tools & Platforms",
    subtitle: "Development workflow",
    icon: Wrench,
    skills: [
      { name: "Git", level: "Comfortable" },
      { name: "GitHub", level: "Comfortable" },
      { name: "VS Code", level: "Comfortable" },
      { name: "Vercel", level: "Learning" },
    ],
  },
  {
    number: "05",
    title: "Creative & Additional Skills",
    subtitle: "Beyond web development",
    icon: Palette,
    skills: [
      { name: "3D Animation", level: "Learning" },
      { name: "Photo Editing", level: "Comfortable" },
      { name: "Video Editing", level: "Comfortable" },
      { name: "Cybersecurity Fundamentals", level: "Learning" },
    ],
  },
];

const principles = [
  {
    icon: Code2,
    title: "Clean Code",
    text: "Writing structured and maintainable code.",
  },
  {
    icon: Globe,
    title: "Responsive Design",
    text: "Creating experiences for different screen sizes.",
  },
  {
    icon: ShieldCheck,
    title: "Problem Solving",
    text: "Finding practical solutions to development challenges.",
  },
  {
    icon: Sparkles,
    title: "Continuous Learning",
    text: "Exploring technologies and improving every day.",
  },
];

function Skills() {
  return (
    <section id="skills" className="page-section skills-section">

      <div className="section-kicker">
        02 / SKILLS & EXPERTISE
      </div>

      <div className="section-title-row">
        <div>
          <h2>
            My technical
            <br />
            <em>expertise.</em>
          </h2>
          <p>
            Technologies, tools and skills I use to build
            digital experiences.
          </p>
        </div>

        <span className="count-label">MY TOOLKIT</span>
      </div>

      {/* Introduction */}
      <div className="skills-intro">
        <div className="skills-intro-icon">
          <Layers size={25} />
        </div>

        <div>
          <h3>Technology meets creativity.</h3>
          <p>
            I work with modern web technologies across frontend,
            backend and database development. I continuously
            improve my skills through practical projects and
            hands-on learning.
          </p>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="skills-grid">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <article className="skill-card" key={group.number}>

              <div className="skill-card-top">
                <div className="skill-icon">
                  <Icon size={19} />
                </div>
                <span>{group.number}</span>
              </div>

              <h3>{group.title}</h3>
              <p className="skill-subtitle">
                {group.subtitle}
              </p>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <span>{skill.name}</span>
                    <span className="skill-level">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>

            </article>
          );
        })}
      </div>

      {/* Development Principles */}
      <div className="skills-principles-heading">
        <span className="panel-label">MY APPROACH</span>
        <h3>What I focus on.</h3>
      </div>

      <div className="skills-principles">
        {principles.map((item) => {
          const Icon = item.icon;

          return (
            <article className="principle-card" key={item.title}>
              <Icon size={20} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>

      {/* Closing */}
      <div className="skills-footer">
        <div>
          <span className="panel-label">
            ALWAYS IMPROVING
          </span>
          <h3>Learning today. Building tomorrow.</h3>
          <p>
            My goal is to keep learning, experiment with new
            technologies and develop meaningful digital solutions.
          </p>
        </div>

        <Terminal size={35} />
      </div>

    </section>
  );
}

export default Skills;
