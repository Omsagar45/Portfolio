# Om Sagar - Personal Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features a dark theme with beautiful animations and a professional design.

## 🚀 Features

- **Fully Responsive Design** - Works perfectly on all devices
- **Modern Dark Theme** - Professional dark theme with accent colors
- **Smooth Animations** - Powered by Framer Motion
- **Interactive Components** - Hover effects and smooth transitions
- **Contact Form** - Functional contact form (ready for EmailJS integration)
- **SEO Optimized** - Meta tags and semantic HTML
- **Performance Optimized** - Fast loading and smooth scrolling

## 📋 Sections

1. **Hero Section** - Introduction with call-to-action buttons
2. **About** - Personal information and highlights
3. **Skills** - Technical skills with proficiency indicators
4. **Experience** - Work experience with timeline layout
5. **Education** - Academic background with cards
6. **Projects** - Portfolio projects (placeholder cards)
7. **Achievements** - Awards and accomplishments
8. **Contact** - Contact form and information
9. **Footer** - Social links and additional information

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hooks
- **Deployment**: Ready for Netlify/Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Personal Information
Update the data files in `src/data/` to customize the content:

- `personalInfo.ts` - Personal details and contact information
- `education.ts` - Educational background
- `experience.ts` - Work experience
- `skills.ts` - Technical skills
- `achievements.ts` - Awards and accomplishments

### Styling
The design uses Tailwind CSS with custom color schemes. You can modify:

- `tailwind.config.js` - Color palette and custom utilities
- `src/index.css` - Global styles and component classes

### Contact Form
To enable email functionality, integrate with:

- **EmailJS**: For client-side email sending
- **FormSubmit**: For form handling without backend
- **Netlify Forms**: If deploying to Netlify

## 🎨 Customization

### Colors
The portfolio uses a custom color palette:
- Primary: Blue shades
- Secondary: Purple shades  
- Accent: Teal shades
- Dark: Gray/black shades

### Animations
All animations are powered by Framer Motion and can be customized in each component.

### Content
All content is stored in TypeScript files for easy editing and type safety.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically deploy on push

### GitHub Pages
1. Add `homepage` field to `package.json`
2. Install `gh-pages`: `npm install --save-dev gh-pages`
3. Add deploy scripts to `package.json`
4. Run `npm run deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: omrsagar123@gmail.com
- **Phone**: +91-7385973714
- **Location**: Pune, India

---

Made with ❤️ by Om Sagar using React & Tailwind CSS
