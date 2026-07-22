import { useEffect } from 'react';

const CV_PATH = '/cv/ajayi-abisola-enoch-cv.pdf';

export default function CvPreviewModal({ onClose }: { onClose: () => void }) {
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box cv-modal-box"
        role="dialog"
        aria-modal="true"
        aria-label="CV preview"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close CV preview">
          <i className="fas fa-times" aria-hidden="true" />
        </button>

        <div className="cv-preview-header">
          <div>
            <div className="cv-preview-label">CV</div>
            <div className="cv-preview-name">Ajayi Abisola Enoch — Frontend Developer</div>
          </div>
          <a href={CV_PATH} download="Ajayi-Abisola-Enoch-CV.pdf" className="btn-ghost">
            <i className="fas fa-download" aria-hidden="true" /> Download
          </a>
        </div>
        <iframe src={CV_PATH} title="Ajayi Abisola Enoch — CV preview" className="cv-preview-frame" />
        <a href={CV_PATH} target="_blank" rel="noreferrer" className="cv-preview-fallback">
          Can't see the preview? Open the PDF in a new tab{' '}
          <i className="fas fa-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
