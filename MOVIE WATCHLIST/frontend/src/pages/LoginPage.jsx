import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import useAuthStore from '../store/useAuthStore';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(form);
      setAuth(response.data.token, null);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="card auth-card">
        <h1>Sign in</h1>
        <p>Access your Movie Watchlist.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} />
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
        <p className="text-muted">Don't have an account? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
