# Bell's Skating Rink Website

A modern, responsive website for Bell's Skating Rink - a family-owned roller skating business in New Haven, Indiana.

## 🎯 Features

- **Modern Design**: 2025 design with smooth animations and gradients
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **SEO Optimized**: Structured data, meta tags, and performance optimized
- **Professional Layout**: Three-page structure (Home, About, Contact)
- **Contact Integration**: Ready for Formspree form integration
- **Accessibility**: Focus states, semantic HTML, and ARIA labels

## 🏗️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Forms**: Formspree React integration
- **Styling**: Pure CSS with modern features (Grid, Flexbox, Custom Properties)
- **Build Tool**: Create React App
- **Deployment Ready**: Firebase hosting compatible

## 📄 Pages

### Home Page
- Hero section with call-to-action buttons
- Services overview (skating, pizza, shaved ice, parties)
- Operating hours display
- Location and contact information
- Google rating showcase

### About Page
- Company story and family-owned emphasis
- Detailed service descriptions
- Company values and mission
- Professional testimonials area
- Call-to-action section

### Contact Page
- Contact form with Formspree integration
- Business hours and location details
- Google Maps integration ready
- Direct phone and email links
- Professional contact cards

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd bells-rink-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view in browser

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder ready for deployment.

## 📧 Form Setup

To enable the contact form:

1. Sign up for a free [Formspree](https://formspree.io/) account
2. Create a new form and get your form ID
3. Replace `"your-form-id"` in `src/pages/Contact.tsx` with your actual form ID:

```tsx
const [state, handleSubmit] = useForm("your-actual-form-id-here");
```

## 🎨 Customization

### Colors
The website uses a consistent color scheme defined in CSS custom properties. Main colors:
- Primary Blue: `#667eea`
- Secondary Purple: `#764ba2`
- Accent Red: `#ff6b6b`
- Gold: `#ffd700`

### Fonts
- Primary Font: Inter (Google Fonts)
- Fallbacks: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif

### Business Information
Update business details in the following files:
- `src/pages/Home.tsx` - Hours, address, phone
- `src/pages/Contact.tsx` - Contact information
- `src/components/Footer.tsx` - Footer details
- `public/index.html` - SEO metadata and structured data

## 🌐 Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize project: `firebase init hosting`
4. Build the project: `npm run build`
5. Deploy: `firebase deploy`

### Other Hosting Options
- Netlify: Connect GitHub repository for automatic deployments
- Vercel: Import project from GitHub
- Traditional hosting: Upload `build` folder contents

## 📱 Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags for description, keywords, author
- Open Graph tags for social media sharing
- Twitter Card support
- Structured data for local business
- Optimized images and loading
- Proper heading hierarchy
- Internal linking structure

## 📞 Business Information

**Bell's Skating Rink**
- Address: 7009 IN-930, Fort Wayne, IN 46803
- Phone: (260) 749-8214
- Google Rating: 4.4 stars
- Hours: 
  - Friday: 6:30 PM - 9:05 PM
  - Saturday: 12:00 PM - 3:00 PM, 6:30 PM - 9:00 PM
  - Sunday: 12:00 PM - 3:00 PM
  - Monday-Thursday: Closed
