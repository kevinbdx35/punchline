# 🚀 Deployment Guide

## GitHub Pages Automatic Deployment

### Configuration Steps

1. **Enable GitHub Pages in Repository Settings**
   - Go to your repository on GitHub
   - Navigate to `Settings` > `Pages`
   - Select `Deploy from a branch` as the source
   - Choose `gh-pages` branch and `/ (root)` folder
   - The workflow will automatically create and deploy to the `gh-pages` branch on every push to `main`

2. **Repository Secrets (Optional)**
   - For advanced deployments, add these secrets in `Settings` > `Secrets and variables` > `Actions`:
   - `CODECOV_TOKEN`: For test coverage reporting
   - `REGISTRY_URL`: For Docker registry deployment
   - `REGISTRY_USERNAME`: Docker registry username
   - `REGISTRY_PASSWORD`: Docker registry password

### How It Works

The deployment process includes:

1. **Testing Phase**
   - Runs all Jest tests
   - Performs ESLint code quality checks
   - Ensures code quality before deployment

2. **Build Phase**
   - Builds the React frontend for production
   - Configures the app for GitHub Pages subdirectory (`/punchline`)
   - Creates a demo version with mock data

3. **Deploy Phase**
   - Creates/updates the `gh-pages` branch with the built application
   - GitHub Pages serves the content from the `gh-pages` branch
   - Makes it available at `https://yourusername.github.io/punchline`

### Access Your Deployed Application

After successful deployment, your application will be available at:
- **Main Site**: `https://yourusername.github.io/punchline/`
- **API Documentation**: `https://yourusername.github.io/punchline/docs/`

### Demo Mode Features

Since GitHub Pages only serves static files, the deployed version includes:
- **Mock Data**: Pre-loaded quotes for demonstration
- **Simulated API**: Frontend-only simulation of API responses
- **Full UI**: All interface features work with demo data
- **Documentation**: Complete API documentation

### Local vs GitHub Pages

| Feature | Local Development | GitHub Pages |
|---------|------------------|--------------|
| Backend API | Real Express server | Mock/Demo data |
| Database | SQLite with real data | Simulated in frontend |
| Create Quotes | Saves to database | Demo simulation |
| Search/Filter | Real database queries | Frontend filtering |
| Pagination | Server-side | Client-side simulation |

## Manual Deployment Options

### 1. Docker Deployment

```bash
# Build and deploy with Docker
docker-compose up --build -d

# Scale for production
docker-compose up --scale api=3 -d
```

### 2. Node.js Server Deployment

```bash
# Production build
npm ci --only=production
export NODE_ENV=production
npm start
```

### 3. Static Hosting (Netlify/Vercel)

```bash
# Build frontend for static hosting
cd punchline-front
npm run build
# Deploy the dist/ folder to your static host
```

## Environment Configuration

### GitHub Pages
- Uses demo data (no backend required)
- Public URL configured for subdirectory deployment
- Optimized for static hosting

### Production Server
```env
NODE_ENV=production
PORT=3000
DATABASE_PATH=/app/data/quotes.db
FRONTEND_URL=https://yourdomain.com
```

### Development
```env
NODE_ENV=development
PORT=3000
DATABASE_PATH=./quotes.db
FRONTEND_URL=http://localhost:1234
```

## Troubleshooting

### GitHub Pages Deployment Fails
1. Check that GitHub Pages is enabled in repository settings with `gh-pages` branch selected
2. Ensure the `main` branch exists and has commits
3. Check the Actions tab for error details
4. Verify the workflow file syntax
5. Ensure the `gh-pages` branch has been created by the workflow
6. Check that the repository has the correct permissions for GitHub Actions

### Build Errors
1. Check Node.js version compatibility (requires 18+)
2. Verify all dependencies are listed in package.json
3. Check for syntax errors in test files
4. Ensure ESLint rules are followed

### Access Issues
1. Wait 5-10 minutes after deployment for DNS propagation
2. Check the correct URL format: `username.github.io/punchline`
3. Clear browser cache if seeing old content
4. Check browser console for JavaScript errors

## Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the repository root:
```
yourdomain.com
```

2. Configure DNS records with your domain provider:
```
CNAME record: www.yourdomain.com → yourusername.github.io
A records: yourdomain.com → GitHub Pages IPs
```

3. Enable custom domain in repository settings

## Monitoring

### GitHub Actions
- Monitor deployment status in the Actions tab
- View logs for troubleshooting
- Check deployment times and success rates

### Application Monitoring
- Use browser dev tools to check for errors
- Monitor the demo functionality
- Check API documentation accessibility

## Security Considerations

### GitHub Pages
- All code is public (suitable for open source)
- No server-side processing
- Static files only

### Production Deployment
- Use environment variables for secrets
- Enable HTTPS
- Configure proper CORS settings
- Set up monitoring and logging

## Next Steps

1. **Customize the Demo**: Modify mock data in `useQuotesDemo.js`
2. **Add Analytics**: Integrate Google Analytics or similar
3. **Custom Styling**: Update the design for your brand
4. **SEO Optimization**: Add meta tags and structured data
5. **Performance**: Optimize images and assets

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review this deployment guide
3. Create an issue in the repository
4. Check the GitHub Pages documentation