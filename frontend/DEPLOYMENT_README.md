# Frontend Deployment Guide

## ✅ Deployment Ready Checklist

- [x] Build script configured (`npm run build`)
- [x] API URL uses environment variable (`VITE_API_URL`)
- [x] Vite configuration optimized
- [x] PWA support (service worker, manifest)
- [x] Production build tested

## 🚀 Quick Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Replace with your actual backend URL

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live!

### Option 2: Deploy to Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Sign up/login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository

2. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

3. **Set Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Replace with your actual backend URL

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

### Option 3: Deploy to Other Platforms

For any other static hosting platform:

1. Build the project:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Upload the `frontend/dist` folder to your hosting provider

3. Set environment variable `VITE_API_URL` if supported

## 📝 Environment Variables

### Required for Production

- `VITE_API_URL` - Your backend API URL
  - Example: `https://your-backend.onrender.com/api`
  - Example: `https://your-backend.railway.app/api`
  - Example: `https://your-backend.herokuapp.com/api`

### Setting Environment Variables

**Vercel:**
- Project Settings → Environment Variables → Add `VITE_API_URL`

**Netlify:**
- Site Settings → Environment Variables → Add `VITE_API_URL`

**Other Platforms:**
- Check platform documentation for environment variable configuration

## 🔧 Build Configuration

The frontend uses Vite for building. The build process:

1. Compiles React components
2. Optimizes assets
3. Generates production-ready files in `dist/` folder
4. Includes service worker for PWA support

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

## ✅ Post-Deployment Checklist

1. [ ] Test API connection - Verify frontend can reach backend
2. [ ] Test authentication - Login/Register should work
3. [ ] Test CORS - Ensure backend allows your frontend domain
4. [ ] Update backend `FRONTEND_URL` - Set in backend environment variables
5. [ ] Test all features - Attendance, Leaves, Notifications, etc.

## 🐛 Troubleshooting

### Issue: API calls failing (CORS errors)

**Solution:**
- Verify `VITE_API_URL` is set correctly in deployment platform
- Check backend CORS configuration includes your frontend URL
- Ensure backend `FRONTEND_URL` environment variable is set

### Issue: Build fails

**Solution:**
- Check Node.js version (should be 16+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors
- Try building locally: `cd frontend && npm run build`

### Issue: Blank page after deployment

**Solution:**
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Check that `dist` folder contains `index.html`
- Verify routing configuration in deployment platform

### Issue: Assets not loading

**Solution:**
- Check that base path is correct in `vite.config.js`
- Verify asset paths in built files
- Check deployment platform static file serving configuration

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

## 🎯 Next Steps

After deploying frontend:

1. Copy your frontend URL (e.g., `https://your-app.vercel.app`)
2. Update backend `FRONTEND_URL` environment variable
3. Restart backend server
4. Test the complete application

Your frontend is **deployment ready**! 🚀

