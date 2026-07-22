import { FormEvent, useState } from 'react';

interface Errors {
  name?: boolean;
  email?: boolean;
  msg?: boolean;
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: Errors = {
      name: !name.trim(),
      email: !email.trim(),
      msg: !msg.trim(),
    };
    setErrors(nextErrors);

    if (!nextErrors.name && !nextErrors.email && !nextErrors.msg) {
      // No backend endpoint wired up yet — this only confirms the
      // message locally. Flagging as an assumption: hook this up to
      // a real submission target (e.g. Formspree, a Firestore
      // "messages" collection, or a mailto fallback) when ready.
      setSuccess(true);
      setName('');
      setEmail('');
      setMsg('');
    }
  }

  return (
    <form className="contact-form fade-in visible" onSubmit={handleSubmit} noValidate>
      <div className="cf-group">
        <label htmlFor="cfName">Your Name *</label>
        <input
          id="cfName"
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name || undefined}
        />
        {errors.name && <div className="cf-error">Please enter your name.</div>}
      </div>
      <div className="cf-group">
        <label htmlFor="cfEmail">Email or WhatsApp *</label>
        <input
          id="cfEmail"
          type="text"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email || undefined}
        />
        {errors.email && <div className="cf-error">Please enter your email or number.</div>}
      </div>
      <div className="cf-group">
        <label htmlFor="cfMsg">Say what's on your mind *</label>
        <textarea
          id="cfMsg"
          placeholder="Feedback, a question, a thought, a collab idea — anything. No agenda needed."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          aria-invalid={errors.msg || undefined}
        />
        {errors.msg && <div className="cf-error">Please add a short message.</div>}
      </div>
      <button className="submit-btn" type="submit">
        Send Message
      </button>
      {success && <div className="cf-success">Message sent! I'll get back to you shortly.</div>}
    </form>
  );
}
