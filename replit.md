# Tarun Kumar - AI/ML Engineer Portfolio

## Overview

This is a comprehensive, multi-page personal portfolio website for Tarun Kumar, an AI/ML engineer and developer. The site has been expanded to 12 distinct pages that showcase his professional experience, projects, skills, education, services, and achievements through a clean, responsive design with AI-themed visual elements.

## Recent Changes

- **January 2025**: Expanded portfolio from 7 to 12 comprehensive pages
- Added Education page with academic timeline and achievements  
- Created Profiles page featuring professional and social platforms
- Built Services page showcasing AI/ML consulting and technical services
- Developed Blogs page with technical articles and insights
- Added Certificates page highlighting achievements and recognitions
- Created Milestones page documenting career progression and impact
- Updated navigation across all pages for consistent 12-page structure
- Maintained existing design system and AI-themed aesthetics

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- **Design Approach**: Mobile-first responsive design with CSS Grid and Flexbox
- **Theme System**: Dual light/dark theme support with CSS custom properties
- **Navigation**: Single-page application feel with multi-page structure

### Page Structure
The website follows a comprehensive multi-page architecture with 12 distinct sections:
- `index.html` - Landing page with hero section and AI-themed animations
- `about.html` - Personal background and career objective
- `education.html` - Academic timeline and educational achievements
- `experience.html` - Professional work experience timeline and career journey
- `profiles.html` - Professional and social media platforms connections
- `projects.html` - Portfolio of AI/ML projects with interactive showcases
- `services.html` - Professional services offered and pricing information
- `blogs.html` - Technical articles and insights on AI/ML and technology
- `certificates.html` - Professional certifications and academic achievements
- `skills.html` - Technical skills and expertise display
- `milestones.html` - Key achievements and career milestones
- `resume.html` - Complete professional background (legacy page)
- `contact.html` - Contact information and communication methods

## Key Components

### Visual Design System
- **Color Scheme**: AI-themed gradient colors with blues, purples, and teals
- **Typography**: Inter font family for readability with JetBrains Mono for code
- **Animations**: Neural network-inspired background animations and interactive elements
- **Icons**: Font Awesome 6.0 for consistent iconography

### Theme Management
- CSS custom properties for seamless light/dark mode switching
- Local storage persistence for user theme preferences
- JavaScript-powered theme toggle with smooth transitions

### Responsive Design
- Mobile-first approach with progressive enhancement
- Flexible grid systems for different screen sizes
- Touch-friendly navigation and interactions

## Data Flow

### Static Content Management
- All content is hardcoded in HTML files based on provided resume data
- No dynamic data fetching or external APIs for content
- Project information includes GitHub links for external repositories

### User Interactions
- Theme switching: JavaScript updates CSS custom properties and saves to localStorage
- Navigation: Standard HTML page navigation with active state management
- Animations: CSS animations triggered by viewport entry and user interactions

## External Dependencies

### CDN Resources
- **Font Awesome 6.0**: Icon library for UI elements
- **Google Fonts**: Inter and JetBrains Mono font families
- No JavaScript frameworks or libraries beyond vanilla JS

### External Links
- GitHub repositories for project showcases
- LinkedIn and social media profiles
- Email and phone contact methods

## Deployment Strategy

### Static Hosting
- The website is designed for static hosting platforms
- No server-side processing required
- All assets are self-contained within the project structure

### File Organization
```
/
├── index.html
├── about.html
├── education.html
├── experience.html
├── profiles.html
├── projects.html
├── services.html
├── blogs.html
├── certificates.html
├── skills.html
├── milestones.html
├── resume.html
├── contact.html
├── assets/
│   ├── style.css
│   ├── script.js
│   └── tarun-photo.jpg
└── attached_assets/
    └── [reference documents]
```

### Performance Considerations
- Minimal external dependencies to ensure fast loading
- CSS and JavaScript are concatenated into single files
- Image optimization and lazy loading for visual assets
- Progressive enhancement for core functionality

### Browser Compatibility
- Modern browser support with graceful degradation
- CSS custom properties with fallbacks
- ES6+ JavaScript features with compatibility considerations

## Technical Implementation Notes

### CSS Architecture
- CSS custom properties for theming and consistent design tokens
- Modular CSS organization with clear component separation
- Responsive breakpoints using em-based media queries

### JavaScript Functionality
- Theme management class for organized code structure
- Event delegation for efficient event handling
- Local storage for user preference persistence

### Content Strategy
- Professional AI/ML engineer positioning
- Project-focused portfolio with technical depth
- Clear call-to-actions for hiring and collaboration