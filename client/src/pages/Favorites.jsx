import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import TemplateCard from '../components/TemplateCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  const fetchFavorites = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/favorites');
      setFavorites(data.data);
    } catch (err) {
      setError('Could not load your favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFavorites(); }, []);

  const handleUnfavorite = (removedId) => {
    setFavorites((prev) => prev.filter((t) => t._id !== removedId));
  };

  return (
    <main className="page-container py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          My Favorites
        </h1>
        <p className="text-slate-400">
          {favorites.length > 0
            ? `You have saved ${favorites.length} template${
                favorites.length !== 1 ? 's' : ''
              }.`
            : 'Your saved templates will appear here.'}
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24">
          <p className="text-slate-400">Loading favorites...</p>
        </div>
      )}

      {error && !loading && (
        <div className="card p-6 text-center border-red-500/20">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={fetchFavorites}
            className="btn-secondary mt-3 text-xs"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center
                        py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-card
                          border border-surface-border
                          flex items-center justify-center mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24"
                 fill="none" stroke="#475569" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12
                       5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78
                       7.78l1.06 1.06L12 21.23l7.78-7.78
                       1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2 className="text-white font-semibold text-lg mb-2">
            No favorites yet
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Browse templates and click the heart icon to save your
            favorites.
          </p>
          <Link to="/templates" className="btn-primary">
            Browse Templates
          </Link>
        </div>
      )}

      {!loading && !error && favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2
                        lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map((template) => (
            <TemplateCard
              key={template._id}
              template={template}
              isFavorited={true}
              onUnfavorite={handleUnfavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Favorites;
