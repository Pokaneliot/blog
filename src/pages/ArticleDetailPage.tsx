import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchArticle } from '../api/articles';
import LikeButton from '../components/LikeButton';
import CommentForm from '../components/CommentForm';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const articleId = Number(id);

  const { data: article, isLoading, error } = useQuery({
  queryKey: ['article', articleId],
  queryFn: () => fetchArticle(articleId),
});

  if (isLoading) return <div>Loading article...</div>;
  if (error || !article) return <div>Article not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="mb-4">{article.content}</p>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-gray-700">
          👍 {article.articleLikesCount ?? 0} {article.articleLikesCount === 1 ? 'Like' : 'Likes'}
        </span>
        <span className="text-gray-700">
          💬 {article.comments.length} {article.comments.length === 1 ? 'Comment' : 'Comments'}
        </span>
      </div>
      <LikeButton articleId={article.id} />
      <h2 className="text-xl font-semibold mt-6 mb-2">Comments</h2>
      {article.comments.length === 0 && <p>No comments yet</p>}
      <ul className="mb-4">
        {article.comments.map((comment) => (
          <li key={comment.id} className="border-b py-2">
            <p>{comment.content}</p>
            <small className="text-gray-500">
              By {comment.user.email} at {new Date(comment.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>

      <CommentForm articleId={article.id} />
    </div>
  );
};

export default ArticleDetailPage;
