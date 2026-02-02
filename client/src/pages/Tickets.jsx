import { useState, useEffect } from 'react';
import api from '../config/api.js';
import { useAuth } from '../context/AuthContext';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ question: '' });
  const { isRegistered } = useAuth();

  useEffect(() => {
    if (isRegistered) {
      fetchTickets();
    }
  }, [isRegistered]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/tickets');
      setTickets(response.data.tickets);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/tickets', formData);
      setFormData({ question: '' });
      setShowForm(false);
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create ticket');
    }
  };

  const handleResolve = async (ticketId, answer) => {
    try {
      await api.put(`/api/tickets/${ticketId}`, {
        answer,
        status: 'resolved'
      });
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resolve ticket');
    }
  };

  if (!isRegistered) {
    return (
      <div className="px-4 py-6 text-center">
        <p className="text-gray-600">Please log in to access tickets.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading tickets...</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
          <p className="mt-2 text-gray-600">Manage support tickets</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          {showForm ? 'Cancel' : 'New Ticket'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Create Ticket
          </button>
        </form>
      )}

      {tickets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No tickets found.
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ticket #{ticket.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Created by {ticket.created_by_email} on{' '}
                    {new Date(ticket.created_at).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">
                  <strong>Question:</strong> {ticket.question}
                </p>
                {ticket.answer && (
                  <p className="mt-2 text-gray-700">
                    <strong>Answer:</strong> {ticket.answer}
                  </p>
                )}
              </div>
              {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                <TicketAnswerForm
                  ticketId={ticket.id}
                  onResolve={handleResolve}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TicketAnswerForm({ ticketId, onResolve }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onResolve(ticketId, answer);
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter answer..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
        rows="3"
        required
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
      >
        Resolve Ticket
      </button>
    </form>
  );
}
