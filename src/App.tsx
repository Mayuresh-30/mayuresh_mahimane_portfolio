import { useEffect, useState } from 'react';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { EducationSection } from './sections/EducationSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { loadPortfolio } from './lib/api';
import { FALLBACK_PORTFOLIO } from './data/portfolio';

export default function App() {
  const [portfolio, setPortfolio] = useState(FALLBACK_PORTFOLIO);
  const [usingSeed, setUsingSeed] = useState(true);
  const [databaseConnected, setDatabaseConnected] = useState(false);

  useEffect(() => {
    let active = true;
    loadPortfolio().then((result) => {
      if (!active) return;
      setPortfolio(result.payload);
      setUsingSeed(result.contentSource === 'seed');
      setDatabaseConnected(result.databaseConnected);
    }).catch(() => {
      if (active) {
        setUsingSeed(true);
        setDatabaseConnected(false);
      }
    });
    return () => { active = false; };
  }, []);

  const { profile, skills, projects } = portfolio;
  return (
    <div className="site-shell">
      <div className="ambient-glow ambient-glow-top" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-bottom" aria-hidden="true" />
      <SiteHeader />
      <main>
        <HeroSection profile={profile} />
        {usingSeed && <div className="data-note" role="status">{databaseConnected ? 'MySQL is connected, but the starter records have not been loaded yet. Run pnpm db:migrate and pnpm db:seed.' : 'Showing bundled preview content. Connect MySQL and run pnpm db:migrate and pnpm db:seed to load portfolio content from the database.'}</div>}
        <AboutSection />
        <SkillsSection skills={skills} />
        <ExperienceSection items={profile.experience} />
        <ProjectsSection projects={projects} />
        <EducationSection items={profile.education} />
        <ContactSection profile={profile} />
      </main>
      <SiteFooter />
    </div>
  );
}
