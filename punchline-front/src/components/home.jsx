import React from "react";
import { useQuotes } from '../hooks/useQuotes';
import { useQuotesDemo } from '../hooks/useQuotesDemo';
import { QuoteCard } from './QuoteCard';
import { SearchBar } from './SearchBar';
import { LoadingSpinner } from './LoadingSpinner';
import { Pagination } from './Pagination';

export const Home = () => {
  // Use demo mode for GitHub Pages, real API for local development
  const isGitHubPages = window.location.hostname.includes('github.io');
  const quotesHook = isGitHubPages ? useQuotesDemo() : useQuotes();
  const { quotes, loading, error, fetchQuotes, getRandomQuote } = quotesHook;
  const [currentQuote, setCurrentQuote] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [favorites, setFavorites] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('random');
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('punchline-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Get initial random quote
    handleRandomQuote();
  }, []);

  React.useEffect(() => {
    if (activeTab === 'browse') {
      fetchQuotes(currentPage, searchTerm ? { search: searchTerm } : {});
    }
  }, [currentPage, activeTab]);

  const handleRandomQuote = async () => {
    const quote = await getRandomQuote();
    if (quote) {
      setCurrentQuote(quote);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setActiveTab('browse');
    fetchQuotes(1, searchTerm ? { search: searchTerm } : {});
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFavorite = (quote) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === quote.id);
    let newFavorites;
    
    if (isAlreadyFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== quote.id);
    } else {
      newFavorites = [...favorites, quote];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('punchline-favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (quote) => {
    return favorites.some(fav => fav.id === quote.id);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">Punchline API</h1>
          <p className="app-subtitle">
            Discover inspiring quotes and punchlines
            {isGitHubPages && <span className="demo-badge"> (Demo Mode)</span>}
          </p>
        </div>
        
        <nav className="navigation">
          <button 
            className={`nav-btn ${activeTab === 'random' ? 'active' : ''}`}
            onClick={() => setActiveTab('random')}
          >
            Random
          </button>
          <button 
            className={`nav-btn ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse
          </button>
          <button 
            className={`nav-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites ({favorites.length})
          </button>
        </nav>
      </header>

      <main className="main-content">
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {activeTab === 'random' && (
          <div className="random-section">
            <div className="random-controls">
              <button 
                className="random-btn" 
                onClick={handleRandomQuote}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Random Quote'}
              </button>
            </div>
            
            {loading && <LoadingSpinner />}
            
            {currentQuote && !loading && (
              <div className="random-quote-container">
                <QuoteCard 
                  quote={currentQuote} 
                  showActions={true}
                  onFavorite={handleFavorite}
                  isFavorite={isFavorite(currentQuote)}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'browse' && (
          <div className="browse-section">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearchSubmit={handleSearch}
            />
            
            {loading && <LoadingSpinner />}
            
            {quotes.data.length > 0 && !loading && (
              <>
                <div className="quotes-grid">
                  {quotes.data.map(quote => (
                    <QuoteCard 
                      key={quote.id} 
                      quote={quote}
                      showActions={true}
                      onFavorite={handleFavorite}
                      isFavorite={isFavorite(quote)}
                    />
                  ))}
                </div>
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={quotes.meta.totalPages}
                  hasNextPage={quotes.meta.hasNextPage}
                  hasPrevPage={quotes.meta.hasPrevPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
            
            {quotes.data.length === 0 && !loading && searchTerm && (
              <div className="no-results">
                No quotes found for "{searchTerm}"
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-section">
            {favorites.length === 0 ? (
              <div className="empty-favorites">
                <p>No favorite quotes yet!</p>
                <p>Click the ❤️ button on any quote to add it to your favorites.</p>
              </div>
            ) : (
              <div className="quotes-grid">
                {favorites.map(quote => (
                  <QuoteCard 
                    key={quote.id} 
                    quote={quote}
                    showActions={true}
                    onFavorite={handleFavorite}
                    isFavorite={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
