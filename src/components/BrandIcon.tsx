import {
  siApachemaven,
  siGit,
  siGithub,
  siHibernate,
  siIntellijidea,
  siJavascript,
  siMongodb,
  siMysql,
  siPostman,
  siPython,
  siReact,
  siSpring,
  siSpringboot,
  siSpringsecurity,
} from 'simple-icons';
import { Code2, Database, Layers3, Sparkles } from 'lucide-react';

type BrandShape = { title: string; hex: string; path: string };
const registry: Record<string, BrandShape | undefined> = {
  siApachemaven,
  siGit,
  siGithub,
  siHibernate,
  siIntellijidea,
  siJavascript,
  siMongodb,
  siMysql,
  siPostman,
  siPython,
  siReact,
  siSpring,
  siSpringboot,
  siSpringsecurity,
};

interface BrandIconProps {
  iconKey?: string | null;
  label: string;
  className?: string;
}

export function BrandIcon({ iconKey, label, className = '' }: BrandIconProps) {
  const shared = { className: `brand-icon ${className}`, 'aria-hidden': true as const };
  if (iconKey === 'siJava') return <img {...shared} src="/icons/java.svg" alt="" decoding="async" />;
  const icon = iconKey ? registry[iconKey] : undefined;

  if (icon) {
    return (
      <svg {...shared} viewBox="0 0 24 24" role="img" focusable="false">
        <path d={icon.path} fill="currentColor" />
      </svg>
    );
  }

  const lower = `${iconKey ?? ''} ${label}`.toLowerCase();
  if (lower.includes('database') || lower.includes('mysql') || lower.includes('sql')) return <Database {...shared} />;
  if (lower.includes('rag') || lower.includes('layer')) return <Layers3 {...shared} />;
  if (lower.includes('ai') || lower.includes('llm') || lower.includes('sparkle')) return <Sparkles {...shared} />;
  return <Code2 {...shared} />;
}
