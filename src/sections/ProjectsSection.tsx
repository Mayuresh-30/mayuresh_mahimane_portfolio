import { useMemo, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import type { Project, ProjectStatus } from '../data/portfolio';

const filters: { value: 'all' | ProjectStatus; label: string }[] = [
  { value: 'all', label: 'All work' },
  { value: 'working', label: 'Working' },
  { value: 'deployed', label: 'Deployed' },
  { value: 'completed', label: 'Completed' },
];

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<'all' | ProjectStatus>('all');
  const reduceMotion = useReducedMotion();
  const filtered = useMemo(() => projects.filter((project) => filter === 'all' || project.status === filter), [filter, projects]);
  return (
    <section id="projects" className="content-section projects-section section-wrap">
      <SectionHeading index="05" eyebrow="Selected work" title="Projects with a purpose." description="A mix of full-stack foundations and practical AI experiments." />
      <div className="project-controls" role="group" aria-label="Filter projects by status">
        <span className="filter-label">FILTER BY STATUS</span>
        <div className="filter-buttons">
          {filters.map((item) => <button key={item.value} type="button" className={filter === item.value ? 'filter-button active' : 'filter-button'} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}
        </div>
      </div>
      <div className="project-list" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </AnimatePresence>
      </div>
      {!filtered.length && <p className="empty-projects">No projects in this status yet.</p>}
      {!reduceMotion && <p className="projects-note">Project descriptions reflect the repository READMEs. Statuses can be updated as each project evolves.</p>}
    </section>
  );
}
