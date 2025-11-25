import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { logout as logoutService } from '../services/UserService';
import '../styles/header.css'; 

function Header() {
  const { user, isLoggedIn, logout, isAdmin, isAuthor } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutService();
      logout(); 
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>📝 Blog CMS</h1>
          </Link>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Yazılar
          </Link>

          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-link">
                Giriş Yap
              </Link>
              <Link to="/register" className="nav-link">
                Kayıt Ol
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/create-post" className="nav-link">
                ✍️ Yazı Yaz
              </Link>

              {(isAdmin() || isAuthor()) && (
                <Link to="/my-posts" className="nav-link">
                  🖊️ Yazılarım
                </Link>
              )}

              {isAdmin() && (
                <Link to="/admin" className="nav-link admin-link">
                  ⚙️ Admin Paneli
                </Link>
              )}

              <div className="user-menu">
                <span className="user-name">👤 {user?.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Çıkış Yap
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

