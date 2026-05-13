import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import TemplateCard from '../components/TemplateCard';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  'All',
  'Landing Page',
  'Dashboard',
  'E-Commerce',
  'Portfolio',
  'Blog',
  'SaaS',
];

const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const Templates = () => {
  const { user }                        = useAuth();
  const [templates, setTemplates]       = useState([]);
  const [favoritedIds, setFavoritedIds] = useState(new Set());
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');
  const [category, setCategory]         = useState('All');
  const [search, setSearch]             = useState('');
  const debouncedSearch                 = useDebounce(search, 400);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (debouncedSearch)    params.search   = debouncedSearch;

      const { data } = await api.get('/templates', { params });
      setTemplates(data.data);
    } catch (err) {
      setError('Failed to load templates. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [category, debouncedSearch]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  useEffect(() => {
    if (!user) return;
    const fetchFavorites = async () => {
      try {
        const { data } = await api.get('/favorites');
        const ids = new Set(data.data.map((t) => t._id));
        setFavoritedIds(ids);
      } catch {
        // silently ignore
      }
    };
    fetchFavorites();
  }, [user]);

  return (
    <main className="page-container py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          Template Library
        </h1>
        <p className="text-slate-400">
          {templates.length} professional templates ready to use.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium
                          border transition-all duration-150
                ${category === cat
                  ? 'bg-brand-600 border-brand-500 text-white'
                  : 'bg-surface-card border-surface-border text-slate-400 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24">
          <p className="text-slate-400">Loading templates...</p>
        </div>
      )}

      {error && !loading && (
        <div className="card p-6 text-center border-red-500/20">
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={fetchTemplates} className="btn-secondary mt-3 text-xs">
            Try again
          </button>
        </div>
      )}

      {!loading && !error && templates.length === 0 && (
        <div className="text-center py-24">
          <p className="text-slate-400 text-sm">No templates found.</p>
          <p className="text-slate-600 text-xs mt-1">
            Try a different search or category.
          </p>
        </div>
      )}

      {!loading && !error && templates.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2
                        lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {templates.map((template) => (
            <TemplateCard
              key={template._id}
              template={template}
              isFavorited={favoritedIds.has(template._id)}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Templates;
