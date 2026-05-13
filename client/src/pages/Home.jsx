import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  {
    icon: '🎨',
    title: 'Curated Templates',
    desc: 'Hand-picked, production-ready templates for every use case.',
  },
  {
    icon: '❤️',
    title: 'Save Favorites',
    desc: 'Bookmark templates you love and revisit them anytime.',
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    desc: 'Filter by category or search by name to find exactly what you need.',
  },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2
                          w-[700px] h-[400px] bg-brand-600/10
                          rounded-full blur-3xl" />
        </div>

        <div className="page-container relative py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5
                          rounded-full bg-brand-600/10 border border-brand-500/20
                          text-brand-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400
                             animate-pulse" />
            New templates added weekly
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white
                          leading-tight mb-5">
            The template store for{' '}
            <span className="text-transparent bg-clip-text
                             bg-gradient-to-r from-brand-400 to-violet-400">
              modern builders
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Browse professionally designed web templates, save your
            favorites, and ship faster than ever before.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/templates" className="btn-primary px-6 py-3 text-base">
              Browse Templates
            </Link>
            {!user && (
              <Link to="/register"
                    className="btn-secondary px-6 py-3 text-base">
                Sign up free
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="page-container py-20">
        <div className="grid sm:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-6
                                          hover:border-surface-muted
                                          transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-brand-600/10
                              border border-brand-500/20
                              flex items-center justify-center
                              text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {!user && (
        <section className="page-container pb-20">
          <div className="card p-8 text-center border-brand-500/20
                          bg-gradient-to-br from-brand-600/10 to-violet-600/5">
            <h2 className="text-2xl font-bold text-white mb-2">
              Ready to get started?
            </h2>
            <p className="text-slate-400 text-sm mb-5">
              Create a free account to save your favorite templates.
            </p>
            <Link to="/register" className="btn-primary px-7 py-3">
              Create Free Account
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
