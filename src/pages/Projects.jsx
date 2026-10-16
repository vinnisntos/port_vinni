import { useLocation } from 'react-router-dom';
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { slugify } from '@/lib/utils';
import GlassCard from '../components/site/GlassCard';
import PageHeader from '../components/site/PageHeader';
import Reveal from '../components/site/Reveal';
import BrowserFrame from '../components/site/BrowserFrame';
import Seo from '../components/Seo';
import { projectsContent } from '../content/projects';
import { PERSON_ID, breadcrumbList } from '../utils/seo';
import { useLocale, getLocalizedPath } from '../hooks/useLocale';

const SITE_URL = 'https://vinnisantos.com.br';

function projectsSchema(t, path, locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: t.seo.title,
        description: t.seo.description,
        url: `${SITE_URL}${path}`,
        inLanguage: locale === 'en' ? 'en-US' : 'pt-BR',
        author: { '@id': PERSON_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: t.projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: project.name,
              description: project.kind,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              author: { '@id': PERSON_ID },
              ...(project.links.site ? { url: project.links.site } : {}),
              ...(project.links.repo ? { codeRepository: project.links.repo } : {}),
            },
          })),
        },
      },
      breadcrumbList([
        { name: 'Home', path: locale === 'en' ? '/en' : '/' },
        { name: `${t.pageHeader.title} ${t.pageHeader.accent}`, path },
      ]),
    ],
  };
}

function CaseStudy({ project, labels, shotAlt }) {
  return (
    <GlassCard
      as="article"
      id={slugify(project.name)}
      aria-labelledby={`${slugify(project.name)}-title`}
      className="scroll-mt-28 p-5 md:p-10"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Identidade do projeto: fica presa ao topo enquanto as decisões rolam */}
        <header className="lg:col-span-5">
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <h2
                id={`${slugify(project.name)}-title`}
                className="text-4xl leading-none font-bold tracking-[-0.035em] md:text-5xl"
              >
                {project.name}
              </h2>
              <Badge variant="signal">{project.status}</Badge>
            </div>
            <p className="text-lg leading-relaxed text-foreground/85">{project.kind}</p>
            <p className="text-sm text-muted-foreground">{project.role}</p>

            <ul className="flex flex-wrap gap-2" aria-label="Stack">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>

            {project.image && (
              <BrowserFrame src={project.image} alt={shotAlt(project.name)} url={project.links.site} className="mt-2" />
            )}

            {(project.links.site || project.links.repo) && (
              <div className="flex flex-wrap gap-3">
                {project.links.site && (
                  <Button asChild size="sm">
                    <a href={project.links.site} target="_blank" rel="noopener noreferrer">
                      {labels.site}
                      <ArrowUpRight weight="bold" aria-hidden="true" />
                    </a>
                  </Button>
                )}
                {project.links.repo && (
                  <Button asChild size="sm" variant="secondary">
                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                      <GithubLogo weight="bold" aria-hidden="true" />
                      {labels.repo}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="flex flex-col gap-10 lg:col-span-7">
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground">{labels.context}</h3>
            <p className="mt-3 text-xl leading-relaxed text-foreground md:text-2xl md:leading-snug">{project.context}</p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-muted-foreground">{labels.decisions}</h3>
            <ol className="mt-4 grid gap-3">
              {project.decisions.map((decision) => (
                <li key={decision.title} className="glass-inset rounded-xl p-5 md:p-6">
                  <h4 className="text-lg font-semibold tracking-tight text-foreground">{decision.title}</h4>
                  <p className="mt-2 text-base leading-relaxed text-foreground/75">{decision.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {project.debt && (
            <section className="rounded-xl bg-primary/[0.07] p-5 ring-1 ring-primary/20 ring-inset md:p-6">
              <h3 className="text-sm font-semibold text-primary">{labels.debt}</h3>
              <p className="mt-2 text-base leading-relaxed text-foreground/85">{project.debt}</p>
            </section>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

export default function Projects() {
  const locale = useLocale();
  const { pathname } = useLocation();
  const t = projectsContent[locale];
  const currentPath = locale === 'en' ? '/en/projects' : '/projects';
  const shotAlt = (name) => (locale === 'en' ? `Homepage of ${name}` : `Página inicial do ${name}`);

  return (
    <div className="pt-36 md:pt-44">
      <Seo
        title={t.seo.title}
        description={t.seo.description}
        path={currentPath}
        lang={locale === 'en' ? 'en-US' : 'pt-BR'}
        structuredData={projectsSchema(t, currentPath, locale)}
        alternates={[
          { hreflang: 'pt-BR', href: SITE_URL + getLocalizedPath(pathname, 'pt') },
          { hreflang: 'en-US', href: SITE_URL + getLocalizedPath(pathname, 'en') },
          { hreflang: 'x-default', href: SITE_URL + getLocalizedPath(pathname, 'pt') },
        ]}
      />
      <PageHeader title={t.pageHeader.title} accent={t.pageHeader.accent} description={t.pageHeader.description} />

      {/* Abertura + princípios */}
      <section aria-labelledby="principles-heading" className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-2xl leading-snug font-medium tracking-tight text-foreground md:text-3xl">{t.intro}</p>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal>
            <h2 id="principles-heading" className="text-sm font-semibold text-muted-foreground">
              {t.principlesTitle}
            </h2>
          </Reveal>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {t.principles.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.06 + i * 0.06}>
                <GlassCard spotlight className="h-full p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/75">{item.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Estudos de caso */}
      <div className="mt-24 flex flex-col gap-6 md:mt-32">
        {t.projects.map((project) => (
          <Reveal key={project.name} y={32}>
            <CaseStudy project={project} labels={t.labels} shotAlt={shotAlt} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
