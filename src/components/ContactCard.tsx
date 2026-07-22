export default function ContactCard() {
  return (
    <div className="contact-card fade-in visible">
      <a href="mailto:abisolaajayi360@gmail.com" className="contact-card-row">
        <div className="contact-card-icon">
          <i className="fas fa-envelope" aria-hidden="true" />
        </div>
        <div>
          <div className="contact-card-label">Email</div>
          <div className="contact-card-value">abisolaajayi360@gmail.com</div>
        </div>
      </a>

      <a
        href="https://wa.me/2348081595625"
        target="_blank"
        rel="noreferrer"
        className="contact-card-row"
      >
        <div className="contact-card-icon">
          <i className="fab fa-whatsapp" aria-hidden="true" />
        </div>
        <div>
          <div className="contact-card-label">WhatsApp</div>
          <div className="contact-card-value">+234 808 159 5625</div>
        </div>
      </a>

      <a
        href="/cv/ajayi-abisola-enoch-cv.pdf"
        download="Ajayi-Abisola-Enoch-CV.pdf"
        className="contact-card-row"
      >
        <div className="contact-card-icon">
          <i className="fas fa-download" aria-hidden="true" />
        </div>
        <div>
          <div className="contact-card-label">CV</div>
          <div className="contact-card-value">Download PDF</div>
        </div>
      </a>

      <div className="contact-card-secondary">
        <a
          href="https://www.linkedin.com/in/abisola-ajayi-/"
          target="_blank"
          rel="noreferrer"
          className="contact-card-chip"
        >
          <i className="fab fa-linkedin" aria-hidden="true" /> LinkedIn
        </a>
        <a
          href="https://www.instagram.com/heis__enoch/"
          target="_blank"
          rel="noreferrer"
          className="contact-card-chip"
        >
          <i className="fab fa-instagram" aria-hidden="true" /> @heis__enoch
        </a>
      </div>

      <a href="mailto:abisolaajayi360@gmail.com" className="submit-btn contact-card-cta">
        <i className="fas fa-paper-plane" aria-hidden="true" /> Send an email
      </a>
    </div>
  );
}
