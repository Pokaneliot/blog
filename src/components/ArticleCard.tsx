import React from 'react';
import type { Article } from '../api/articles';
import LikeButton from './LikeButton.tsx';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="border rounded p-4 mb-4 shadow">
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <p className="mb-2">{article.content.slice(0, 150)}...</p>
      <p className="text-sm text-gray-600 mb-2">
        Categories: {article.categories.map((c) => c.title).join(', ')}
      </p>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-gray-700">
          👍 {article.articleLikesCount ?? 0} {article.articleLikesCount === 1 ? 'Like' : 'Likes'}
        </span>
        <span className="text-gray-700">
          💬 {article.comments.length} {article.comments.length === 1 ? 'Comment' : 'Comments'}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Link to={`/articles/${article.id}`} className="text-blue-600 hover:underline">
          Read more
        </Link>
        <LikeButton articleId={article.id} />
      </div>
    </div>
  );
};

export default ArticleCard;
