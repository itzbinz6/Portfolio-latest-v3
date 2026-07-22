import { useMemo, useState } from 'react';
import { Project } from '../lib/types';
import ProjectCard from './ProjectCard';

const PER_PAGE = 6;

export default function WorkCarousel({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const chunks: Project[][] = [];
    for (let i = 0; i < projects.length; i += PER_PAGE) {
      chunks.push(projects.slice(i, i + PER_PAGE));
    }
    return chunks;
  }, [projects]);

  if (projects.length === 0) return null;

  return (
    <>
      <div className="work-more-wrap">
        <button className="btn-ghost" onClick={() => setOpen((o) => !o)}>
          {open ? (
            <>
              Hide Projects <i className="fas fa-chevron-up" aria-hidden="true" />
            </>
          ) : (
            <>
              View More Work <i className="fas fa-arrow-right" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {open && (
        <div className="work-carousel">
          <div className="work-track-wrap">
            <div className="work-track" style={{ transform: `translateX(-${page * 100}%)` }}>
              {pages.map((chunk, i) => (
                <div className="work-page" key={i}>
                  {chunk.map((p) => (
                    <ProjectCard key={p.name} project={p} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {pages.length > 1 && (
            <div className="work-nav">
              <button
                className="work-btn"
                aria-label="Previous projects"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                <i className="fas fa-chevron-left" aria-hidden="true" />
              </button>
              <div className="work-dots">
                {pages.map((_, i) => (
                  <div key={i} className={`work-dot${i === page ? ' active' : ''}`} />
                ))}
              </div>
              <button
                className="work-btn"
                aria-label="Next projects"
                disabled={page === pages.length - 1}
                onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
              >
                <i className="fas fa-chevron-right" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
