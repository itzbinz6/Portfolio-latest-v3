import { Link } from 'react-router-dom';
import CertCard from '../components/CertCard';
import { useCollection } from '../hooks/useCollection';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Certification } from '../lib/types';

export default function Certifications() {
  const { items: certs, loading } = useCollection<Certification>('certifications');

  useDocumentHead(
    'Certifications — Ajayi Abisola Enoch',
    'Certifications earned by Ajayi Abisola Enoch, including Responsive Web Design from freeCodeCamp and Claude 101 from Anthropic.'
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Back to home
          </Link>
          <div className="section-label">Credentials</div>
          <h1>Certifications.</h1>
          <p>Formal proof of what I know, with more coming as I keep building.</p>
        </div>
      </section>

      <section id="certifications" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="certs-grid">
            {loading && (
              <div className="projects-loading" role="status" aria-live="polite">
                <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Loading
                certifications…
              </div>
            )}
            {!loading && certs.length === 0 && (
              <div className="work-empty">No certifications listed yet.</div>
            )}
            {certs.map((c) => (
              <CertCard key={c.title} cert={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
