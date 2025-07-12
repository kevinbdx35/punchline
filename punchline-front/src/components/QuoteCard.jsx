import React from 'react';

export const QuoteCard = ({ quote, showActions = false, onFavorite, isFavorite = false }) => {
  if (!quote) return null;

  return (
    <div className="quote-card">
      <div className="quote-content">
        <blockquote className="quote-text">
          "{quote.quote}"
        </blockquote>
        <div className="quote-meta">
          <cite className="quote-author">— {quote.author}</cite>
          {quote.lang && (
            <span className="quote-language">{quote.lang.toUpperCase()}</span>
          )}
        </div>
      </div>
      
      {showActions && (
        <div className="quote-actions">
          <button
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={() => onFavorite && onFavorite(quote)}
            aria-label="Add to favorites"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <button
            className="share-btn"
            onClick={() => navigator.share && navigator.share({
              title: 'Quote',
              text: `"${quote.quote}" - ${quote.author}`
            })}
            aria-label="Share quote"
          >
            📤
          </button>
        </div>
      )}
    </div>
  );
};