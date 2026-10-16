import {
  SiDotnet,
  SiPostgresql,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiDocker,
  SiSupabase,
  SiNginx,
  SiTailwindcss,
  SiGithubactions,
  SiFedora,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { FaAws } from 'react-icons/fa';

// Logos reais das marcas (react-icons/si), só logo e nome, sem rótulo de categoria.
const STACK = [
  { name: 'C#', icon: TbBrandCSharp },
  { name: '.NET', icon: SiDotnet },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Docker', icon: SiDocker },
  { name: 'AWS', icon: FaAws },
  { name: 'Supabase', icon: SiSupabase },
  { name: 'nginx', icon: SiNginx },
  { name: 'GitHub Actions', icon: SiGithubactions },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Fedora Linux', icon: SiFedora },
];

function Row({ hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {STACK.map(({ name, icon: Icon }) => (
        <li
          key={name}
          className="glass-inset flex items-center gap-2.5 rounded-full px-4 py-2.5 text-base font-medium whitespace-nowrap text-foreground/85"
        >
          <Icon className="size-[18px] text-foreground/70" aria-hidden="true" />
          {name}
        </li>
      ))}
    </ul>
  );
}

export default function StackMarquee({ label }) {
  return (
    <section aria-label={label} className="marquee overflow-hidden py-2">
      <div className="marquee__track">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
