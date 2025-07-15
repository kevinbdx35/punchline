# 🎯 Punchline API

> Modern REST API for managing inspirational quotes with React frontend. Features secure authentication, search functionality, and automated CI/CD deployment.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W61I0YBJ)

![Screen Capture](https://github.com/kevinbdx35/punchline/blob/main/screencapture-genuine-dragon-4b0e59-netlify-app-2022-04-26-20_11_52.png?raw=true)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen.svg)](https://github.com/kevinbdx35/punchline)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://www.docker.com/)

## ✨ Features

### 🔧 **Backend API**
- **🔒 Security First**: Helmet.js, rate limiting, input validation with Joi
- **⚡ High Performance**: In-memory caching, compression, optimized SQLite queries
- **🔍 Advanced Search**: Full-text search with relevance scoring
- **📊 Real-time Stats**: Quote statistics and analytics
- **📖 Comprehensive API**: RESTful endpoints with OpenAPI documentation
- **🏥 Health Monitoring**: Built-in health checks and error handling

### 🎨 **Frontend Interface**
- **📱 Responsive Design**: Mobile-first approach with modern UI
- **🎲 Random Quotes**: Get inspired with random quote generation
- **🔍 Smart Search**: Real-time search with filters
- **❤️ Favorites System**: Save your favorite quotes locally
- **📄 Pagination**: Smooth navigation through quote collections
- **⚡ Loading States**: Elegant loading indicators and error handling

### 🛠 **Developer Experience**
- **🧪 Full Test Suite**: 90%+ test coverage with Jest
- **🐳 Docker Ready**: Multi-stage builds and Docker Compose
- **🚀 CI/CD Pipeline**: Automated testing and deployment
- **📝 TypeScript Support**: Type-safe development
- **🎯 ESLint**: Consistent code quality

## 🚀 Quick Start

### 🌐 Live Demo
**[View Live Application →](https://kevinbdx35.github.io/punchline/)**

The application automatically deploys to GitHub Pages on every commit to `main`.

### Prerequisites
- Node.js 20+ 
- npm or yarn
- Docker (optional)

### 🏃‍♂️ Local Development

```bash
# Clone the repository
git clone https://github.com/kevinbdx35/punchline.git
cd punchline

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev

# The API will be available at http://localhost:3000
```

### 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.yml up -d
```

**Live Demo**: https://kevinbdx35.github.io/punchline/

**Local Development**:
- **API**: http://localhost:3000
- **Frontend**: http://localhost:1234

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/quotes` | Get quotes with pagination and filters |
| `GET` | `/quotes/:id` | Get specific quote by ID |
| `GET` | `/quotes/random` | Get random quote |
| `POST` | `/quotes` | Create new quote |
| `GET` | `/quotes/stats` | Get API statistics |
| `GET` | `/health` | Health check |

### Example Usage

```javascript
// Get quotes with search
const response = await fetch('/quotes?search=inspiration&page=1&lang=en');
const data = await response.json();

// Create new quote
const newQuote = {
  lang: 'en',
  quote: 'The only way to do great work is to love what you do.',
  author: 'Steve Jobs'
};

await fetch('/quotes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newQuote)
});
```

📖 **[Full API Documentation](./API_DOCUMENTATION.md)** | 🚀 **[Deployment Guide](./DEPLOYMENT_GUIDE.md)**

## 🛠 Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run test suite
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
```

### Frontend
```bash
cd punchline-front
npm start          # Start development server
npm run build      # Build for production
```

## 🏗 Project Structure

```
punchline/
├── 📁 middleware/          # Express middleware
│   ├── errorHandler.js     # Error handling
│   └── validation.js       # Input validation
├── 📁 routes/              # API routes
│   └── quotes.js           # Quote endpoints
├── 📁 services/            # Business logic
│   ├── db.js              # Database service
│   └── quotes.js          # Quote service
├── 📁 tests/              # Test suites
│   ├── services/          # Service tests
│   ├── routes/            # Route tests
│   └── middleware/        # Middleware tests
├── 📁 punchline-front/    # React frontend
│   ├── 📁 src/
│   │   ├── 📁 components/ # React components
│   │   ├── 📁 hooks/      # Custom hooks
│   │   └── 📁 sass/       # Styles
├── 📁 .github/workflows/  # CI/CD pipelines
├── 🐳 Dockerfile          # Docker configuration
├── 🐳 docker-compose.yml  # Multi-container setup
├── ⚙️ config.js           # Application config
└── 🚀 main.js             # Application entry point
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_PATH=./quotes.db

# API Configuration
LIST_PER_PAGE=20
API_BASE_URL=http://localhost:3000

# Frontend
FRONTEND_URL=http://localhost:1234

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
JWT_SECRET=your-secret-key-here

# Cache
CACHE_TTL=300
```

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
- **Services**: Database operations, quote logic
- **Routes**: API endpoints, validation, error handling  
- **Middleware**: Authentication, validation, error handling
- **Integration**: End-to-end API testing

## 🚀 Deployment

### 🌐 Automatic GitHub Pages Deployment

Every push to the `main` branch automatically deploys the application to GitHub Pages:

1. **Push to main branch**
2. **GitHub Actions runs tests**
3. **Builds the application**
4. **Deploys to gh-pages branch**
5. **Available at `https://kevinbdx35.github.io/punchline/`**

**Setup**: The `gh-pages` branch is created automatically on deployment.

📖 **[Complete Deployment Guide](./DEPLOYMENT_GUIDE.md)** | 🚀 **[First Deployment Instructions](./FIRST_DEPLOYMENT.md)**

### Production with Docker

```bash
# Build production images
docker-compose build

# Deploy to production
docker-compose -f docker-compose.yml up -d

# Scale services
docker-compose up --scale api=3
```

### Manual Deployment

```bash
# Install production dependencies
npm ci --only=production

# Set environment to production
export NODE_ENV=production

# Start application
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Write tests for new features
- Follow ESLint rules
- Update documentation
- Use conventional commits

## 📈 Performance & Features

- **⚡ Response Time**: < 100ms average
- **🔄 Caching**: Multi-layer caching strategy  
- **📦 Compression**: Gzip/Brotli compression
- **🗄️ Database**: Optimized SQLite with indexes
- **🚀 Rate Limiting**: 100 requests per 15 minutes
- **🎲 Random Quotes**: Inspirational content on demand
- **🔍 Smart Search**: Real-time filtering and pagination
- **❤️ Favorites**: Persistent user preferences

## 🔒 Security

- **🛡️ Helmet.js**: Security headers
- **🚫 Rate Limiting**: DDoS protection
- **✅ Input Validation**: Joi schema validation
- **🔐 CORS**: Configured cross-origin policies
- **🔒 Environment Variables**: Secure configuration

## 📊 Monitoring

- **🏥 Health Checks**: `/health` endpoint
- **📈 Metrics**: Request/response tracking
- **📝 Logging**: Structured logging with Morgan
- **🚨 Error Tracking**: Comprehensive error handling

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Kevin** - *Lead Developer*
- **Rony** - *Backend Developer*  
- **Victor** - *Frontend Developer*

## 🙏 Acknowledgments

- Express.js community for the robust framework
- React team for the excellent frontend library
- SQLite for the lightweight database solution
- GitHub Pages for free hosting
- All contributors and testers

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[Live Demo](https://kevinbdx35.github.io/punchline/) • [Report Bug](https://github.com/kevinbdx35/punchline/issues) • [Documentation](./API_DOCUMENTATION.md)

</div>
