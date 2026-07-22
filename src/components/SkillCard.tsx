import { Skill } from '../lib/types';

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="skill-card">
      <div className={`skill-icon ${skill.color}`}>
        <i className={skill.icon} aria-hidden="true" />
      </div>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-desc">{skill.description}</div>
    </div>
  );
}
