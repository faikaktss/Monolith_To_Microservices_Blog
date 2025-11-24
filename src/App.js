import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import './App.css';

// Pages (sayfaları daha sonra oluşturacağız)
// import HomePage from './pages/HomePage';
// import PostDetailPage from './pages/PostDetailPage';
// import LoginPage from './pages/LoginPage';
// import AdminDashboard from './pages/AdminDashboard';

// Components
// import Header from './components/Header';
// import Footer from './components/Footer';

function App() {
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <BrowserRouter>
      {/* <Header /> */}
      
      <Routes>
        {/* Herkes Görebilir */}
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/post/:id" element={<PostDetailPage />} /> */}

        {/* Giriş Yapmayanlar İçin */}
        {!isLoggedIn && (
          <>
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/register" element={<RegisterPage />} /> */}
          </>
        )}

        {/* Giriş Yapanlar İçin */}
        {isLoggedIn && (
          <>
            {/* <Route path="/create-post" element={<CreatePostPage />} /> */}
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          </>
        )}

        {/* 404 Sayfası */}
        <Route path="*" element={<div>Sayfa Bulunamadı</div>} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
  
}

export default App;