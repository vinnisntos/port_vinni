import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaPython,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
import {
  SiPostgresql,
  SiTailwindcss,
  SiVite,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const skills = [
  { name: 'React 19', icon: FaReact, level: 90, color: 'text-cyan-400' },
  { name: 'C# .NET', icon: TbBrandCSharp, level: 90, color: 'text-purple-400' },
  { name: 'TypeScript', icon: SiTypescript, level: 65, color: 'text-blue-400' },
  { name: 'PostgreSQL', icon: SiPostgresql, level: 75, color: 'text-yellow-400' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: 'text-cyan-400' },
  { name: 'Node.js', icon: FaNodeJs, level: 80, color: 'text-green-400' },
  { name: 'Git', icon: FaGitAlt, level: 70, color: 'text-orange-400' },
  { name: 'Docker', icon: FaDocker, level: 40, color: 'text-blue-400' },
  { name: 'Python', icon: FaPython, level: 70, color: 'text-yellow-400' },
  { name: 'Vite', icon: SiVite, level: 65, color: 'text-purple-400' },
];

const competencies = [
  {
    title: 'Desenvolvimento Full Stack',
    description:
      'Criação de aplicações web completas, do frontend ao backend, com foco em performance e escalabilidade.',
  },
  {
    title: 'APIs RESTful',
    description:
      'Design e implementação de APIs robustas e bem documentadas para integração entre sistemas.',
  },
  {
    title: 'Banco de Dados',
    description:
      'Modelagem, otimização e gerenciamento de bancos de dados relacionais e não-relacionais.',
  },
  {
    title: 'UX/UI Design',
    description:
      'Criação de interfaces intuitivas e acessíveis, seguindo boas práticas de design moderno.',
  },
];

const stackDetails = [
  { name: 'Vite 8', desc: 'build ultra-rápido' },
  { name: 'React 19', desc: 'com hooks modernos' },
  { name: 'Tailwind CSS v4', desc: 'nativo no Vite' },
  { name: 'React Router v7', desc: 'para navegação' },
  { name: 'Validações brasileiras', desc: 'algoritmos oficiais' },
  { name: 'API ViaCEP', desc: 'busca de endereços' },
];

export default function About() {
  return (
    <div className="pt-24 pb-12">
      <PageHeader tag="[ sobre // desenvolvedor ]" title="SOBRE" accent="MIM" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card de perfil — sticky em telas grandes */}
        <aside className="lg:col-span-1" aria-label="Resumo do perfil">
          <Card glow className="sticky top-28">
            <div className="flex flex-col items-center text-center">
              <div
                aria-hidden="true"
                className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              >
                <span className="text-4xl font-black text-white">VS</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Vinnicius Santos
              </h2>
              <p className="text-purple-400 font-mono text-sm mb-4">
                Full Stack Developer
              </p>

              <p className="text-muted text-sm leading-relaxed mb-6">
                Desenvolvedor apaixonado por criar soluções reais e eficientes.
                Especialista em React e C# .NET, com foco em entregar
                experiências de qualidade que resolvem problemas do mundo real.
              </p>

              <div className="flex gap-3">
                <a
                  href="https://github.com/vinnisntos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs font-mono uppercase inline-flex items-center gap-2"
                >
                  <FaGithub aria-hidden="true" /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/vinnisantos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs font-mono uppercase inline-flex items-center gap-2"
                >
                  <FaLinkedin aria-hidden="true" /> LinkedIn
                </a>
              </div>
            </div>
          </Card>
        </aside>

        {/* Conteúdo */}
        <div className="lg:col-span-2 space-y-8">
          {/* Minha História */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-500" aria-hidden="true">//</span>
              Minha História
            </h3>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Comecei minha jornada na programação explorando as possibilidades
                da web. O que começou como curiosidade sobre como sites funcionavam
                se transformou em uma carreira dedicada a construir soluções
                digitais.
              </p>
              <p>
                Atualmente trabalho como Desenvolvedor Full Stack, focando em
                criar aplicações que unem tecnologia de ponta com usabilidade
                excepcional. Minha stack principal envolve React no frontend e
                C# .NET no backend, com PostgreSQL como banco de dados.
              </p>
              <p>
                Este portfólio foi construído com{' '}
                <span className="text-purple-400">React 19</span> e{' '}
                <span className="text-purple-400">Tailwind CSS v4</span>,
                utilizando as tecnologias mais modernas do ecossistema. Cada
                ferramenta aqui presente foi desenvolvida para demonstrar
                habilidades práticas e resolver necessidades reais de
                desenvolvedores.
              </p>
            </div>
          </Card>

          {/* Skills */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-purple-500" aria-hidden="true">//</span>
              Competências Técnicas
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
              {skills.map((skill) => (
                <li key={skill.name} className="flex items-center gap-3">
                  <skill.icon
                    className={`w-6 h-6 ${skill.color} flex-shrink-0`}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">{skill.name}</span>
                      <span className="text-xs text-gray-500 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 bg-white/5 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name}: ${skill.level}%`}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Competências */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-purple-500" aria-hidden="true">//</span>
              Áreas de Atuação
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
              {competencies.map((item) => (
                <li
                  key={item.title}
                  className="p-4 bg-white/5 border border-white/5 rounded-lg"
                >
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Como construí */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-500" aria-hidden="true">//</span>
              Como Construí Este Portfólio
            </h3>
            <ul className="space-y-3 text-muted text-sm list-none">
              {stackDetails.map((item) => (
                <li key={item.name} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                  />
                  <span>
                    <span className="text-white font-mono">{item.name}</span>{' '}
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}