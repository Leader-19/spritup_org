# Nexus Dashboard - Vue 3 + Vite

A modern, responsive dashboard built with Vue 3, Vite, and Tailwind CSS. Features dark mode, bilingual support (English & Khmer), and a clean component-based architecture.

## Features

- ✅ Vue 3 with Composition API
- ✅ Vite for lightning-fast development
- ✅ Tailwind CSS for styling
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark mode toggle
- ✅ Bilingual support (English & Khmer)
- ✅ Reusable components
- ✅ Modern UI with smooth animations
- ✅ AI Chat widget
- ✅ Dashboard with metrics and analytics

## Project Structure

```
nexus-dashboard/
├── src/
│   ├── components/
│   │   ├── Navbar.vue          # Top navigation bar
│   │   ├── Sidebar.vue         # Side navigation menu
│   │   ├── HomePage.vue        # Home page content
│   │   ├── DashboardPage.vue   # Dashboard page content
│   │   ├── ChatWidget.vue      # AI chat widget
│   │   └── Footer.vue          # Footer component
│   ├── App.vue                 # Root component
│   ├── main.js                 # Vue app entry point
│   └── globals.css             # Global styles
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ (recommended: 18+)
- npm or yarn

### Installation

1. **Clone or download the project**

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Components

### Navbar
Top navigation bar with:
- Dark mode toggle
- Language switcher (English/Khmer)
- Mobile menu button
- User profile dropdown

### Sidebar
Responsive side navigation with:
- Navigation categories
- Active page indicator
- Collapsible on mobile
- Smooth transitions

### HomePage
Landing page with:
- Hero section with call-to-action
- Features showcase
- Statistics cards
- Feature grid layout

### DashboardPage
Dashboard with:
- Key metrics
- Activity timeline
- Category breakdown
- Chart visualizations

### ChatWidget
AI chat assistant with:
- Floating widget
- Message history
- Quick action prompts
- Typing animations

### Footer
Multi-section footer with:
- Company info
- Quick links
- Social media
- Contact information

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```js
theme: {
  colors: {
    brand: {
      400: '#your-color',
      700: '#your-color'
    }
  }
}
```

### Fonts
Fonts are loaded from Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Language
Add more languages in `App.vue`:
```js
const currentLang = ref('en') // Change to add more languages
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation tool

## Performance

- Optimized for fast load times
- Code splitting enabled
- CSS purging for production
- Responsive image handling

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel automatically builds and deploys

### Deploy to Other Platforms
- Netlify: Connect your repo and set build command to `npm run build`
- GitHub Pages: Use `dist` folder as source
- Traditional hosting: Upload `dist` folder contents

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using Vue 3 + Vite
