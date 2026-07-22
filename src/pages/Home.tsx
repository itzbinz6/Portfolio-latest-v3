import { Link } from 'react-router-dom';
import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import Faq from '../components/Faq';
import ContactCard from '../components/ContactCard';
import CaseStudyModal from '../components/CaseStudyModal';
import CvPreviewModal from '../components/CvPreviewModal';
import { useCollection } from '../hooks/useCollection';
import { Project, Skill } from '../lib/types';

const TEASER_PROJECTS = 3;
const TEASER_SKILLS = 4;

export default function Home() {
  const { items: allProjects, loading: projectsLoading } = useCollection<Project>('projects');
  const { items: skills, loading: skillsLoading } = useCollection<Skill>('tools', TEASER_SKILLS);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [cvOpen, setCvOpen] = useState(false);

  const mainProjects = allProjects.slice(0, TEASER_PROJECTS);

  return (
    <>
      <section id="hero">
        <div className="container hero-content">
          <div className="hero-tags">
            <div className="hero-tag">Building things</div>
            <div className="hero-tag">Open to internships</div>
          </div>
          <h1>
            Hi, I'm Ajayi <em>Abisola</em>
            <br />
            Enoch.
          </h1>
          <p className="hero-sub">
            I build things on the internet. I'm a student at Landmark University, figuring out
            how to make things — websites, brands, ideas. I work with people when they need
            something built.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">
              <i className="fas fa-arrow-right" aria-hidden="true" /> See my work
            </a>
            <button type="button" className="btn-ghost" onClick={() => setCvOpen(true)}>
              <i className="fas fa-eye" aria-hidden="true" /> Review CV
            </button>
          </div>
          <div className="hero-links-row">
            <a
              href="/cv/ajayi-abisola-enoch-cv.pdf"
              download="Ajayi-Abisola-Enoch-CV.pdf"
              className="hero-link"
            >
              <i className="fas fa-download" aria-hidden="true" /> Download CV
            </a>
            <a
              href="https://wa.me/2348081595625"
              target="_blank"
              rel="noreferrer"
              className="hero-link"
            >
              <i className="fab fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <FadeIn className="about-grid">
            <div className="about-visual">
              <div className="avatar-wrap">
                <img src="/images/avatar.jpg" alt="Ajayi Abisola Enoch" loading="lazy" />
              </div>
              <div className="about-badge">
                <i className="fas fa-graduation-cap" aria-hidden="true" /> CS · Landmark University
              </div>
            </div>
            <div className="about-text about-teaser">
              <div className="section-label">About Me</div>
              <h2 className="section-title">
                Builder.
                <br />
                Student. In progress.
              </h2>
              <p>
                I'm <strong>Ajayi Abisola Enoch</strong> — a Computer Science student at Landmark
                University in Nigeria, and someone who has never been able to do just one thing at
                a time. Most of my projects start the same way: I find a business running on
                nothing but a WhatsApp number, and I build them something better — no brief, no
                commission asked.
              </p>
              <Link to="/about" className="project-link">
                Read my full story <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
              <div className="certs-row" style={{ marginTop: 24 }}>
                <span className="cert-chip">
                  <i className="fas fa-certificate" aria-hidden="true" /> Responsive Web Design ·
                  freeCodeCamp
                </span>
                <span className="cert-chip">
                  <i className="fas fa-certificate" aria-hidden="true" /> Claude 101 · Anthropic
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <FadeIn>
            <div className="section-label">Work</div>
            <h2 className="section-title">Things I've built.</h2>
            <p className="section-sub">
              These are all demos — sites I built for real businesses as cold pitches or practice.
              No client brief, just me deciding a business deserved a better web presence and
              building it.
            </p>
          </FadeIn>

          <div className="projects-grid">
            {projectsLoading && (
              <div className="projects-loading" role="status" aria-live="polite">
                <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Loading projects…
              </div>
            )}
            {!projectsLoading && mainProjects.length === 0 && (
              <div className="work-empty">No projects yet — check back soon.</div>
            )}
            {mainProjects.map((p) => (
              <ProjectCard key={p.name} project={p} onOpenCaseStudy={setActiveProject} />
            ))}
          </div>

          <div className="work-more-wrap">
            <Link to="/work" className="btn-ghost">
              <i className="fas fa-arrow-right" aria-hidden="true" /> View All Work
            </Link>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <FadeIn>
            <div className="section-label">Tools</div>
            <h2 className="section-title">What I know. What I use.</h2>
            <p className="section-sub">
              A quick look at my core stack — the full toolkit, including certifications, lives on
              the About page.
            </p>
          </FadeIn>

          <div className="skills-grid">
            {skillsLoading && (
              <div className="projects-loading" role="status" aria-live="polite">
                <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Loading skills…
              </div>
            )}
            {skills.map((s) => (
              <SkillCard key={s.name} skill={s} />
            ))}
          </div>

          <div className="work-more-wrap">
            <Link to="/about" className="project-link">
              See my full toolkit <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="faq-contact">
        <div className="container">
          <div className="faq-contact-grid">
            <FadeIn>
              <div className="section-label">FAQ</div>
              <h2 className="section-title">Common questions</h2>
              <Faq />
            </FadeIn>
            <FadeIn>
              <div className="section-label">Contact</div>
              <h2 className="section-title">Say something.</h2>
              <p>
                Feedback on something you saw here. A question. A thought. A collab idea. Or just
                hi — that works too. I read everything.
              </p>
              <ContactCard />
            </FadeIn>
          </div>
        </div>
      </section>

      {activeProject && (
        <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
      {cvOpen && <CvPreviewModal onClose={() => setCvOpen(false)} />}
    </>
  );
}
