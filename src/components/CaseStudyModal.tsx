import { useEffect } from 'react';
import { Project } from '../lib/types';

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const hasProcessContent =
    project.role || project.timeline || project.process || project.challenges || project.outcome;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} case study`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close case study">
          <i className="fas fa-times" aria-hidden="true" />
        </button>

        <div className="modal-scroll">
          <div className="section-label">{project.type}</div>
          <h2 className="section-title">
            {project.name}
            {project.demoTag && <span className="demo-tag">Demo</span>}
          </h2>
          <p>{project.description}</p>

          {project.stack && project.stack.length > 0 && (
            <div className="stack-row" style={{ marginTop: 16, marginBottom: 24 }}>
              {project.stack.map((tech) => (
                <span key={tech} className="stack-chip">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="hero-buttons" style={{ marginBottom: 28 }}>
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

          {project.imageUrl && (
            <div className="detail-hero-image" style={{ marginBottom: 28 }}>
              <img src={project.imageUrl} alt={`${project.name} screenshot`} loading="lazy" />
            </div>
          )}

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
                  <h3 className="section-title">The process</h3>
                  <p>{project.process}</p>
                </div>
              )}

              {project.challenges && (
                <div className="detail-section">
                  <h3 className="section-title">Challenges</h3>
                  <p>{project.challenges}</p>
                </div>
              )}

              {project.outcome && (
                <div className="detail-section">
                  <h3 className="section-title">Outcome</h3>
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
                <img
                  key={src}
                  src={src}
                  alt={`${project.name} additional screenshot`}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
