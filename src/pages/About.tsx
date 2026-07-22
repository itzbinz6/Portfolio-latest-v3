import { Link } from 'react-router-dom';
import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import SkillCard from '../components/SkillCard';
import CvPreviewModal from '../components/CvPreviewModal';
import { useCollection } from '../hooks/useCollection';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Skill } from '../lib/types';

export default function About() {
  const { items: skills, loading } = useCollection<Skill>('tools');
  const [cvOpen, setCvOpen] = useState(false);

  useDocumentHead(
    'About — Ajayi Abisola Enoch, Frontend Developer',
    'Frontend developer and Computer Science undergrad at Landmark University, open to internships and frontend roles. React, Next.js, and Firebase.'
  );

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Back to home
          </Link>
        </div>
      </section>

      <section id="about" style={{ border: 'none' }}>
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
            <div className="about-text">
              <div className="section-label">About Me</div>
              <h1 className="section-title">
                Frontend developer.
                <br />
                CS undergrad. Building in public.
              </h1>
              <div className="hero-tag">Open to internships &amp; frontend roles</div>
              <div className="hero-buttons" style={{ marginTop: 16, marginBottom: 8 }}>
                <button type="button" className="btn-ghost" onClick={() => setCvOpen(true)}>
                  <i className="fas fa-eye" aria-hidden="true" /> Preview CV
                </button>
                <a
                  href="/cv/ajayi-abisola-enoch-cv.pdf"
                  download="Ajayi-Abisola-Enoch-CV.pdf"
                  className="btn-primary"
                >
                  <i className="fas fa-download" aria-hidden="true" /> Download CV
                </a>
              </div>
              <p>
                I'm <strong>Ajayi Abisola Enoch</strong>, a Computer Science student at Landmark
                University who builds real, shipped web products — not just class assignments. I
                work in React, Next.js, and Firebase, and I've deployed every project on this site
                myself, end to end.
              </p>
              <p>
                Most of my projects started the same way: I'd find a business doing real work — a
                restaurant, a cake studio, a café — with nothing but a WhatsApp number and an
                Instagram page to show for it. So I'd build them something. No brief, no
                commission. Just a demo and a message saying{' '}
                <strong>"I think you deserve better than this."</strong> A few of those turned into
                paid client work.
              </p>
              <p>
                Off the clock, I follow anime with actual plots — Attack on Titan, Summertime
                Rendering — and I'm usually running gospel music in the background while I work.
              </p>

              <div className="hero-buttons" style={{ marginTop: 8 }}>
                <a
                  href="https://wa.me/2348081595625"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  <i className="fab fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
                </a>
                <a href="mailto:abisolaajayi360@gmail.com" className="btn-ghost">
                  <i className="fas fa-envelope" aria-hidden="true" /> Email me
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <FadeIn>
            <div className="section-label">Tools</div>
            <h2 className="section-title">What I know. What I use.</h2>
            <p className="section-sub">
              The full toolkit — core languages I work in daily, and the platforms and services I
              build on top of.
            </p>
          </FadeIn>

          <div className="skills-grid">
            {loading && (
              <div className="projects-loading" role="status" aria-live="polite">
                <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Loading skills…
              </div>
            )}
            {skills.map((s) => (
              <SkillCard key={s.name} skill={s} />
            ))}
          </div>
        </div>
      </section>

      <section id="certs-teaser" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-label">Certifications</div>
            <h2 className="section-title">Credentials on record</h2>
            <div className="certs-row" style={{ marginTop: 20 }}>
              <span className="cert-chip">
                <i className="fas fa-certificate" aria-hidden="true" /> Responsive Web Design ·
                freeCodeCamp
              </span>
              <span className="cert-chip">
                <i className="fas fa-certificate" aria-hidden="true" /> Claude 101 · Anthropic
              </span>
            </div>
            <p style={{ marginTop: 20 }}>
              <Link to="/certifications" className="project-link">
                See full certifications <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {cvOpen && <CvPreviewModal onClose={() => setCvOpen(false)} />}
    </>
  );
}
