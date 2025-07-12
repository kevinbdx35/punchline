import React from 'react';

// Demo hook for GitHub Pages (uses mock data when API is not available)
export const useQuotesDemo = () => {
  const [quotes, setQuotes] = React.useState({ data: [], meta: {} });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Mock quotes data for demo
  const mockQuotes = [
    {
      id: 1,
      lang: 'en',
      quote: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      created_at: '2023-04-26T10:00:00.000Z'
    },
    {
      id: 2,
      lang: 'en',
      quote: 'Innovation distinguishes between a leader and a follower.',
      author: 'Steve Jobs',
      created_at: '2023-04-26T10:01:00.000Z'
    },
    {
      id: 3,
      lang: 'en',
      quote: 'Life is what happens to you while you\'re busy making other plans.',
      author: 'John Lennon',
      created_at: '2023-04-26T10:02:00.000Z'
    },
    {
      id: 4,
      lang: 'fr',
      quote: 'La vie est un mystère qu\'il faut vivre, et non un problème à résoudre.',
      author: 'Gandhi',
      created_at: '2023-04-26T10:03:00.000Z'
    },
    {
      id: 5,
      lang: 'en',
      quote: 'The future belongs to those who believe in the beauty of their dreams.',
      author: 'Eleanor Roosevelt',
      created_at: '2023-04-26T10:04:00.000Z'
    },
    {
      id: 6,
      lang: 'en',
      quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
      author: 'Winston Churchill',
      created_at: '2023-04-26T10:05:00.000Z'
    }
  ];

  const fetchQuotes = React.useCallback(async (page = 1, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock data
      let filteredQuotes = mockQuotes;
      
      if (filters.search) {
        filteredQuotes = mockQuotes.filter(quote => 
          quote.quote.toLowerCase().includes(filters.search.toLowerCase()) ||
          quote.author.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.lang) {
        filteredQuotes = filteredQuotes.filter(quote => quote.lang === filters.lang);
      }
      
      if (filters.author) {
        filteredQuotes = filteredQuotes.filter(quote => 
          quote.author.toLowerCase().includes(filters.author.toLowerCase())
        );
      }
      
      // Pagination
      const pageSize = 3;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedQuotes = filteredQuotes.slice(startIndex, endIndex);
      
      setQuotes({
        data: paginatedQuotes,
        meta: {
          page,
          totalPages: Math.ceil(filteredQuotes.length / pageSize),
          total: filteredQuotes.length,
          hasNextPage: endIndex < filteredQuotes.length,
          hasPrevPage: page > 1
        }
      });
    } catch (err) {
      setError('Failed to fetch quotes (demo mode)');
    } finally {
      setLoading(false);
    }
  }, []);

  const getRandomQuote = React.useCallback(async (lang) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let availableQuotes = mockQuotes;
      if (lang) {
        availableQuotes = mockQuotes.filter(quote => quote.lang === lang);
      }
      
      const randomIndex = Math.floor(Math.random() * availableQuotes.length);
      return availableQuotes[randomIndex];
    } catch (err) {
      setError('Failed to fetch random quote (demo mode)');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createQuote = React.useCallback(async (quoteData) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate successful creation
      const newQuote = {
        id: Date.now(),
        ...quoteData,
        created_at: new Date().toISOString()
      };
      
      return {
        id: newQuote.id,
        message: 'Quote created successfully (demo mode)',
        quote: newQuote
      };
    } catch (err) {
      setError('Failed to create quote (demo mode)');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStats = React.useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        totalQuotes: mockQuotes.length,
        totalAuthors: new Set(mockQuotes.map(q => q.author)).size,
        languageDistribution: [
          { lang: 'en', count: mockQuotes.filter(q => q.lang === 'en').length },
          { lang: 'fr', count: mockQuotes.filter(q => q.lang === 'fr').length }
        ],
        topAuthors: [
          { author: 'Steve Jobs', count: 2 },
          { author: 'John Lennon', count: 1 },
          { author: 'Gandhi', count: 1 }
        ]
      };
    } catch (err) {
      console.error('Failed to fetch stats (demo mode):', err);
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