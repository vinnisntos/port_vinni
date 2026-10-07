const SITE_URL = 'https://vinnisantos.com.br';

// Identificador único da pessoa no grafo schema.org: todas as páginas apontam
// para o mesmo @id, para os buscadores tratarem como uma única entidade.
export const PERSON_ID = `${SITE_URL}/#person`;

export function personNode(locale = 'pt') {
  const en = locale === 'en';
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Vinnicius Santos',
    alternateName: [
      'Vinnicius Gabriel Matos dos Santos',
      'Vinnicius Dos Santos',
      'Vinni Santos',
      'vinnisantos',
    ],
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    jobTitle: en ? 'Full Stack Developer' : 'Desenvolvedor Full Stack',
    description: en
      ? 'Full stack developer focused on solution architecture for multi-tenant SaaS with C#/.NET, Next.js, and PostgreSQL. Co-founder of PendurAi.'
      : 'Desenvolvedor full stack com foco em arquitetura de soluções para SaaS multi-tenant com C#/.NET, Next.js e PostgreSQL. Cofundador do PendurAi.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sorocaba',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    worksFor: { '@type': 'Organization', name: 'Going2' },
    founder: {
      '@type': 'Organization',
      name: 'PendurAi',
      url: 'https://pendurai.vinnisantos.com.br',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidade Paulista (UNIP)',
    },
    knowsAbout: [
      en ? 'Solution architecture' : 'Arquitetura de soluções',
      en ? 'Software architecture' : 'Arquitetura de software',
      en ? 'Multi-tenant SaaS' : 'SaaS multi-tenant',
      'C#',
      '.NET',
      'ASP.NET Core',
      'Next.js',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Docker',
      'AWS',
    ],
    sameAs: [
      'https://github.com/vinnisntos',
      'https://www.linkedin.com/in/vinnisantos',
    ],
  };
}

export function breadcrumbList(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function toolSchema({ name, description, path, breadcrumbItems }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name,
        description,
        url: `${SITE_URL}${path}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      },
      breadcrumbList(breadcrumbItems),
    ],
  };
}

export function itemListSchema({ name, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}${item.path}`,
      name: item.name,
    })),
  };
}
