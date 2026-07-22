export interface Project {
  /** Firestore document id — attached automatically by useCollection, used to route to the case-study page at /work/:id */
  id?: string;
  order: number;
  type: string;
  name: string;
  demoTag?: boolean;
  description: string;
  imageUrl?: string;
  link?: string;
  /** Link to the source code, e.g. a GitHub repo */
  githubUrl?: string;
  /** Tech stack tags shown as chips, e.g. ["React", "Firebase", "Tailwind"] */
  stack?: string[];
  /** Case-study fields — all optional, shown on the /work/:id detail page when present */
  role?: string;
  timeline?: string;
  process?: string;
  challenges?: string;
  outcome?: string;
  gallery?: string[];
}

export type SkillColor = 'yellow' | 'blue' | 'green' | 'purple' | 'red' | 'teal';

export interface Skill {
  order: number;
  color: SkillColor;
  icon: string; // Font Awesome class, e.g. "fab fa-react"
  name: string;
  description: string;
}

export interface Certification {
  order: number;
  issuer: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
}

export interface BlogPost {
  order: number;
  tag: string;
  title: string;
  preview: string;
  link?: string;
}
