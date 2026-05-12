const mongoose = require('mongoose');
const Template = require('./models/Template');
require('dotenv').config();

const sampleTemplates = [
  {
    name: 'NexaLaunch — SaaS Landing Page',
    description: 'A bold landing page built for SaaS startups. Features hero section, pricing cards, feature grid and CTA buttons.',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    category: 'Landing Page',
  },
  {
    name: 'Orion Analytics Dashboard',
    description: 'A data-rich admin dashboard with real-time charts, KPI cards, user tables and dark mode support.',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    category: 'Dashboard',
  },
  {
    name: 'ShopFlow — E-Commerce Storefront',
    description: 'A clean e-commerce template with product listings, filtering sidebar, cart drawer and checkout page.',
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    category: 'E-Commerce',
  },
  {
    name: 'Folio — Creative Portfolio',
    description: 'A minimalist portfolio template for designers and developers with project gallery and contact form.',
    thumbnail_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80',
    category: 'Portfolio',
  },
  {
    name: 'InkDrop — Modern Blog',
    description: 'A publication-ready blog template with featured posts, category filtering and clean reading experience.',
    thumbnail_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80',
    category: 'Blog',
  },
  {
    name: 'CloudBase — SaaS App Template',
    description: 'A full SaaS application template with marketing site, onboarding flow, dashboard and billing page.',
    thumbnail_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
    category: 'SaaS',
  },
  {
    name: 'Apex — Agency Landing Page',
    description: 'A bold landing page for digital agencies with animated hero, service cards and case studies grid.',
    thumbnail_url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&q=80',
    category: 'Landing Page',
  },
  {
    name: 'Vanta — Admin CRM Dashboard',
    description: 'A comprehensive CRM dashboard with contacts table, task manager, pipeline view and notifications.',
    thumbnail_url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&q=80',
    category: 'Dashboard',
  },
];

const seedDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Template.deleteMany({});
    console.log('Cleared existing templates');

    const inserted = await Template.insertMany(sampleTemplates);
    console.log('Seeded ' + inserted.length + ' templates successfully!');

    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDatabase();
