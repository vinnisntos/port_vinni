import { useLocation } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaLanguage,
  FaDownload,
} from 'react-icons/fa';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { aboutPt } from '../content/about.pt';
import { aboutEn } from '../content/about.en';
import { useLocale, getLocalizedPath } from '../hooks/useLocale';
import { useDocumentHead } from '../hooks/useDocumentHead';

const SITE_URL = 'https://vinnisantos.com.br';

const historyPt = (
  <>
    <p>
      Antes de entrar para a área de tecnologia, passei por ambientes
      industriais e comerciais bem exigentes — de linha de produção a
      vendas B2B, passando por logística, controle financeiro e atendimento
      consultivo a clientes corporativos. Essa vivência me deu uma visão
      prática de processos de negócio e resolução de problemas que levo
      comigo para o desenvolvimento de software.
    </p>
    <p>
      Hoje sou estudante de{' '}
      <span className="text-purple-400">
        Análise e Desenvolvimento de Sistemas
      </span>{' '}
      na UNIP e atuo como estagiário de TI em HelpDesk/DevOps na Going2,
      enquanto mantenho projetos próprios de backend/fullstack. Tenho
      experiência prática criando soluções e automações com{' '}
      <span className="text-purple-400">C#</span>,{' '}
      <span className="text-purple-400">Python</span> e bancos de
      dados SQL, além de estar me aprofundando em JavaScript/
      TypeScript e boas práticas de UX/UI.
    </p>
    <p>
      Este portfólio foi construído com{' '}
      <span className="text-purple-400">React 19</span> e{' '}
      <span className="text-purple-400">Tailwind CSS v4</span> como
      forma de colocar em prática o que venho estudando — cada
      ferramenta aqui presente foi desenvolvida para demonstrar
      habilidades reais e resolver necessidades práticas de
      desenvolvedores.
    </p>
  </>
);

const historyEn = (
  <>
    <p>
      Before moving into tech, I worked in demanding industrial and
      commercial environments — from production lines to B2B sales,
      through logistics, financial control, and consultative service to
      corporate clients. That experience gave me a practical
      understanding of business processes and problem-solving that I
      bring into software development.
    </p>
    <p>
      Today I'm a{' '}
      <span className="text-purple-400">
        Systems Analysis and Development
      </span>{' '}
      student at UNIP and work as an IT Intern in Helpdesk/DevOps at
      Going2, while maintaining my own backend/full-stack projects. I
      have hands-on experience building solutions and automations with{' '}
      <span className="text-purple-400">C#</span>,{' '}
      <span className="text-purple-400">Python</span>, and SQL
      databases, and I'm deepening my knowledge of JavaScript/TypeScript
      and UX/UI best practices.
    </p>
    <p>
      This portfolio was built with{' '}
      <span className="text-purple-400">React 19</span> and{' '}
      <span className="text-purple-400">Tailwind CSS v4</span> as a way
      to put what I've been studying into practice — every tool here was
      built to demonstrate real skills and solve practical problems
      developers face.
    </p>
  </>
);

