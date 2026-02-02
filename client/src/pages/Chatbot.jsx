import { useState } from 'react';
import api from '../config/api.js';
import { useAuth } from '../context/AuthContext';

export default function Chatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, isRegistered } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setSources([]);

    try {
      const response = await api.post('/api/chatbot/ask', { question });
      setAnswer(response.data.answer);
      setSources(response.data.sources || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Chatbot</h1>
        <p className="mt-2 text-gray-600">
          Ask questions about the knowledge base. The AI will search relevant articles to provide answers.
        </p>
        {!isRegistered && (
          <p className="mt-2 text-sm text-yellow-600">
            Note: You're viewing as a public user. Answers are based on public articles only.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Asking...' : 'Ask'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {answer && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Answer</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">{answer}</p>
          </div>
        </div>
      )}

      {sources.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sources</h2>
          <ul className="space-y-2">
            {sources.map((source, index) => (
              <li key={source.id} className="flex items-start">
                <span className="font-medium mr-2">[{index + 1}]</span>
                <div>
                  <span className="text-gray-900">{source.title}</span>
                  {source.similarity && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({(source.similarity * 100).toFixed(1)}% match)
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
