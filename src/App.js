import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Header  from './components/Header';
import './App.css';


function App() {
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Herkes Görebilir */}
        { <Route path="/" element={<HomePage />} /> }
        { <Route path="/post/:id" element={<PostDetailPage />} /> }

        {!isLoggedIn && (
          <>
            { <Route path="/login" element={<LoginPage />} /> }
            {/* <Route path="/register" element={<RegisterPage />} /> */}
          </>
        )}

        {isLoggedIn && (
          <>
            {/* <Route path="/create-post" element={<CreatePostPage />} /> */}
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          </>
        )}

        <Route path="*" element={<div>Sayfa Bulunamadı</div>} />
      </Routes>

    </BrowserRouter>
  );

}

export default App;