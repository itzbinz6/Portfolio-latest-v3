import { Link, useParams } from 'react-router-dom';
import { useCollection } from '../hooks/useCollection';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { slugify } from '../lib/slug';
import { Project } from '../lib/types';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { items: projects, loading } = useCollection<Project>('projects');
  const project = projects.find((p) => slugify(p.name) === slug);

  useDocumentHead(
    project ? `${project.name} — Case Study — Ajayi Abisola Enoch` : 'Case Study — Ajayi Abisola Enoch',
    project
      ? `How I built ${project.name}: ${project.description}`
      : 'Project case study by Ajayi Abisola Enoch, frontend developer.'
  );

  if (loading) {
    return (
      <section className="page-hero">
        <div className="container">
          <div className="projects-loading" role="status" aria-live="polite">
            <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Loading case study…
          </div>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="page-hero">
        <div className="container">
          <Link to="/work" className="back-link">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Back to work
          </Link>
          <h1>Case study not found.</h1>
          <p>That project doesn't exist, or it's been moved. Head back to see everything I've built.</p>
        </div>
      </section>
    );
  }

  const hasProcessContent = project.role || project.timeline || project.process || project.challenges || project.outcome;

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link to="/work" className="back-link">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Back to work
          </Link>
          <div className="section-label">{project.type}</div>
          <h1>
            {project.name}
            {project.demoTag && <span className="demo-tag">Demo</span>}
          </h1>
          <p>{project.description}</p>

          {project.stack && project.stack.length > 0 && (
            <div className="stack-row" style={{ marginTop: 20 }}>
              {project.stack.map((tech) => (
                <span key={tech} className="stack-chip">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="hero-buttons" style={{ marginTop: 24 }}>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary">
                <i className="fas fa-external-link-alt" aria-hidden="true" /> View live site
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                <i className="fab fa-github" aria-hidden="true" /> View code
              </a>
            )}
          </div>
        </div>
      </section>

      {project.imageUrl && (
        <section style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="detail-hero-image">
              <img src={project.imageUrl} alt={`${project.name} screenshot`} loading="lazy" />
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="container">
          {hasProcessContent ? (
            <div className="detail-meta-grid">
              {(project.role || project.timeline) && (
                <div className="detail-meta-row">
                  {project.role && (
                    <div className="detail-meta-item">
                      <div className="detail-meta-label">My role</div>
                      <div className="detail-meta-value">{project.role}</div>
                    </div>
                  )}
                  {project.timeline && (
                    <div className="detail-meta-item">
                      <div className="detail-meta-label">Timeline</div>
                      <div className="detail-meta-value">{project.timeline}</div>
                    </div>
                  )}
                </div>
              )}

              {project.process && (
                <div className="detail-section">
                  <h2 className="section-title">The process</h2>
                  <p>{project.process}</p>
                </div>
              )}

              {project.challenges && (
                <div className="detail-section">
                  <h2 className="section-title">Challenges</h2>
                  <p>{project.challenges}</p>
                </div>
              )}

              {project.outcome && (
                <div className="detail-section">
                  <h2 className="section-title">Outcome</h2>
                  <p>{project.outcome}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="work-empty">
              Full write-up for this project is coming soon — check the live site or code in the
              meantime.
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="detail-gallery">
              {project.gallery.map((src) => (
                <img key={src} src={src} alt={`${project.name} additional screenshot`} loading="lazy" />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="detail-cta" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">Next</div>
          <h2 className="section-title">Like what you see?</h2>
          <div className="hero-buttons">
            <Link to="/work" className="btn-ghost">
              <i className="fas fa-arrow-left" aria-hidden="true" /> See more work
            </Link>
            <a
              href="https://wa.me/2348081595625"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <i className="fab fa-whatsapp" aria-hidden="true" /> Let's talk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
