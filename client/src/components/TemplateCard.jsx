
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const CATEGORY_COLORS = {
  'Landing Page': 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  'Dashboard':    'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'E-Commerce':   'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  'Portfolio':    'bg-amber-500/10 text-amber-300 border-amber-500/20',
  'Blog':         'bg-rose-500/10 text-rose-300 border-rose-500/20',
  'SaaS':         'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const HeartIcon = ({ filled }) => (
  <svg
    width="18" height="18"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5
             5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
             1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const TemplateCard = ({
  template,
  isFavorited: initialFav = false,
  onUnfavorite,
}) => {
  const { user }                  = useAuth();
  const navigate                  = useNavigate();
  const [favorited, setFavorited] = useState(initialFav);
  const [loading, setLoading]     = useState(false);
  const [imgError, setImgError]   = useState(false);

  const categoryClass =
    CATEGORY_COLORS[template.category] ||
    'bg-slate-500/10 text-slate-300 border-slate-500/20';

  const handleFavorite = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error('Please log in to save favorites.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(`/favorites/${template._id}`);
      setFavorited(data.favorited);
      toast.success(data.message);

      if (!data.favorited && onUnfavorite) {
        onUnfavorite(template._id);
      }
    } catch (err) {
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="card group hover:border-surface-muted
                         hover:-translate-y-1 hover:shadow-xl
                         hover:shadow-black/30">
      <div className="relative h-44 bg-surface-muted overflow-hidden">
        {!imgError ? (
          <img
            src={template.thumbnail_url}
            alt={template.name}
            className="w-full h-full object-cover
                       group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center
                          justify-center text-slate-600">
            <svg width="40" height="40" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        <button
          onClick={handleFavorite}
          disabled={loading}
          aria-label={
            favorited ? 'Remove from favorites' : 'Add to favorites'
          }
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl
                      flex items-center justify-center
                      transition-all duration-200 backdrop-blur-sm border
                      ${favorited
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                        : 'bg-black/40 border-white/10 text-white/50 hover:text-white'
                      }
                      ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <HeartIcon filled={favorited} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-white text-sm
                         leading-snug line-clamp-1">
            {template.name}
          </h3>
          <span className={`badge border shrink-0 ${categoryClass}`}>
            {template.category}
          </span>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
          {template.description}
        </p>
      </div>
    </article>
  );
};

export default TemplateCard;
