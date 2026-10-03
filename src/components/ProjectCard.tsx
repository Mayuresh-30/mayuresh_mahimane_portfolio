import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Sparkles } from 'lucide-react';
import type { Project } from '../data/portfolio';

const labels = { working: 'Working', deployed: 'Deployed', completed: 'Completed' } as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const destination = project.status === 'deployed' ? project.live_url : project.github_url;
  const actionLabel = project.status === 'deployed' ? 'Open live project' : 'View repository';

  return (
    <motion.article
      className="project-card"
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <div className="project-number">0{index + 1}</div>
      <div className="project-main">
        <div className="project-topline">
          <span className={`status-pill status-${project.status}`}><i />{labels[project.status]}</span>
          <span className="project-subtitle">{project.subtitle}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags" aria-label="Technologies used">
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      </div>
      <div className="project-side">
        <div className="project-glyph" aria-hidden="true">{project.name.includes('AI') ? <Sparkles /> : <span>{project.name.slice(0, 2).toUpperCase()}</span>}</div>
        {destination ? (
          <a className="project-link" href={destination} target="_blank" rel="noopener noreferrer" aria-label={`${actionLabel}: ${project.name}`}>
            {project.status === 'deployed' ? 'Live site' : 'GitHub'} {project.status === 'deployed' ? <ArrowUpRight size={16} /> : <Github size={16} />}
          </a>
        ) : <span className="project-link muted-link">Link coming soon</span>}
      </div>
    </motion.article>
  );
}
