import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Article } from '../api/articles';
import { fetchArticles } from '../api/articles';
import ArticleCard from '../components/ArticleCard';
import ArticleForm from '../components/ArticleForm';

const PAGE_SIZE = 10;

const ArticleListPage: React.FC = () => {
  const [page, setPage] = useState(0);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articles', page],
    queryFn: () => fetchArticles(page * PAGE_SIZE, PAGE_SIZE),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <div className="text-center mt-5">Loading articles...</div>;
  if (error) return <div className="text-center text-danger mt-5">Error loading articles</div>;

  return (
    <div className="container">
      <h1 className="mb-4">Articles</h1>

     <div className="card mb-5 p-3 shadow-sm" style={{ maxWidth: '60%' }}>
        <h3 className="mb-2 text-lg font-medium">Create New Article</h3>
        <ArticleForm />
      </div>

      <div className="row">
        {data?.data.map((article: Article) => (
          <div className="col-md-6 mb-4" key={article.id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
          className="btn btn-secondary"
        >
          Previous
        </button>

        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={!!data && data.filteredCount <= (page + 1) * PAGE_SIZE}
          className="btn btn-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticleListPage;
