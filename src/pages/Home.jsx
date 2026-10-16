import { Link, useLocation } from 'react-router-dom';
import { m, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, DownloadSimple } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn, slugify } from '@/lib/utils';
import GlassCard from '../components/site/GlassCard';
import Reveal from '../components/site/Reveal';
import ScrambleText from '../components/site/ScrambleText';
import BrowserFrame from '../components/site/BrowserFrame';
import StackMarquee from '../components/site/StackMarquee';
import LiveGenerator from '../components/site/LiveGenerator';
import Seo from '../components/Seo';
import { itemListSchema, personNode, PERSON_ID } from '../utils/seo';
import { projectsContent } from '../content/projects';
import { toolsPt, toolsEn } from '../content/tools';
import { homeContent } from '../content/home';
import { useLocale, getLocalizedPath } from '../hooks/useLocale';

const SITE_URL = 'https://vinnisantos.com.br';
const EASE = [0.16, 1, 0.3, 1];

// Projetos do bento: os que têm sistema público para mostrar em imagem.
const FEATURED = ['PendurAi', 'Life OS', 'Agenda Osvair'];
// O card grande do bento é mais alto que 16:10; usa uma captura mais alta do mesmo sistema.
const TALL_SHOTS = { PendurAi: { src: '/shots/pendurai-tall.webp', width: 1280, height: 1120 } };

function homeSchema(locale, path, tools) {
  const toolList = itemListSchema({
    name: locale === 'en' ? 'Developer tools' : 'Ferramentas para desenvolvedores',
    items: tools.map((tool) => ({ name: tool.title, path: tool.path })),
  });
  delete toolList['@context'];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Vinnicius Santos',
        inLanguage: ['pt-BR', 'en-US'],
        author: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        url: `${SITE_URL}${path}`,
        mainEntity: { '@id': PERSON_ID },
      },
      personNode(locale),
      toolList,
    ],
  };
}

function Hero({ t, projectsHref, hero }) {
  const reduce = useReducedMotion();
  const enter = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section className="grid min-h-[100dvh] grid-cols-1 items-center gap-12 pt-28 pb-12 lg:grid-cols-12 lg:gap-10 lg:pt-24">
      <div className="lg:col-span-6">
        <h1 className="text-[clamp(3.4rem,7.2vw,6.6rem)] leading-[0.9] font-bold tracking-[-0.05em] text-foreground">
          <ScrambleText text="Vinnicius" className="block" />
          <span className="flex items-end gap-[0.06em]">
            <ScrambleText text="Santos" startDelay={350} />
            <span aria-hidden="true" className="caret mb-[0.12em] inline-block h-[0.72em] w-[0.09em] bg-primary" />
          </span>
        </h1>

        <m.p {...enter(0.35)} className="mt-8 max-w-[34rem] text-lg leading-relaxed text-foreground/80 md:text-xl">
          {t.heroLead}
        </m.p>

        <m.div {...enter(0.45)} className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to={projectsHref}>
              {t.ctaProjects}
              <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={`${import.meta.env.BASE_URL}${t.resumeFile}`} download={t.resumeDownloadName}>
              <DownloadSimple weight="bold" aria-hidden="true" />
              {t.ctaResume}
            </a>
          </Button>
        </m.div>
      </div>

      <m.figure
        className="lg:col-span-6"
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
      >
        <BrowserFrame src={hero.image} alt={t.heroShotAlt} url={hero.links.site} priority tilt />
        <figcaption className="mt-4 px-2 text-sm text-muted-foreground">{t.heroShotCaption}</figcaption>
      </m.figure>
    </section>
  );
}

