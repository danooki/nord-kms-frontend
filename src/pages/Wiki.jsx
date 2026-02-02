import { useState, useEffect } from 'react';
import api from '../config/api.js';
import { useAuth } from '../context/AuthContext';

export default function Wiki() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, isRegistered } = useAuth();

  useEffect(() => {
    fetchArticles();
  }, [isAuthenticated]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/wiki');
      setArticles(response.data.articles);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
        <p className="mt-2 text-gray-600">
          {isRegistered
            ? 'Browse all knowledge base articles'
            : 'Browse public knowledge base articles'}
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No articles found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {article.title}
                </h2>
                {!article.is_public && (
                  <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                    Private
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.content}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                {article.category_name && (
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {article.category_name}
                  </span>
                )}
                <span>
                  {new Date(article.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
