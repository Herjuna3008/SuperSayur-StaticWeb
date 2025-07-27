// next-seo.config.js
const siteUrl = 'https://www.supersayur.com';

export default {
  titleTemplate: '%s | SuperSayur',
  defaultTitle: 'SuperSayur - Supplier Sayur & Daging Segar',
  description: 'Supplier sayur, daging, dan seafood untuk restoran & hotel di Jadetabek.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    site_name: 'SuperSayur',
  },
};
