import { useLocation } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
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

const linkClass =
  'px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs font-mono uppercase inline-flex items-center gap-2';

export default function Projects() {
  const locale = useLocale();
  const { pathname } = useLocation();
  const t = projectsContent[locale];
  const currentPath = locale === 'en' ? '/en/projects' : '/projects';

  return (
    <div className="pt-24 pb-12">
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
      <PageHeader
        tag={t.pageHeader.tag}
        title={t.pageHeader.title}
        accent={t.pageHeader.accent}
        description={t.pageHeader.description}
      />

      <p className="max-w-3xl text-muted leading-relaxed mb-8">{t.intro}</p>

      {/* Princípios */}
      <section aria-labelledby="principles-heading" className="mb-12">
        <h2
          id="principles-heading"
          className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-4"
        >
          {t.principlesTitle}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 list-none">
          {t.principles.map((item) => (
            <Card as="li" key={item.title}>
              <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.text}</p>
            </Card>
          ))}
        </ul>
      </section>

      {/* Estudos de caso */}
      <div className="space-y-8">
        {t.projects.map((project) => (
          <Card as="article" key={project.name}>
            <header className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                <span className="text-xs text-purple-400 font-mono uppercase whitespace-nowrap">
                  {project.status}
                </span>
              </div>
              <p className="text-muted">{project.kind}</p>
              <p className="text-xs text-gray-500 font-mono mt-1">{project.role}</p>
            </header>

            <ul className="flex flex-wrap gap-2 list-none mb-6">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="px-2 py-1 bg-purple-500/5 border border-purple-500/20 text-purple-400 text-[10px] font-mono uppercase tracking-wider"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <h3 className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-2">
              {t.labels.context}
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6">{project.context}</p>

            <h3 className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-3">
              {t.labels.decisions}
            </h3>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none mb-6">
              {project.decisions.map((decision) => (
                <li
                  key={decision.title}
                  className="border-l-2 border-purple-500/30 pl-4"
                >
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {decision.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">{decision.text}</p>
                </li>
              ))}
            </ol>

            {project.debt && (
              <>
                <h3 className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                  {t.labels.debt}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">{project.debt}</p>
              </>
            )}

            {(project.links.site || project.links.repo) && (
              <div className="flex flex-wrap gap-3">
                {project.links.site && (
                  <a
                    href={project.links.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <FaExternalLinkAlt aria-hidden="true" /> {t.labels.site}
                  </a>
                )}
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <FaGithub aria-hidden="true" /> {t.labels.repo}
                  </a>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
