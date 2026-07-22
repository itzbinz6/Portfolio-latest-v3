import { useState } from 'react';

const FAQS = [
  {
    q: 'Are you available for internships or freelance work right now?',
    a: "Yes. I'm a CS undergrad at Landmark University, open to internships, part-time frontend roles, and freelance projects. I work around lectures, so I'm upfront about timelines from the first message — no vague promises.",
  },
  {
    q: "What's your stack?",
    a: "React and Next.js on the frontend, Firebase for auth, data, and hosting, and Tailwind for styling — all in TypeScript. I've also built and tested smart contracts with Solidity and Hardhat. If something's outside that, I'll say so instead of guessing.",
  },
  {
    q: 'Do you work remote, across time zones?',
    a: "All of my client work so far has been remote. I'm based in Nigeria (WAT, UTC+1) and comfortable working async — WhatsApp and email are the fastest ways to sync up on a project.",
  },
  {
    q: "How do you actually work — what's your style?",
    a: "I think before I move. Detail matters a lot to me — I'll spend more time than necessary on something small if it doesn't feel right. I'm not the fastest, but I'm thorough, and I'm honest about what I know versus what I'm still figuring out.",
  },
  {
    q: "What's the best way to reach you?",
    a: 'WhatsApp is fastest. Email works too. I read everything and reply to most things. If you just want to say something — a thought, a question, feedback on something you saw here — that\u2019s welcome too. No agenda needed.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list fade-in visible">
      {FAQS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className={`faq-item${isOpen ? ' open' : ''}`}>
            <button
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {item.q} <i className="fas fa-chevron-down" aria-hidden="true" />
            </button>
            <div className="faq-a">{item.a}</div>
          </div>
        );
      })}
    </div>
  );
}
