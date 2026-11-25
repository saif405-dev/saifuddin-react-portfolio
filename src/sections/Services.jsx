
import React from 'react';
import {
  Code2,
  ShoppingBag,
  LayoutDashboard,
  Smartphone,
  ArrowUpRight
} from 'lucide-react';

const services = [
  {
    number: '01',
    icon: Code2,
    title: 'Full Stack Web Development',
    description:
      'Modern and functional websites with frontend and backend integration, database connectivity and API development.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  {
    number: '02',
    icon: ShoppingBag,
    title: 'E-commerce Development',
    description:
      'E-commerce websites with product management, categories, variations, shopping features and admin panels.',
    tags: ['React', 'PHP', 'MySQL', 'REST API']
  },
  {
    number: '03',
    icon: LayoutDashboard,
    title: 'Admin Dashboard Development',
    description:
      'Clean and useful admin dashboards to manage products, users, categories, inventory and business data.',
    tags: ['JavaScript', 'Tailwind CSS', 'MySQL']
  },
  {
    number: '04',
    icon: Smartphone,
    title: 'Responsive UI Development',
    description:
      'Modern, responsive and user-friendly interfaces that work smoothly across desktop, tablet and mobile devices.',
    tags: ['HTML', 'CSS', 'React', 'Tailwind CSS']
  }
];

function Services({ onDiscuss }) {
  return (
    <section id="services" className="page-section services-section">

      <div className="section-kicker">
        04 / WHAT I DO
      </div>

      <div className="section-title-row">
        <div>
          <h2>
            Services I
            <br />
            <em>can offer.</em>
          </h2>

          <p>
            Helping businesses build useful digital experiences
            through modern web technologies.
          </p>
        </div>

        <span className="count-label">
          04 SERVICES
        </span>
      </div>

      <div className="services-grid">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <article className="service-card" key={service.number}>

              <div className="service-card-top">
                <span className="service-number">
                  {service.number}
                </span>

                <div className="service-icon">
                  <Icon size={25} />
                </div>
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <button
                type="button"
                className="service-link"
                onClick={onDiscuss}
              >
                DISCUSS YOUR PROJECT
                <ArrowUpRight size={15} />
              </button>

            </article>
          );
        })}
      </div>

      <div className="services-bottom">
        <span>HAVE A PROJECT IN MIND?</span>
        <br/>

        <button
          type="button"
          onClick={onDiscuss}
        >
          LET'S WORK TOGETHER
          <ArrowUpRight size={16} />
        </button>
      </div>

    </section>
  );
}

export default Services;
