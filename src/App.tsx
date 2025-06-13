import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ArticleListPage from './pages/ArticleListPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Header />
      <main className="p-4">
      <Routes>
        <Route path="/" element={<ArticleListPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
