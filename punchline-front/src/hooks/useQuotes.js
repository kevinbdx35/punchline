import React from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const useQuotes = () => {
  const [quotes, setQuotes] = React.useState({ data: [], meta: {} });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchQuotes = React.useCallback(async (page = 1, filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, ...filters };
      const response = await api.get('/quotes', { params });
      setQuotes(response.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  }, []);

  const getRandomQuote = React.useCallback(async (lang) => {
    setLoading(true);
    setError(null);
    try {
      const params = lang ? { lang } : {};
      const response = await api.get('/quotes/random', { params });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to fetch random quote');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createQuote = React.useCallback(async (quoteData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/quotes', quoteData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to create quote');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStats = React.useCallback(async () => {
    try {
      const response = await api.get('/quotes/stats');
      return response.data;
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      return null;
    }
  }, []);

  return {
    quotes,
    loading,
    error,
    fetchQuotes,
    getRandomQuote,
    createQuote,
    getStats
  };
};