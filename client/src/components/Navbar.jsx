import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border
                        bg-surface/80 backdrop-blur-md">
      <nav className="page-container flex h-16 items-center justify-between">

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center
                          justify-center group-hover:bg-brand-500 transition-colors">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white"
                    opacity="0.6" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white"
                    opacity="0.6" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" />
            </svg>
          </div>
          <span className="font-semibold text-white tracking-tight">
            TemplateHub
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/templates" className={navLinkClass}>
            Browse
          </NavLink>
          {user && (
            <NavLink to="/favorites" className={navLinkClass}>
              My Favorites
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-slate-400">
                Hi,{' '}
                <span className="text-white font-medium">
                  {user.name.split(' ')[0]}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm py-2 px-4"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn-ghost">Log in</Link>
              <Link to="/register" className="btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