function ProjectTile({ project, href, t, large = false }) {
  const shot = (large && TALL_SHOTS[project.name]) || { src: project.image, width: 1440, height: 900 };

  return (
    <Link
      to={href}
      className="group block h-full rounded-[var(--radius-panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <GlassCard spotlight className="flex h-full flex-col gap-6 p-3 md:p-3">
        {/* No card grande, a captura cresce para ocupar a altura das duas linhas do bento */}
        <div
          className={cn(
            'overflow-hidden rounded-[calc(var(--radius-panel)-8px)]',
            large && 'lg:relative lg:min-h-[18rem] lg:flex-1'
          )}
        >
          <img
            src={shot.src}
            alt={t.projectsShotAlt(project.name)}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            decoding="async"
            className={cn(
              'aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]',
              large && 'lg:absolute lg:inset-0 lg:aspect-auto lg:h-full'
            )}
          />
        </div>
        <div className={cn('flex flex-col gap-3 px-3 pb-4 md:px-4', !large && 'flex-1')}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className={large ? 'text-3xl font-semibold tracking-tight' : 'text-2xl font-semibold tracking-tight'}>
              {project.name}
            </h3>
            <Badge variant="signal">{project.status}</Badge>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">{project.kind}</p>
          {large && (
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {project.decisions.slice(0, 4).map((decision) => (
                <li key={decision.title} className="glass-inset rounded-xl px-4 py-3 text-sm leading-snug text-foreground/90">
                  {decision.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </GlassCard>
    </Link>
  );
}

export default function Home() {
  const locale = useLocale();
  const { pathname } = useLocation();
  const t = homeContent[locale];
  const tools = locale === 'en' ? toolsEn : toolsPt;
  const projectsHref = locale === 'en' ? '/en/projects' : '/projects';
  const allProjects = projectsContent[locale].projects;
  const [lead, ...rest] = FEATURED.map((name) => allProjects.find((p) => p.name === name));
  const currentPath = locale === 'en' ? '/en' : '/';

  return (
    <div>
      <Seo
        title={t.seo.title}
        description={t.seo.description}
        path={currentPath}
        lang={locale === 'en' ? 'en-US' : 'pt-BR'}
        structuredData={homeSchema(locale, currentPath, tools)}
        alternates={[
          { hreflang: 'pt-BR', href: SITE_URL + getLocalizedPath(pathname, 'pt') },
          { hreflang: 'en-US', href: SITE_URL + getLocalizedPath(pathname, 'en') },
          { hreflang: 'x-default', href: SITE_URL + getLocalizedPath(pathname, 'pt') },
        ]}
      />

      <Hero t={t} projectsHref={projectsHref} hero={lead} />

      {/* Stack: o único marquee da página */}
      <div className="-mx-4 md:-mx-8">
        <StackMarquee label={t.stackLabel} />
      </div>

      {/* Projetos: bento com capturas reais */}
      <section aria-labelledby="projects-heading" className="mt-32 md:mt-44">
        <Reveal>
          <h2 id="projects-heading" className="max-w-3xl text-4xl leading-[1.02] font-bold tracking-[-0.035em] md:text-6xl">
            {t.projectsTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.07}>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.projectsLead}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <Reveal delay={0.1} className="lg:col-span-7 lg:row-span-2">
            <ProjectTile project={lead} href={`${projectsHref}#${slugify(lead.name)}`} t={t} large />
          </Reveal>
          {rest.map((project, i) => (
            <Reveal key={project.name} delay={0.16 + i * 0.07} className="lg:col-span-5">
              <ProjectTile project={project} href={`${projectsHref}#${slugify(project.name)}`} t={t} />
            </Reveal>
          ))}
          <Reveal delay={0.2} className="lg:col-span-12">
            <Link
              to={projectsHref}
              className="group flex flex-col gap-4 rounded-[var(--radius-panel)] bg-primary p-7 text-primary-foreground transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#5cf0bb] active:scale-[0.99] md:flex-row md:items-center md:justify-between md:p-10"
            >
              <span>
                <span className="block text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                  {t.projectsAll(allProjects.length)}
                </span>
                <span className="mt-2 block text-base text-primary-foreground/75">{t.projectsAllHint}</span>
              </span>
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-500 group-hover:translate-x-1">
                <ArrowRight className="size-6" weight="bold" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Ferramentas: lista + elemento vivo */}
      <section aria-labelledby="tools-heading" className="mt-32 grid grid-cols-1 gap-12 md:mt-44 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 id="tools-heading" className="text-4xl leading-[1.02] font-bold tracking-[-0.035em] md:text-5xl">
              {t.toolsTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.07}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">{t.toolsLead}</p>
          </Reveal>
          <ul className="mt-10 grid gap-1">
            {tools.map((tool, i) => (
              <Reveal as="li" key={tool.path} delay={0.08 + i * 0.05}>
                <Link
                  to={tool.path}
                  aria-label={t.toolAriaLabel(tool.title)}
                  className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-300 hover:bg-white/5"
                >
                  <span className="glass-inset flex size-11 shrink-0 items-center justify-center rounded-full text-primary">
                    <tool.icon className="size-5" weight="duotone" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-foreground">{tool.title}</span>
                    <span className="block text-sm text-muted-foreground md:truncate">{tool.description}</span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    weight="bold"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.12} className="lg:col-span-7 lg:pt-28">
          <LiveGenerator t={t.live} />
        </Reveal>
      </section>
    </div>
  );
}
