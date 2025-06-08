import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import ArticleListPage from './pages/ArticleListPage';
// import ArticleDetailPage from './pages/ArticleDetailPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<ArticleListPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
