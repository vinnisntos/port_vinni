import { useLocation } from 'react-router-dom';
import { DownloadSimple, GithubLogo, LinkedinLogo, MapPin, Phone } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassCard from '../components/site/GlassCard';
import PageHeader from '../components/site/PageHeader';
import Reveal from '../components/site/Reveal';
import Seo from '../components/Seo';
import { aboutPt } from '../content/about.pt';
import { aboutEn } from '../content/about.en';
import { personNode } from '../utils/seo';
import { useLocale, getLocalizedPath } from '../hooks/useLocale';

const SITE_URL = 'https://vinnisantos.com.br';

// Termos-chave em destaque: mesma fonte, só mais peso e tom cheio.
const Em = ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>;

const historyPt = (
  <>
    <p>
      Antes de entrar para a área de tecnologia, passei por ambientes industriais e comerciais bem
      exigentes: de linha de produção a vendas B2B, passando por logística, controle financeiro e
      atendimento consultivo a clientes corporativos. Essa vivência me deu uma visão prática de
      processos de negócio e resolução de problemas que levo comigo para o desenvolvimento de software.
    </p>
    <p>
      Hoje sou estudante de <Em>Análise e Desenvolvimento de Sistemas</Em> na UNIP e estagiário de TI
      na Going2. Entrei para cuidar de suporte e governança de TI e, em menos de dois meses, fui chamado
      para o time de automação e IA para desenvolver a plataforma B2B da empresa, em <Em>Next.js</Em>,{' '}
      <Em>TypeScript</Em> e <Em>PostgreSQL</Em>, com mentoria dos engenheiros de soluções.
    </p>
    <p>
      Em paralelo, mantenho produtos próprios em produção, a maioria em <Em>C#/.NET</Em>: o PendurAi,
      um PDV/ERP multi-tenant que cofundei, um sistema de reserva de passagens e um painel pessoal que
      uso todos os dias. É neles que pratico arquitetura, segurança e deploy de ponta a ponta.
    </p>
    <p>
      Este portfólio foi construído com <Em>React 19</Em> e <Em>Tailwind CSS v4</Em> como forma de
      colocar em prática o que venho estudando. Cada ferramenta aqui foi desenvolvida para demonstrar
      habilidades reais e resolver necessidades práticas de desenvolvedores.
    </p>
  </>
);

const historyEn = (
  <>
    <p>
      Before moving into tech, I worked in demanding industrial and commercial environments: from
      production lines to B2B sales, through logistics, financial control, and consultative service to
      corporate clients. That experience gave me a practical understanding of business processes and
      problem-solving that I bring into software development.
    </p>
    <p>
      Today I'm a <Em>Systems Analysis and Development</Em> student at UNIP and an IT Intern at Going2.
      I joined to handle IT support and governance and, in under two months, was brought into the
      automation and AI team to build the company's B2B platform with <Em>Next.js</Em>,{' '}
      <Em>TypeScript</Em>, and <Em>PostgreSQL</Em>, mentored by the solutions engineers.
    </p>
    <p>
      Alongside that, I keep my own products running in production, mostly in <Em>C#/.NET</Em>:
      PendurAi, a multi-tenant POS/ERP I co-founded, a ticket reservation system, and a personal
      dashboard I use every day. They are where I practice architecture, security, and deployment end
      to end.
    </p>
    <p>
      This portfolio was built with <Em>React 19</Em> and <Em>Tailwind CSS v4</Em> as a way to put
      what I've been studying into practice. Every tool here was built to demonstrate real skills and
      solve practical problems developers face.
    </p>
  </>
);

