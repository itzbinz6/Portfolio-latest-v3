import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import CaseStudyModal from '../components/CaseStudyModal';
import { useCollection } from '../hooks/useCollection';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Project } from '../lib/types';

// Fixed, deliberately short filter set instead of whatever `type` values
// happen to exist in Firestore. A project's `type` field must match one of
// these exactly (case-sensitive) to show up under that filter.
const FILTER_TYPES = ['Redesign Concept', 'Restaurant', 'NGO website', 'Saas', 'Portfolio'];

export default function Work() {
  const { items: projects, loading } = useCollection<Project>('projects');
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useDocumentHead(
    'Work — Ajayi Abisola Enoch, Frontend Developer',
    'Web projects built and deployed by Ajayi Abisola Enoch — real business demos in React, Next.js, and Firebase, built as cold pitches and portfolio proof of work.'
  );

  const types = useMemo(
    () => FILTER_TYPES.filter((type) => projects.some((p) => p.type === type)),
    [projects]
  );

  const visibleProjects = activeType ? projects.filter((p) => p.type === activeType) : projects;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Back to home
          </Link>
          <div className="section-label">Work</div>
          <h1>Everything I've built.</h1>
          <p>
            Real businesses, real cold pitches — I found a company running on nothing but a
            WhatsApp number and built them a working site, backend included, with no brief and
            no commission asked. Click into any project for the full case study: the stack, the
            thinking, and what shipped.
          </p>

          {types.length > 1 && (
            <div className="filter-row" role="group" aria-label="Filter projects by type">
              <button
                className={`filter-chip${activeType === null ? ' active' : ''}`}
                onClick={() => setActiveType(null)}
              >
                All
              </button>
              {types.map((type) => (
                <button
                  key={type}
                  className={`filter-chip${activeType === type ? ' active' : ''}`}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="projects" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="work-full-grid">
            {loading && (
              <div className="projects-loading" role="status" aria-live="polite">
                <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Loading projects…
              </div>
            )}
            {!loading && visibleProjects.length === 0 && (
              <div className="work-empty">No projects match that filter yet.</div>
            )}
            {visibleProjects.map((p) => (
              <ProjectCard key={p.id ?? p.name} project={p} onOpenCaseStudy={setActiveProject} />
            ))}
          </div>
        </div>
      </section>

      {activeProject && (
        <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <section className="detail-cta" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">Next</div>
          <h2 className="section-title">Want to work together?</h2>
          <div className="hero-buttons">
            <Link to="/about" className="btn-ghost">
              <i className="fas fa-user" aria-hidden="true" /> More about me
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
