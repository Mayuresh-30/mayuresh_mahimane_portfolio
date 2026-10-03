import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Stack' },
  { href: '#experience', label: 'Journey' },
  { href: '#projects', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#top" aria-label="Mayuresh Mahimane home">
          <span className="wordmark-name">MAYURESH<br /><b>MAHIMANE</b></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="header-cta" href="mailto:mayureshmahimane3005@gmail.com?subject=Portfolio%20inquiry">
          Let’s talk <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <button className="mobile-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
            <a href="mailto:mayureshmahimane3005@gmail.com?subject=Portfolio%20inquiry" onClick={() => setOpen(false)}>Email Mayuresh</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
