import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import type { Profile } from '../data/portfolio';

export function ContactSection({ profile }: { profile: Profile }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="contact" className="contact-section section-wrap">
      <motion.div className="contact-panel" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}>
        <div className="contact-orbit" aria-hidden="true" />
        <div className="section-kicker"><span className="section-index">06</span><span>Open to good ideas</span></div>
        <h2>Have something<br /><span className="text-accent">worth building?</span></h2>
        <p>From full-stack features to thoughtful AI experiments, I’d love to hear what you’re working on.</p>
        <a className="button button-primary contact-email" href={`mailto:${profile.email}`}><Mail size={17} /> {profile.email} <ArrowUpRight size={16} /></a>
        <div className="contact-socials">
          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a>
          <a href={profile.github_url} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a>
        </div>
      </motion.div>
    </section>
  );
}
