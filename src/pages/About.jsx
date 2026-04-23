import React from 'react';
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaPython, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiPostgresql, SiTailwindcss, SiVite, SiTypescript } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import Card from '../components/ui/Card';

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
  { name: 'Vite', icon: SiVite, level: 65, color: 'text-purple-400' }
];

const competencies = [
  {
    title: 'Desenvolvimento Full Stack',
    description: 'Criação de aplicações web completas, do frontend ao backend, com foco em performance e escalabilidade.'
  },
  {
    title: 'APIs RESTful',
    description: 'Design e implementação de APIs robustas e bem documentadas para integração entre sistemas.'
  },
  {
    title: 'Banco de Dados',
    description: 'Modelagem, otimização e gerenciamento de bancos de dados relacionais e não-relacionais.'
  },
  {
    title: 'UX/UI Design',
    description: 'Criação de interfaces intuitivas e acessíveis, seguindo boas práticas de design moderno.'
  }
];

export default function About() {
  return (
    <div className="pt-24 pb-12">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-block px-3 py-1 mb-4 border border-purple-500/30 bg-purple-500/5 text-purple-400 font-mono text-[10px] tracking-widest uppercase">
          [ sobre // desenvolvedor ]
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          SOBRE <span className="text-purple-500">MIM</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Profile Card */}
        <div className="lg:col-span-1">
          <Card glow className="sticky top-28">
            <div className="flex flex-col items-center text-center">
              {/* Avatar Placeholder */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                <span className="text-4xl font-black text-white">VS</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Vinnicius Santos</h2>
              <p className="text-purple-400 font-mono text-sm mb-4">Full Stack Developer</p>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Desenvolvedor apaixonado por criar soluções reais e eficientes.
                Especialista em React e C# .NET, com foco em entregar experiências
                de qualidade que resolvem problemas do mundo real.
              </p>

              <div className="flex gap-3">
                <a
                  href="https://github.com/vinnisntos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs font-mono uppercase"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/vinnisantos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs font-mono uppercase"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Story Section */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-500">//</span>
              Minha História
            </h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Comecei minha jornada na programação explorando as possibilidades da web.
                O que começou como curiosidade sobre como sites funcionavam se transformou
                em uma carreira dedicada a construir soluções digitais.
              </p>
              <p>
                Atualmente trabalho como Desenvolvedor Full Stack, focando em criar
                aplicações que unem tecnologia de ponta com usabilidade excepcional.
                Minha stack principal envolve React no frontend e C# .NET no backend,
                com PostgreSQL como banco de dados.
              </p>
              <p>
                Este portfólio foi construído com <span className="text-purple-400">React 19</span> e <span className="text-purple-400">Tailwind CSS v4</span>,
                utilizando as tecnologias mais modernas do ecossistema. Cada ferramenta
                aqui presente foi desenvolvida para demonstrar habilidades práticas e
                resolver necessidades reais de desenvolvedores.
              </p>
            </div>
          </Card>

          {/* Skills Section */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-purple-500">//</span>
              Competências Técnicas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <skill.icon className={`w-6 h-6 ${skill.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">{skill.name}</span>
                      <span className="text-xs text-gray-500 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Competencies Section */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-purple-500">//</span>
              Áreas de Atuação
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {competencies.map((item) => (
                <div key={item.title} className="p-4 bg-white/5 border border-white/5 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* How I Built This */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-500">//</span>
              Como Construí Este Portfólio
            </h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span><span className="text-white font-mono">Vite 8</span> para build ultra-rápido</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span><span className="text-white font-mono">React 19</span> com hooks modernos</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span><span className="text-white font-mono">Tailwind CSS v4</span> nativo no Vite</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span><span className="text-white font-mono">React Router v7</span> para navegação</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Validações brasileiras com algoritmos oficiais</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>API ViaCEP para busca de endereços</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
