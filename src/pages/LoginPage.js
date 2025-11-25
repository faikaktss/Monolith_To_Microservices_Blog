import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../services/UserService';
import '../styles/login.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Lütfen email ve şifre girin!');
      return;
    }

    if (!email.includes('@')) {
      setError('Geçerli bir email girin!');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await loginService({
        email: email,
        password: password
      });

      login(response.user, response.token);

      navigate('/');
    } catch (err) {
      setError(err.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="login-container">
        <div className="login-header">
          <h1> Blog CMS'ye Hoş Geldiniz</h1>
          <p>Giriş yaparak yazılarınızı yönetin</p>
        </div>

        {error && (
          <div className="error-message">
             {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email"> Email Adresi</label>
            <input
              type="email"
              id="email"
              placeholder="ornek@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"> Şifre</label>
            <input
              type="password"
              id="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? ' Giriş yapılıyor' : ' Giriş Yap'}
          </button>
        </form>

        <div className="login-footer">
          <p>Henüz hesabınız yok mu?</p>
          <Link to="/register" className="register-link">
            Kayıt olmak için tıklayın
          </Link>
        </div>

        <div className="test-info">
          <p>💡 Test Hesabı:</p>
          <p>📧 Email: admin@example.com</p>
          <p>🔒 Şifre: password123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;