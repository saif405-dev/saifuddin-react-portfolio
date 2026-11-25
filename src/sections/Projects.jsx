
import React from 'react';
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Code2
} from 'lucide-react';

function Projects({ projects = [], onDiscuss }) {
  return (
    <section id="projects" className="page-section projects-section">

      <div className="section-kicker">
        03 / SELECTED WORK
      </div>

      <div className="section-title-row">
        <div>
          <h2>
            Things I've
            <br />
            <em>built & created.</em>
          </h2>

          <p>
            A selection of my development projects and practical work.
          </p>
        </div>

        <span className="count-label">
          {String(projects.length).padStart(2, '0')} PROJECTS
        </span>
      </div>

      <div className="project-grid">
        {projects.map((project) => {
          const liveUrl =
            project.liveUrl ||
            (project.link && project.link !== '#contact'
              ? project.link
              : null);

          const status = project.status || 'In Development';

          return (
            <article
              className={`project-card ${project.tone || ''}`}
              key={project.number || project.title}
            >
              <div className="project-art">
                <span className="project-number">
                  {project.number} / FEATURED
                </span>

                <span className={`project-status ${status
                  .toLowerCase()
                  .replaceAll(' ', '-')}`}>
                  {status}
                </span>

                <div className="art-shape">
                  <div />
                  <div />
                  <div />
                </div>

                <span className="art-word">
                  {project.title.split(' ')[0]}
                </span>
              </div>

              <div className="project-info">
                <div className="project-type">
                  {project.type}
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="stack-list">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="project-actions">

                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-open"
                    >
                      LIVE DEMO
                      <ExternalLink size={14} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-open"
                    >
                      GITHUB
                      <Github size={14} />
                    </a>
                  )}

                  {!liveUrl && !project.githubUrl && (
                    <button
                      type="button"
                      onClick={onDiscuss}
                      className="project-open"
                    >
                      DISCUSS PROJECT
                      <ArrowUpRight size={14} />
                    </button>
                  )}

                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="projects-bottom">
        <Code2 size={20} />

        <p>
          Every project is an opportunity to learn,
          experiment and build something meaningful.
        </p>
      </div>

    </section>
  );
}

export default Projects;