function personSchema(locale, path, courses) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${SITE_URL}${path}`,
    mainEntity: {
      ...personNode(locale),
      hasCredential: courses.map((course) => ({
        '@type': 'EducationalOccupationalCredential',
        name: course.name,
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: course.org },
      })),
    },
  };
}

function SectionTitle({ id, children }) {
  return (
    <Reveal>
      <h2 id={id} className="text-3xl leading-tight font-bold tracking-[-0.03em] md:text-4xl">
        {children}
      </h2>
    </Reveal>
  );
}

function ProfileCard({ t, locale }) {
  return (
    <GlassCard spotlight className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-black tracking-tight text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]"
        >
          VS
        </span>
        <div>
          <p className="text-xl font-semibold tracking-tight">Vinnicius Santos</p>
          <p className="text-sm text-muted-foreground">Vinnicius Gabriel Matos dos Santos</p>
        </div>
      </div>

      <Badge variant="signal" className="whitespace-normal">
        {t.profile.roleTag}
      </Badge>

      <p className="text-base leading-relaxed text-foreground/80">{t.profile.bio}</p>

      <dl className="grid gap-3 text-sm">
        <div className="flex items-center gap-3">
          <dt className="sr-only">{locale === 'en' ? 'Location' : 'Localização'}</dt>
          <MapPin className="size-4 shrink-0 text-primary" weight="bold" aria-hidden="true" />
          <dd>{t.profile.location}</dd>
        </div>
        <div className="flex items-start gap-3">
          <dt className="sr-only">{locale === 'en' ? 'Phone' : 'Telefone'}</dt>
          <Phone className="mt-0.5 size-4 shrink-0 text-primary" weight="bold" aria-hidden="true" />
          <dd className="flex flex-wrap gap-x-3 gap-y-1">
            {t.profile.phones.map((phone) => (
              <a key={phone.href} href={phone.href} className="tabular-nums hover:text-primary">
                {phone.display}
              </a>
            ))}
          </dd>
        </div>
      </dl>

      <div className="grid gap-2">
        <Button asChild className="w-full">
          <a href={`${import.meta.env.BASE_URL}${t.resumeCta.primaryFile}`} download={t.resumeCta.primaryDownloadName}>
            <DownloadSimple weight="bold" aria-hidden="true" /> {t.resumeCta.primaryLabel}
          </a>
        </Button>
        <Button asChild variant="secondary" className="w-full">
          <a
            href={`${import.meta.env.BASE_URL}${t.resumeCta.secondaryFile}`}
            download={t.resumeCta.secondaryDownloadName}
          >
            <DownloadSimple weight="bold" aria-hidden="true" /> {t.resumeCta.secondaryLabel}
          </a>
        </Button>
      </div>

      <div className="flex gap-2">
        <Button asChild variant="ghost" size="sm">
          <a href="https://github.com/vinnisntos" target="_blank" rel="noopener noreferrer">
            <GithubLogo weight="bold" aria-hidden="true" /> {t.social.github}
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href="https://linkedin.com/in/vinnisantos" target="_blank" rel="noopener noreferrer">
            <LinkedinLogo weight="bold" aria-hidden="true" /> {t.social.linkedin}
          </a>
        </Button>
      </div>
    </GlassCard>
  );
}

export default function About() {
  const locale = useLocale();
  const { pathname } = useLocation();
  const t = locale === 'en' ? aboutEn : aboutPt;
  const history = locale === 'en' ? historyEn : historyPt;
  const currentPath = locale === 'en' ? '/en/about' : '/about';
  const h = t.sectionHeadings;

  return (
    <div className="pt-36 md:pt-44">
      <Seo
        title={t.seo.title}
        description={t.seo.description}
        path={currentPath}
        lang={locale === 'en' ? 'en-US' : 'pt-BR'}
        structuredData={personSchema(locale, currentPath, t.courses)}
        alternates={[
          { hreflang: 'pt-BR', href: SITE_URL + getLocalizedPath(pathname, 'pt') },
          { hreflang: 'en-US', href: SITE_URL + getLocalizedPath(pathname, 'en') },
          { hreflang: 'x-default', href: SITE_URL + getLocalizedPath(pathname, 'pt') },
        ]}
      />
      <PageHeader title={t.pageHeader.title} accent={t.pageHeader.accent} />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-4" aria-label={locale === 'en' ? 'Profile summary' : 'Resumo do perfil'}>
          <Reveal className="lg:sticky lg:top-28">
            <ProfileCard t={t} locale={locale} />
          </Reveal>
        </aside>

        <div className="flex flex-col gap-24 lg:col-span-8">
          {/* História: texto corrido, sem painel */}
          <section aria-labelledby="history-heading">
            <SectionTitle id="history-heading">{h.history}</SectionTitle>
            <Reveal delay={0.07}>
              <div className="mt-6 flex max-w-[65ch] flex-col gap-5 text-lg leading-relaxed text-foreground/80">
                {history}
              </div>
            </Reveal>
          </section>

          {/* Como trabalho: grade 2x2 + lista de evolução */}
          <section aria-labelledby="work-heading">
            <SectionTitle id="work-heading">{h.workProfile}</SectionTitle>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {t.workProfile.strengths.map((item, i) => (
                <Reveal as="li" key={item.title} delay={0.05 + i * 0.06}>
                  <GlassCard spotlight className="h-full p-6">
                    <h3 className="text-lg leading-snug font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-foreground/75">{item.text}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-[var(--radius-panel)] bg-primary/[0.07] p-6 ring-1 ring-primary/20 ring-inset md:p-8">
                <h3 className="text-base font-semibold text-primary">{h.growth}</h3>
                <ul className="mt-4 grid gap-3">
                  {t.workProfile.growth.map((item) => (
                    <li key={item} className="text-base leading-relaxed text-foreground/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>

          {/* Competências: grupos de chips */}
          <section aria-labelledby="skills-heading">
            <SectionTitle id="skills-heading">{h.skills}</SectionTitle>
            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
              {t.skillGroups.map((group, i) => (
                <Reveal key={group.title} delay={0.04 + (i % 2) * 0.06}>
                  <h3 className="text-sm font-semibold text-muted-foreground">{group.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li key={skill.name}>
                        <Badge className="py-1.5 text-sm">
                          <skill.icon className="text-primary" aria-hidden="true" />
                          {skill.name}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Experiência: linha do tempo em vidro */}
          <section aria-labelledby="experience-heading">
            <SectionTitle id="experience-heading">{h.experience}</SectionTitle>
            <ol className="mt-8 grid gap-4">
              {t.experience.map((job) => (
                <Reveal as="li" key={job.company}>
                  <GlassCard className="p-6 md:p-8">
                    <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-6">
                      <h3 className="text-2xl font-semibold tracking-tight">{job.company}</h3>
                      <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{job.period}</span>
                    </div>
                    <p className="mt-1 text-base text-primary">{job.role}</p>
                    <ul className="mt-5 grid gap-3">
                      {job.bullets.map((b) => (
                        <li key={b} className="relative pl-5 text-base leading-relaxed text-foreground/80">
                          <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-primary/70" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* Formação + idiomas lado a lado */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal>
              <GlassCard as="section" aria-labelledby="education-heading" className="h-full">
                <h2 id="education-heading" className="text-sm font-semibold text-muted-foreground">
                  {h.education}
                </h2>
                <p className="mt-4 text-xl leading-snug font-semibold tracking-tight">{t.education.degree}</p>
                <p className="mt-2 text-base text-primary">{t.education.school}</p>
                <p className="mt-1 text-base text-foreground/75">{t.education.note}</p>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.07}>
              <GlassCard as="section" aria-labelledby="languages-heading" className="h-full">
                <h2 id="languages-heading" className="text-sm font-semibold text-muted-foreground">
                  {h.languages}
                </h2>
                <ul className="mt-4 grid gap-4">
                  {t.languages.map((lang) => (
                    <li key={lang.name}>
                      <p className="flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight">
                        {lang.name}
                        {lang.level && <Badge variant="signal">{lang.level}</Badge>}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-foreground/75">{lang.text}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>

          {/* Cursos: grade de blocos com o ano em destaque */}
          <section aria-labelledby="courses-heading">
            <SectionTitle id="courses-heading">
              {h.courses} <span className="text-muted-foreground tabular-nums">({t.courses.length})</span>
            </SectionTitle>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {t.courses.map((course, i) => (
                <Reveal as="li" key={course.name} delay={(i % 2) * 0.05}>
                  <div className="glass-inset flex h-full items-start justify-between gap-4 rounded-xl p-5">
                    <div>
                      <p className="text-base leading-snug font-medium text-foreground">{course.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{course.org}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-primary tabular-nums">{course.year}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* Como construí */}
          <section aria-labelledby="stack-heading">
            <SectionTitle id="stack-heading">{h.stack}</SectionTitle>
            <Reveal delay={0.07}>
              <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
                {t.stackDetails.map((item) => (
                  <div key={item.name}>
                    <dt className="text-lg font-semibold tracking-tight text-foreground">{item.name}</dt>
                    <dd className="mt-0.5 text-base text-muted-foreground">{item.desc}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}
