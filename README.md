# Ved Prakash Arya - Portfolio Website

A premium, fully functional portfolio website inspired by Jesko Jet with ultra-smooth animations, modern design, and a complete admin panel.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

## ✨ Features

### Frontend
- **Jesko Jet Inspired Animations** - Ultra smooth GSAP + Framer Motion animations
- **Lenis Smooth Scroll** - Buttery smooth scrolling experience
- **Custom Cursor** - Animated custom cursor with hover effects
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-first, fully responsive layout
- **Scroll Progress Indicator** - Visual progress bar while scrolling
- **Page Loader** - Animated loading screen

### Sections
1. **Hero** - Cinematic intro with letter-by-letter name reveal
2. **About** - Animated timeline with education and experience
3. **Projects** - Dynamic project cards with 3D hover effects
4. **SnapnestX** - Startup showcase with glassmorphism UI
5. **Skills** - Circular progress indicators with animations
6. **Contact** - Animated contact form with social links

### Admin Panel (`/admin`)
- **Firebase Authentication** - Secure admin login
- **Dashboard** - Overview with stats and recent activity
- **Projects Manager** - Add, edit, delete projects with image upload
- **Skills Manager** - Manage skills with proficiency levels
- **About Manager** - Update bio, education, and experience

### Backend
- **MongoDB Atlas** - Database for projects, skills, and about data
- **Cloudinary** - Image upload and storage
- **Firebase Auth** - Authentication system
- **REST API** - Full CRUD operations

## 🚀 Tech Stack

### Frontend
- React 19 + TypeScript
- Vite (Build tool)
- Tailwind CSS 3.4
- Framer Motion
- GSAP + ScrollTrigger
- Lenis (Smooth scroll)
- shadcn/ui components
- Lucide React icons

### Backend
- Node.js + Express (API routes)
- MongoDB + Mongoose
- Cloudinary SDK
- Firebase Admin SDK

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Firebase project
- Cloudinary account

### 1. Clone the Repository
```bash
git clone https://github.com/factstorage4-a11y/Portfolio-website.git
cd Portfolio-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Configuration
ADMIN_EMAIL=vedprakasharya9973@gmail.com
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the portfolio.

Admin panel: [http://localhost:5173/admin](http://localhost:5173/admin)

**Demo Credentials:**
- Email: `vedprakasharya9973@gmail.com`
- Password: `admin123`

### 5. Build for Production
```bash
npm run build
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Add Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Redeploy**
```bash
vercel --prod
```

### Environment Variables on Vercel

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | From Firebase Console |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | From Firebase Console |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | From Firebase Console |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | From Firebase Console |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | From Firebase Console |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | From Firebase Console |
| `MONGODB_URI` | From MongoDB Atlas |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | From Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary Dashboard |

## 📁 Project Structure

```
├── src/
│   ├── api/              # API functions
│   ├── components/       # Reusable components
│   │   ├── admin/       # Admin panel components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── CustomCursor.tsx
│   │   ├── Navigation.tsx
│   │   ├── PageLoader.tsx
│   │   └── ScrollProgress.tsx
│   ├── lib/             # Utilities & configs
│   │   ├── cloudinary.ts
│   │   ├── firebase.ts
│   │   ├── mongodb.ts
│   │   └── utils.ts
│   ├── models/          # MongoDB models
│   │   ├── About.ts
│   │   ├── Project.ts
│   │   └── Skill.ts
│   ├── pages/           # Page components
│   │   └── Admin.tsx
│   ├── sections/        # Main page sections
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── SnapnestX.tsx
│   ├── types/           # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.local           # Environment variables
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 🔧 Customization

### Changing Personal Information

Edit the data in respective section files:
- **Hero**: `src/sections/Hero.tsx`
- **About**: `src/sections/About.tsx`
- **Skills**: `src/sections/Skills.tsx`

Or use the **Admin Panel** to update content dynamically!

### Adding New Projects

1. Go to `/admin`
2. Navigate to "Projects"
3. Click "Add Project"
4. Fill in details and upload image
5. Save

### Changing Colors

Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ...
}
```

Or modify CSS variables in `src/index.css`.

## 🎨 Animation Features

- **Letter-by-letter text reveal** in Hero section
- **3D card tilt effect** on project cards
- **Parallax scrolling** with GSAP ScrollTrigger
- **Smooth scroll** with Lenis
- **Custom cursor** with magnetic effect
- **Circular progress** animation for skills
- **Timeline animations** in About section
- **Stagger animations** throughout

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security

- Firebase Authentication for admin access
- Environment variables for sensitive data
- Input validation on all forms
- Secure MongoDB connection

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

- **Email**: vedprakasharya9973@gmail.com
- **LinkedIn**: [linkedin.com/in/vedpra260](https://linkedin.com/in/vedpra260)
- **GitHub**: [github.com/vedprakasharya](https://github.com/vedprakasharya)

---

Built with ❤️ by Ved Prakash Arya
