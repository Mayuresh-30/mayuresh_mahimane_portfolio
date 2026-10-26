import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { EducationSection } from './sections/EducationSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { PORTFOLIO } from './data/portfolio';

export default function App() {
  const { profile, skills, projects } = PORTFOLIO;
  return (
    <div className="site-shell">
      <div className="ambient-glow ambient-glow-top" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-bottom" aria-hidden="true" />
      <SiteHeader email={profile.email} />
      <main>
        <HeroSection profile={profile} />
        <AboutSection bio={profile.bio} />
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
