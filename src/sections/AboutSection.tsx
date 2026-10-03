import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BrainCircuit, Braces, Workflow } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

const principles = [
  { icon: Braces, number: '01', title: 'Full-stack foundations', text: 'Thoughtful interfaces, clear APIs, and dependable data flows.' },
  { icon: BrainCircuit, number: '02', title: 'Practical AI', text: 'Exploring how LLMs can make everyday software more useful.' },
  { icon: Workflow, number: '03', title: 'Built to evolve', text: 'Clean structure and reusable components that leave room to grow.' },
];

export function AboutSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="about" className="content-section section-wrap">
      <SectionHeading index="01" eyebrow="A little about me" title="Engineering with curiosity." description="A grounded engineering mindset, with a growing focus on AI." />
      <div className="about-layout">
        <motion.div className="about-copy" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}>
          <p className="about-lede">I enjoy making technology feel <span>clear, capable, and human.</span></p>
          <p>My work spans Java and Spring Boot services, React interfaces, and the systems that connect them. I’m now building Python-based AI projects and learning how LLMs, retrieval-augmented generation, and vector databases can fit into reliable full-stack products.</p>
          <a className="text-link" href="#projects">See what I’m building <ArrowUpRight size={15} /></a>
        </motion.div>
        <div className="principle-list">
          {principles.map(({ icon: Icon, number, title, text }, index) => (
            <motion.article className="principle-item" key={number} initial={reduceMotion ? false : { opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.08 }}>
              <span className="principle-number">{number}</span>
              <div className="principle-icon"><Icon size={17} aria-hidden="true" /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
