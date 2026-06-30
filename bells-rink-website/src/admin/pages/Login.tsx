import React, { useState } from 'react';
import { useAdminAuth } from '../AdminAuthContext';

const Login: React.FC = () => {
  const { signIn } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await signIn(email.trim(), password);
    if (error) {
      setError('That email or password didn\'t work. Please try again.');
      setBusy(false);
    }
    // on success, auth state change re-renders into the dashboard
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <div className="admin-login-logo">🛼</div>
        <h1>Bell's Owner Dashboard</h1>
        <p className="sub">Sign in to manage your rink</p>

        {error && <div className="admin-login-error">{error}</div>}

        <div className="a-field">
          <label htmlFor="al-email">Email</label>
          <input
            id="al-email"
            className="a-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@bellsrink.com"
            autoComplete="username"
            required
          />
        </div>
        <div className="a-field">
          <label htmlFor="al-pw">Password</label>
          <input
            id="al-pw"
            className="a-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <button className="a-btn a-btn-primary a-btn-lg" type="submit" disabled={busy} style={{ width: '100%' }}>
          {busy ? 'Signing in…' : 'Sign In'}
        </button>

        <div className="admin-login-demo">
          Prototype demo login:<br />
          <code>admin@bellsrink.com</code> · <code>BellsRink2026!</code>
        </div>
      </form>
    </div>
  );
};

export default Login;
