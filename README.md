# FLIP - The People's Bottle Network

A worker-first bottle redemption platform connecting California collectors with opportunities.

## Website Structure

This is a fully functional, mobile-optimized multi-page website for the FLIP app.

### Pages

- **index.html** - Homepage with hero, problem, solution sections
- **how-it-works.html** - Detailed explanation of the platform
- **for-collectors.html** - Information for bottle collectors
- **for-donors.html** - Information for bottle donors and businesses
- **about.html** - Mission, values, and team information
- **contact.html** - Contact form and contact information
- **privacy.html** - Privacy policy
- **terms.html** - Terms of service

### Design

- Brutalist design aesthetic
- Bold typography using Archivo Black and Space Grotesk fonts
- Green (#00D95F) and black color scheme
- Fully responsive mobile-first design
- Smooth animations and hover effects
- Touch-optimized for mobile devices

## Mobile Optimization

The website is fully optimized for all screen sizes:

✅ **iPhone (all sizes)** - Including iPhone SE, iPhone 14/15 Pro Max
✅ **iPad** - Portrait and landscape modes
✅ **Android phones & tablets** - All screen sizes
✅ **Desktop** - All resolutions from 1024px to 4K

### Mobile Features:
- Hamburger menu with slide-out navigation
- Touch-friendly button sizes
- Optimized font sizes for readability
- Single-column layouts on mobile
- Full-screen overlay menu
- Smooth animations and transitions
- No horizontal scrolling

## How to View

Simply open `index.html` in your web browser:

```bash
open index.html
```

Or drag the file into your browser window.

### Test on Different Devices:

**Chrome DevTools:**
1. Open the website in Chrome
2. Press F12 or right-click → Inspect
3. Click the device toggle icon (Ctrl+Shift+M / Cmd+Shift+M)
4. Select different devices to test

## Features

✓ All header and footer navigation links are functional
✓ Smooth scrolling between sections
✓ **Fully responsive mobile design with hamburger menu**
✓ **Optimized for iPhone, iPad, and all screen sizes**
✓ **Touch-optimized interactions**
✓ **Swipe-friendly mobile navigation**
✓ Contact form with validation
✓ Consistent styling across all pages
✓ Fast-loading external CSS and JavaScript
✓ Mobile menu with smooth animations
✓ Overlay backdrop on mobile for better UX

## File Structure

```
SF Hacks Website/
├── index.html           # Homepage
├── how-it-works.html    # Platform explanation
├── for-collectors.html  # Collector information
├── for-donors.html      # Donor information
├── about.html          # About the organization
├── contact.html        # Contact form
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── styles.css          # All styling (responsive)
├── menu.js             # Mobile menu functionality
└── README.md           # This file
```

## Responsive Breakpoints

The design adapts at these breakpoints:

- **Mobile (Portrait)**: 0-480px
- **Mobile (Landscape)**: 481-767px  
- **Tablets**: 768-1024px
- **Desktop**: 1025px+

## Customization

All styles are in `styles.css`. To customize:

### Change Colors:
```css
:root {
    --green: #00D95F;      /* Primary color */
    --dark-green: #00A843; /* Hover state */
    --black: #0A0A0A;      /* Background */
    --white: #FEFEFE;      /* Text */
}
```

### Update Fonts:
Modify the Google Fonts link in each HTML file's `<head>` section.

### Adjust Mobile Menu:
Edit `menu.js` to change animation speed or behavior.

## Browser Support

✅ Chrome (latest)
✅ Safari (iOS & macOS)
✅ Firefox (latest)
✅ Edge (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight CSS (33KB)
- Minimal JavaScript (2KB)
- No external dependencies
- Fast loading on 3G/4G/5G
- Google Fonts loaded asynchronously

## Deployment

Ready to deploy to:

1. **Netlify** (Recommended)
   - Drag folder to netlify.com/drop
   - Or connect GitHub repo

2. **Vercel**
   - Import repository
   - Auto-deploys on push

3. **GitHub Pages**
   - Push to repository
   - Enable in Settings → Pages

4. **Traditional hosting**
   - Upload all files via FTP
   - Ensure index.html is in root

## Next Steps

- [ ] Add actual app store links to download buttons
- [ ] Connect contact form backend (FormSpree, Netlify Forms)
- [ ] Add social media links in footer
- [ ] Implement analytics (Google Analytics, Plausible)
- [ ] Add meta tags for SEO
- [ ] Create favicon and app icons
- [ ] Add Open Graph images for social sharing

## Testing Checklist

Before deploying, test:
- [ ] All navigation links work
- [ ] Mobile menu opens/closes smoothly
- [ ] Forms validate properly
- [ ] Buttons have hover states
- [ ] Text is readable on all screen sizes
- [ ] Images load correctly (when added)
- [ ] No horizontal scroll on mobile
- [ ] Touch targets are at least 44x44px

## Support

Questions? Contact: hello@flipbottles.org

---

Built for SF Hacks 2026 | Last updated: February 13, 2026