export default function About() {
  const locale = useLocale();
  const { pathname } = useLocation();
  const t = locale === 'en' ? aboutEn : aboutPt;
  const history = locale === 'en' ? historyEn : historyPt;

  useDocumentHead({
    title: t.seo.title,
    description: t.seo.description,
    lang: locale === 'en' ? 'en-US' : 'pt-BR',
    alternates: [
      { hreflang: 'pt-BR', href: SITE_URL + getLocalizedPath(pathname, 'pt') },
      { hreflang: 'en-US', href: SITE_URL + getLocalizedPath(pathname, 'en') },
      { hreflang: 'x-default', href: SITE_URL + getLocalizedPath(pathname, 'pt') },
    ],
  });

  return (
    <div className="pt-24 pb-12">
      <PageHeader tag={t.pageHeader.tag} title={t.pageHeader.title} accent={t.pageHeader.accent} />

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

              <h2 className="text-2xl font-bold text-white mb-1">
                Vinnicius Santos
              </h2>
              <p className="text-gray-500 text-xs mb-3">
                Vinnicius Gabriel Matos dos Santos
              </p>
              <p className="text-purple-400 font-mono text-sm mb-4">
                {t.profile.roleTag}
              </p>

              <p className="text-muted text-sm leading-relaxed mb-6">
                {t.profile.bio}
              </p>

              <dl className="w-full space-y-2 mb-6 text-left">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <FaMapMarkerAlt
                    className="text-purple-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <dd>{t.profile.location}</dd>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <FaPhoneAlt
                    className="text-purple-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <dd>
                    {t.profile.phones.map((phone, i) => (
                      <span key={phone.href}>
                        {i > 0 && ' · '}
                        <a
                          href={phone.href}
                          className="hover:text-purple-400 transition-colors"
                        >
                          {phone.display}
                        </a>
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <Button
                as="a"
                href={`${import.meta.env.BASE_URL}${t.resumeCta.primaryFile}`}
                download={t.resumeCta.primaryDownloadName}
                variant="primary"
                size="md"
                className="w-full mb-3"
              >
                <FaDownload aria-hidden="true" /> {t.resumeCta.primaryLabel}
              </Button>

              <Button
                as="a"
                href={`${import.meta.env.BASE_URL}${t.resumeCta.secondaryFile}`}
                download={t.resumeCta.secondaryDownloadName}
                variant="outline"
                size="md"
                className="w-full mb-6"
              >
                <FaDownload aria-hidden="true" /> {t.resumeCta.secondaryLabel}
              </Button>

              <div className="flex gap-3">
                <a
                  href="https://github.com/vinnisntos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs font-mono uppercase inline-flex items-center gap-2"
                >
                  <FaGithub aria-hidden="true" /> {t.social.github}
                </a>
                <a
                  href="https://linkedin.com/in/vinnisantos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs font-mono uppercase inline-flex items-center gap-2"
                >
                  <FaLinkedin aria-hidden="true" /> {t.social.linkedin}
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
              {t.sectionHeadings.history}
            </h3>
            <div className="space-y-4 text-muted leading-relaxed">
              {history}
            </div>
          </Card>

          {/* Competências Técnicas */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-purple-500" aria-hidden="true">//</span>
              {t.sectionHeadings.skills}
            </h3>
            <div className="space-y-6">
              {t.skillGroups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-3">
                    {group.title}
                  </h4>
                  <ul className="flex flex-wrap gap-2 list-none">
                    {group.items.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-sm text-white"
                      >
                        <skill.icon
                          className="text-purple-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* Experiência Profissional */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <FaBriefcase className="text-purple-500" aria-hidden="true" />
              {t.sectionHeadings.experience}
            </h3>
            <ol className="space-y-6 list-none">
              {t.experience.map((job) => (
                <li
                  key={job.company}
                  className="border-l-2 border-purple-500/30 pl-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <h4 className="text-white font-semibold">
                      {job.role}{' '}
                      <span className="text-purple-400 font-normal">
                        · {job.company}
                      </span>
                    </h4>
                    <span className="text-xs text-gray-500 font-mono whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5 list-none">
                    {job.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-sm text-muted leading-relaxed flex gap-2"
                      >
                        <span className="text-purple-500 flex-shrink-0" aria-hidden="true">
                          →
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Card>

          {/* Formação Acadêmica */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <FaGraduationCap className="text-purple-500" aria-hidden="true" />
              {t.sectionHeadings.education}
            </h3>
            <div>
              <h4 className="text-white font-semibold">{t.education.degree}</h4>
              <p className="text-purple-400 text-sm mb-1">{t.education.school}</p>
              <p className="text-sm text-muted">{t.education.note}</p>
            </div>
          </Card>

          {/* Cursos e Certificações */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <FaCertificate className="text-purple-500" aria-hidden="true" />
              {t.sectionHeadings.courses}
            </h3>
            <ul className="space-y-3 list-none">
              {t.courses.map((course) => (
                <li
                  key={course.name}
                  className="flex items-start justify-between gap-4 pb-3 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm text-white">{course.name}</p>
                    <p className="text-xs text-gray-500">{course.org}</p>
                  </div>
                  <span className="text-xs text-purple-400 font-mono whitespace-nowrap">
                    {course.year}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Idiomas */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <FaLanguage className="text-purple-500" aria-hidden="true" />
              {t.sectionHeadings.languages}
            </h3>
            <ul className="space-y-3 list-none">
              {t.languages.map((lang) => (
                <li key={lang.name}>
                  <span className="text-white font-semibold">{lang.name}</span>
                  {lang.level && (
                    <span className="text-purple-400 text-xs font-mono ml-2 uppercase">
                      {lang.level}
                    </span>
                  )}
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    {lang.text}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Como construí */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-500" aria-hidden="true">//</span>
              {t.sectionHeadings.stack}
            </h3>
            <ul className="space-y-3 text-muted text-sm list-none">
              {t.stackDetails.map((item) => (
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
