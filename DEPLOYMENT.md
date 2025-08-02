# Portfolio Deployment Guide

## 🚀 Deploying to Vercel with Backend

This portfolio now includes a backend API for project management that works seamlessly on Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Vercel CLI** (optional): `npm i -g vercel`

## 🔧 Setup Steps

### 1. Prepare Your Repository

Make sure your project structure looks like this:
```
portfolio/
├── api/
│   └── projects.ts          # Backend API
├── src/
│   ├── services/
│   │   └── api.ts          # API service
│   ├── data/
│   │   └── projects.ts     # Updated with API calls
│   └── components/         # React components
├── data/                   # Database directory (auto-created)
├── vercel.json            # Vercel configuration
└── package.json
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
5. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
# - Link to existing project or create new
# - Set up and deploy
```

### 3. Configure Environment Variables (Optional)

In your Vercel dashboard, you can add environment variables:
- `NODE_ENV=production`
- `VERCEL_URL=your-domain.vercel.app`

## 🔐 Admin Access

### Default Credentials
- **Email**: `omrsagar123@gmail.com`
- **Password**: `admin123`

### Change Default Password
1. Edit `src/utils/auth.ts`
2. Change `ADMIN_PASSWORD` to a secure password
3. Redeploy

## 📊 How It Works

### Backend API (`/api/projects`)
- **GET**: Fetch all projects
- **POST**: Add new project
- **PUT**: Update existing project
- **DELETE**: Delete project

### Data Storage
- **Primary**: JSON file in `/data/projects.json`
- **Backup**: Browser localStorage
- **Auto-sync**: Changes reflect immediately

### Features
- ✅ **Real-time Updates**: Projects update instantly
- ✅ **Cross-device Sync**: Data persists across devices
- ✅ **Offline Fallback**: Works even if API is down
- ✅ **Admin-only Access**: Secure project management
- ✅ **Automatic Backup**: Local storage as backup

## 🛠️ Testing Your Deployment

### 1. Test Public Site
- Visit your deployed URL
- Check that projects display correctly
- Verify all sections work

### 2. Test Admin Panel
- Go to `your-domain.vercel.app/admin`
- Login with admin credentials
- Try adding/editing/deleting projects
- Verify changes appear on main site

### 3. Test API Directly
```bash
# Get all projects
curl https://your-domain.vercel.app/api/projects

# Add a project
curl -X POST https://your-domain.vercel.app/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Project","description":"Test","techStack":["React"],"image":"💼","featured":false}'
```

## 🔧 Troubleshooting

### Common Issues

1. **API Not Working**
   - Check Vercel function logs
   - Verify API routes are deployed
   - Check CORS settings

2. **Projects Not Loading**
   - Check browser console for errors
   - Verify API endpoint URL
   - Check network connectivity

3. **Admin Login Fails**
   - Verify credentials in `auth.ts`
   - Check browser localStorage
   - Clear browser cache

### Debug Steps
1. Check Vercel function logs in dashboard
2. Test API endpoints directly
3. Check browser console for errors
4. Verify environment variables

## 📈 Monitoring

### Vercel Analytics
- Monitor API usage in Vercel dashboard
- Check function execution times
- Monitor error rates

### Custom Analytics
- Add Google Analytics for visitor tracking
- Monitor admin panel usage
- Track project management activity

## 🔄 Updates and Maintenance

### Adding New Features
1. Develop locally with `npm start`
2. Test API endpoints
3. Push to GitHub
4. Vercel auto-deploys

### Database Management
- Projects are stored in `/data/projects.json`
- Backup this file regularly
- Consider migrating to external database for scale

## 🎯 Production Checklist

- [ ] Deploy to Vercel
- [ ] Test admin login
- [ ] Add real projects
- [ ] Change default password
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check performance
- [ ] Set up monitoring

## 🚀 Next Steps

### Potential Enhancements
1. **External Database**: Migrate to MongoDB/Supabase
2. **Image Upload**: Add project image upload
3. **Analytics**: Add visitor tracking
4. **SEO**: Optimize for search engines
5. **CDN**: Add image optimization

### Security Improvements
1. **Environment Variables**: Move credentials to env vars
2. **Rate Limiting**: Add API rate limiting
3. **Input Validation**: Enhance form validation
4. **HTTPS**: Ensure secure connections

---

Your portfolio is now ready for production with a fully functional backend! 🎉 