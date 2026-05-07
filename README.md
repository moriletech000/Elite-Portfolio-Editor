# Professional Portfolio Website

A modern, customizable portfolio website with a powerful admin panel. Built with Node.js and Express, featuring 8 professional color themes and complete content management.

## Features

### Portfolio Website
- Responsive hero section with profile image
- About section with skills, experience, and education
- Project showcase with images and descriptions
- Services section with customizable offerings
- Contact information display
- 8 professional dual-color themes

### Admin Panel
- Secure login system
- Profile management (name, bio, image, social links)
- About section editor (description, skills, experience, education)
- Project management (add/delete projects with images)
- Services customization with Font Awesome icons
- Theme selector with 8 professional options
- Password change functionality

## Color Themes

1. **Modern Blue** - Classic professional blue
2. **Elegant Purple** - Creative and sophisticated
3. **Professional Teal** - Fresh and trustworthy
4. **Corporate Gray** - Minimalist and corporate
5. **Warm Orange** - Friendly and approachable
6. **Forest Green** - Natural and balanced
7. **Royal Indigo** - Bold yet professional
8. **Crimson Red** - Confident and powerful

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/moriletech000/professional-portfolio.git
cd professional-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
- Portfolio: `http://localhost:8000`
- Admin Panel: `http://localhost:8000/admin`

## Default Credentials

- **Username:** admin
- **Password:** admin123

**Important:** Change the default password immediately after first login via the Settings tab in the admin panel.

## Project Structure

```
professional-portfolio/
├── admin/              # PHP admin files (legacy)
├── assets/             # CSS stylesheets
│   ├── admin.css      # Admin panel styles
│   └── style.css      # Main portfolio styles
├── includes/           # PHP includes (legacy)
├── uploads/            # User uploaded images
├── server.js           # Main Express server
├── package.json        # Node.js dependencies
└── README.md          # Documentation
```

## Usage

### Accessing the Admin Panel

1. Navigate to `http://localhost:8000/admin`
2. Login with default credentials
3. Use the tabs to manage different sections:
   - **Profile:** Edit personal information and social links
   - **About:** Update description, skills, experience, and education
   - **Works:** Add or remove portfolio projects
   - **Services:** Customize service offerings
   - **Settings:** Change theme and password

### Customizing Content

All content can be managed through the admin panel without touching code. Changes are reflected immediately on the portfolio site.

### Uploading Images

- Profile images and project images can be uploaded through the admin panel
- Supported formats: JPG, PNG, GIF
- Images are stored in the `uploads/` directory

## Technologies Used

- **Backend:** Node.js, Express
- **Session Management:** express-session
- **File Upload:** Multer
- **Frontend:** HTML5, CSS3, JavaScript
- **Icons:** Font Awesome 6
- **Fonts:** Google Fonts (Inter, Playfair Display)

## Security Notes

- Change default admin credentials immediately
- Session-based authentication
- Password validation (minimum 6 characters)
- File upload restrictions
- Input sanitization with HTML escaping

## Customization

### Adding New Themes

Edit the `getThemeColors()` function in `server.js` to add new color schemes:

```javascript
'theme-name': {
    primary: '#color1',
    secondary: '#color2',
    dark: '#color3',
    darker: '#color4',
    light: '#color5',
    accent: '#color6',
    gradient: 'linear-gradient(135deg, #color1 0%, #color2 100%)',
    textGlow: 'none'
}
```

### Modifying Styles

- Main portfolio styles: `assets/style.css`
- Admin panel styles: `assets/admin.css`

## Deployment

### Traditional Hosting

For full functionality with file uploads and persistent sessions, deploy to:
- Heroku
- DigitalOcean
- AWS EC2
- Any VPS with Node.js support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on GitHub.

## Author

Michel Angelo

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Express.js community
