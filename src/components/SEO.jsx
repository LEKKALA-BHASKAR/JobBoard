import { Helmet } from 'react-helmet-async';

const SITE = 'Postline';
const DEFAULT_DESCRIPTION =
  'A curated job board for engineers, designers, product, sales, marketing, and data — real listings from real teams.';

export function SEO({ title, description, canonical, image }) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Find your next role`;
  const desc = description || DEFAULT_DESCRIPTION;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
