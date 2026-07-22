import { Link } from 'react-router-dom';
import { Project } from '../lib/types';
import { slugify } from '../lib/slug';

export default function ProjectCard({
  project,
  onOpenCaseStudy,
}: {
  project: Project;
  /** When provided, "Case study" opens an in-page modal instead of navigating to /work/:slug */
  onOpenCaseStudy?: (project: Project) => void;
}) {
  const hasDetail = Boolean(project.id);
  const detailHref = hasDetail && !onOpenCaseStudy ? `/work/${slugify(project.name)}` : undefined;

  const preview = (
    <>
      <div className="project-preview">
        {project.imageUrl && (
          <img src={project.imageUrl} alt={`${project.name} screenshot`} loading="lazy" />
        )}
      </div>
      <div className="project-body">
        <div className="project-type">{project.type}</div>
        <div className="project-name">
          <h3 className="project-name-text">
            {project.name}
            {project.demoTag && <span className="demo-tag">Demo</span>}
          </h3>
        </div>
        <p className="project-desc">{project.description}</p>
        {project.stack && project.stack.length > 0 && (
          <div className="stack-row">
            {project.stack.map((tech) => (
              <span key={tech} className="stack-chip">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="project-card">
      {onOpenCaseStudy && hasDetail ? (
        <button
          type="button"
          className="project-card-link project-card-button"
          onClick={() => onOpenCaseStudy(project)}
          aria-label={`View case study for ${project.name}`}
        >
          {preview}
        </button>
      ) : detailHref ? (
        <Link
          to={detailHref}
          className="project-card-link"
          aria-label={`View case study for ${project.name}`}
        >
          {preview}
        </Link>
      ) : (
        preview
      )}
      <div className="project-links-row">
        {onOpenCaseStudy && hasDetail ? (
          <button
            type="button"
            className="project-link project-link-button"
            onClick={() => onOpenCaseStudy(project)}
          >
            Case study <i className="fas fa-arrow-right" aria-hidden="true" />
          </button>
        ) : (
          detailHref && (
            <Link to={detailHref} className="project-link">
              Case study <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          )
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
            Live <i className="fas fa-external-link-alt" aria-hidden="true" />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
            <i className="fab fa-github" aria-hidden="true" /> Code
          </a>
        )}
      </div>
    </div>
  );
}
