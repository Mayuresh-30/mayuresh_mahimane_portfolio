import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import type { ExperienceItem } from '../data/portfolio';

export function ExperienceSection({ items }: { items: ExperienceItem[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="experience" className="content-section section-wrap">
      <SectionHeading index="03" eyebrow="Where I’ve contributed" title="Experience, built hands-on." description="Learning by building and shipping real application workflows." />
      <div className="experience-list">
        {items.map((item, index) => (
          <motion.article className="experience-card" key={`${item.company}-${item.period}`} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}>
            <div className="experience-period"><span className="timeline-dot" />{item.period}</div>
            <div className="experience-details">
              <div className="experience-title-row"><div><h3>{item.role}</h3><p className="experience-company">{item.company} <span>·</span> {item.location}</p></div><ArrowUpRight className="experience-arrow" size={18} aria-hidden="true" /></div>
              <p className="experience-description">{item.description}</p>
              <div className="experience-tags">{item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
