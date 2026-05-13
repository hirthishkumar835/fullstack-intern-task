import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [form, setForm]       = useState({ name: '', email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())
      newErrors.name = 'Name is required.';
    if (!form.email.trim())
      newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Enter a valid email.';
    if (!form.password)
      newErrors.password = 'Password is required.';
    else if (form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! Welcome aboard!');
      navigate('/templates');
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Registration failed. Try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center
                    justify-center py-16 px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            Create your account
          </h1>
          <p className="text-slate-400 text-sm">
            Join thousands of developers and designers.
          </p>
        </div>

        <div className="card p-6 shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            <div>
              <label htmlFor="name" className="label">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Johnson"
                value={form.name}
                onChange={handleChange}
                className={`input-field ${
                  errors.name ? 'border-red-500/60' : ''
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@example.com"
                value={form.email}
                onChange={handleChange}
                className={`input-field ${
                  errors.email ? 'border-red-500/60' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                className={`input-field ${
                  errors.password ? 'border-red-500/60' : ''
                }`}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link to="/login"
                className="text-brand-400 hover:text-brand-300
                           font-medium transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
