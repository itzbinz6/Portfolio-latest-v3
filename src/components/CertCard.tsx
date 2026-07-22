import { Certification } from '../lib/types';

export default function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="cert-card">
      <div className="cert-check">
        <i className="fas fa-check" aria-hidden="true" />
      </div>
      <div className="cert-issuer">{cert.issuer}</div>
      <h3 className="cert-title">{cert.title}</h3>
      <div className="cert-desc">{cert.description}</div>
      {cert.link && (
        <a
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          className="project-link"
          style={{ marginBottom: 14, display: 'inline-flex' }}
        >
          <i className="fas fa-external-link-alt" aria-hidden="true" /> Verify Certificate
        </a>
      )}
      {cert.imageUrl && (
        <div className="cert-img-wrap">
          <img src={cert.imageUrl} alt={`${cert.title} Certificate`} loading="lazy" />
        </div>
      )}
    </div>
  );
}
