# Punchline API Documentation

## Overview

The Punchline API is a modern REST API for managing and retrieving quotes and punchlines. Built with Node.js, Express, and SQLite, it provides robust features including search, pagination, caching, and comprehensive validation.

## Base URL

```
http://localhost:3000
```

## Authentication

Currently, the API doesn't require authentication for read operations. Future versions may include API key authentication for write operations.

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP address per window
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Response Format

All responses follow a consistent JSON format:

### Success Response
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "totalPages": 5,
    "total": 100,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Error Response
```json
{
  "error": {
    "message": "Error description",
    "status": 400,
    "details": [...]
  }
}
```

## Endpoints

### Health Check

#### GET /health
Check API health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-04-26T10:00:00.000Z"
}
```

### Quotes

#### GET /quotes
Retrieve quotes with optional filtering and pagination.

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1, max: 1000)
- `search` (string, optional): Search in quote text and author
- `author` (string, optional): Filter by author name
- `lang` (string, optional): Filter by language code

**Example:**
```bash
GET /quotes?page=1&search=inspiration&lang=en
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "lang": "en",
      "quote": "The only way to do great work is to love what you do.",
      "author": "Steve Jobs",
      "created_at": "2023-04-26T10:00:00.000Z",
      "updated_at": "2023-04-26T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "totalPages": 1,
    "total": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

#### GET /quotes/:id
Retrieve a specific quote by ID.

**Parameters:**
- `id` (integer): Quote ID

**Response:**
```json
{
  "id": 1,
  "lang": "en",
  "quote": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs",
  "created_at": "2023-04-26T10:00:00.000Z",
  "updated_at": "2023-04-26T10:00:00.000Z"
}
```

**Error Responses:**
- `400`: Invalid quote ID
- `404`: Quote not found

#### GET /quotes/random
Get a random quote, optionally filtered by language.

**Query Parameters:**
- `lang` (string, optional): Language filter

**Example:**
```bash
GET /quotes/random?lang=en
```

**Response:**
```json
{
  "id": 42,
  "lang": "en",
  "quote": "Life is what happens to you while you're busy making other plans.",
  "author": "John Lennon",
  "created_at": "2023-04-26T10:00:00.000Z",
  "updated_at": "2023-04-26T10:00:00.000Z"
}
```

#### POST /quotes
Create a new quote.

**Request Body:**
```json
{
  "lang": "en",
  "quote": "Your quote text here (10-1000 characters)",
  "author": "Author Name (2-100 characters)"
}
```

**Validation Rules:**
- `lang`: 2-10 characters, letters and hyphens only (e.g., "en", "fr", "en-US")
- `quote`: 10-1000 characters, trimmed
- `author`: 2-100 characters, trimmed

**Response:**
```json
{
  "id": 123,
  "message": "Quote created successfully",
  "quote": {
    "id": 123,
    "lang": "en",
    "quote": "Your quote text here",
    "author": "Author Name"
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `409`: Quote already exists

#### GET /quotes/stats
Get API statistics.

**Response:**
```json
{
  "totalQuotes": 1250,
  "totalAuthors": 342,
  "languageDistribution": [
    { "lang": "en", "count": 800 },
    { "lang": "fr", "count": 300 },
    { "lang": "es", "count": 150 }
  ],
  "topAuthors": [
    { "author": "Winston Churchill", "count": 25 },
    { "author": "Albert Einstein", "count": 20 },
    { "author": "Mark Twain", "count": 18 }
  ]
}
```

## HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `409`: Conflict (duplicate)
- `429`: Too Many Requests (rate limited)
- `500`: Internal Server Error

## Caching

The API implements caching headers:

- **GET /quotes**: 5 minutes cache (`Cache-Control: public, max-age=300`)
- **GET /quotes/:id**: 1 hour cache (`Cache-Control: public, max-age=3600`)
- **GET /quotes/random**: 1 minute cache (`Cache-Control: public, max-age=60`)
- **GET /quotes/stats**: 15 minutes cache (`Cache-Control: public, max-age=900`)

## Examples

### JavaScript/Fetch
```javascript
// Get quotes
const response = await fetch('http://localhost:3000/quotes?page=1');
const data = await response.json();

// Create quote
const newQuote = {
  lang: 'en',
  quote: 'Success is not final, failure is not fatal.',
  author: 'Winston Churchill'
};

const response = await fetch('http://localhost:3000/quotes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newQuote)
});
```

### cURL
```bash
# Get quotes
curl "http://localhost:3000/quotes?page=1&search=inspiration"

# Create quote
curl -X POST "http://localhost:3000/quotes" \
  -H "Content-Type: application/json" \
  -d '{
    "lang": "en",
    "quote": "The future belongs to those who believe in the beauty of their dreams.",
    "author": "Eleanor Roosevelt"
  }'

# Get random quote
curl "http://localhost:3000/quotes/random?lang=en"
```

## Error Handling

The API provides detailed error messages for debugging:

### Validation Error Example
```json
{
  "error": {
    "message": "Validation failed",
    "status": 400,
    "details": [
      {
        "field": "quote",
        "message": "Quote must be at least 10 characters"
      },
      {
        "field": "lang",
        "message": "Language must contain only letters and hyphens"
      }
    ]
  }
}
```

## Development

### Running Locally
```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev

# Run tests
npm test

# Run with coverage
npm run test:coverage
```

### Docker
```bash
# Build and run with Docker Compose
docker-compose up --build

# Production build
docker-compose -f docker-compose.yml up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details.