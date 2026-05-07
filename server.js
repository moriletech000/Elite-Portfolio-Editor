const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Serve static files
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));

// Portfolio data
let portfolio = {
    adminUser: 'admin',
    adminPass: 'admin123',
    theme: 'modern-blue', // modern-blue, elegant-purple, professional-teal, corporate-gray, warm-orange, forest-green, royal-indigo, crimson-red
    profile: {
        name: 'Michel Angelo',
        title: 'Full Stack Developer',
        bio: 'I am a passionate developer with 5+ years of experience building web applications.',
        email: 'michel@example.com',
        phone: '+1 234 567 8900',
        location: 'New York, USA',
        profileImage: '',
        social: {
            github: 'https://github.com/michelangelo',
            linkedin: 'https://linkedin.com/in/michelangelo',
            twitter: 'https://twitter.com/michelangelo'
        }
    },
    about: {
        description: 'I specialize in creating elegant solutions to complex problems. With expertise in modern web technologies, I help businesses build scalable applications.',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL'],
        experience: [
            { year: '2021-Present', title: 'Senior Developer', company: 'Tech Corp' },
            { year: '2019-2021', title: 'Full Stack Developer', company: 'StartupXYZ' }
        ],
        education: [
            { year: '2015-2019', degree: 'BS Computer Science', school: 'University Name' }
        ]
    },
    works: [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'A full-featured online shopping platform with payment integration',
            image: '',
            link: 'https://example.com',
            tags: ['React', 'Node.js', 'MongoDB']
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Collaborative task management tool for teams',
            image: '',
            link: 'https://example.com',
            tags: ['Vue.js', 'Firebase']
        }
    ],
    services: [
        { icon: 'fas fa-code', title: 'Web Development', description: 'Building responsive and modern web applications' },
        { icon: 'fas fa-mobile-alt', title: 'Mobile Apps', description: 'Creating cross-platform mobile applications' },
        { icon: 'fas fa-paint-brush', title: 'UI/UX Design', description: 'Designing beautiful and intuitive interfaces' }
    ],
    testimonials: [
        { name: 'Client Name', company: 'Company Inc', text: 'Great work! Highly recommended.' }
    ]
};

// Helper function to get theme colors
function getThemeColors(theme) {
    const themes = {
        'modern-blue': {
            primary: '#2563eb',
            secondary: '#3b82f6',
            dark: '#0f172a',
            darker: '#020617',
            light: '#1e293b',
            accent: '#60a5fa',
            gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            textGlow: 'none'
        },
        'elegant-purple': {
            primary: '#7c3aed',
            secondary: '#a78bfa',
            dark: '#1e1b4b',
            darker: '#0f0d2e',
            light: '#312e81',
            accent: '#c4b5fd',
            gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
            textGlow: 'none'
        },
        'professional-teal': {
            primary: '#0d9488',
            secondary: '#14b8a6',
            dark: '#042f2e',
            darker: '#000000',
            light: '#134e4a',
            accent: '#5eead4',
            gradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
            textGlow: 'none'
        },
        'corporate-gray': {
            primary: '#475569',
            secondary: '#64748b',
            dark: '#0f172a',
            darker: '#020617',
            light: '#1e293b',
            accent: '#94a3b8',
            gradient: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
            textGlow: 'none'
        },
        'warm-orange': {
            primary: '#ea580c',
            secondary: '#fb923c',
            dark: '#1c1917',
            darker: '#0c0a09',
            light: '#292524',
            accent: '#fdba74',
            gradient: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)',
            textGlow: 'none'
        },
        'forest-green': {
            primary: '#16a34a',
            secondary: '#22c55e',
            dark: '#052e16',
            darker: '#000000',
            light: '#14532d',
            accent: '#86efac',
            gradient: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
            textGlow: 'none'
        },
        'royal-indigo': {
            primary: '#4f46e5',
            secondary: '#6366f1',
            dark: '#1e1b4b',
            darker: '#0f0d2e',
            light: '#312e81',
            accent: '#a5b4fc',
            gradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
            textGlow: 'none'
        },
        'crimson-red': {
            primary: '#dc2626',
            secondary: '#ef4444',
            dark: '#1c0a0a',
            darker: '#000000',
            light: '#2d1414',
            accent: '#fca5a5',
            gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            textGlow: 'none'
        }
    };
    return themes[theme] || themes['modern-blue'];
}

// Helper function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

// Home page - Portfolio
app.get('/', (req, res) => {
    const p = portfolio.profile;
    const a = portfolio.about;
    const colors = getThemeColors(portfolio.theme);
    
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(p.name)} - Portfolio</title>
    <link rel="stylesheet" href="/assets/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: ${colors.primary};
            --secondary: ${colors.secondary};
            --dark: ${colors.dark};
            --darker: ${colors.darker};
            --light: ${colors.light};
            --accent: ${colors.accent};
        }
    </style>
</head>
<body>

<nav>
    <a class="logo" href="#">${escapeHtml(p.name)}</a>
    <div>
        <a href="#about">About</a>
        <a href="#works">Works</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </div>
</nav>

<!-- HERO -->
<section class="hero">
    ${p.profileImage ? `<img src="${escapeHtml(p.profileImage)}" alt="Profile" class="profile-img">` : ''}
    <h1>${escapeHtml(p.name)}</h1>
    <p class="title">${escapeHtml(p.title)}</p>
    <p class="bio">${escapeHtml(p.bio)}</p>
    <div class="social-links">
        ${p.social.github ? `<a href="${escapeHtml(p.social.github)}" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
        ${p.social.linkedin ? `<a href="${escapeHtml(p.social.linkedin)}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
        ${p.social.twitter ? `<a href="${escapeHtml(p.social.twitter)}" target="_blank"><i class="fab fa-twitter"></i> Twitter</a>` : ''}
    </div>
</section>

<!-- ABOUT -->
<section class="about-section" id="about">
    <div class="about-content">
        <h2>About Me</h2>
        <p class="section-subtitle">${escapeHtml(a.description)}</p>
        
        <h3 style="text-align:center;margin:2rem 0 1rem;font-size:1.5rem;color:#ffffff;">Skills & Technologies</h3>
        <div class="skills-grid">
            ${a.skills.map(skill => `<span class="skill-tag">${escapeHtml(skill)}</span>`).join('')}
        </div>
        
        <div class="experience-education">
            <div class="exp-edu-card">
                <h3><i class="fas fa-briefcase"></i> Experience</h3>
                ${a.experience.map(exp => `
                    <div class="exp-item">
                        <strong>${escapeHtml(exp.title)}</strong><br>
                        <span style="color:#64748b;">${escapeHtml(exp.company)}</span><br>
                        <small><i class="far fa-calendar"></i> ${escapeHtml(exp.year)}</small>
                    </div>
                `).join('')}
            </div>
            <div class="exp-edu-card">
                <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                ${a.education.map(edu => `
                    <div class="exp-item">
                        <strong>${escapeHtml(edu.degree)}</strong><br>
                        <span style="color:#64748b;">${escapeHtml(edu.school)}</span><br>
                        <small><i class="far fa-calendar"></i> ${escapeHtml(edu.year)}</small>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
</section>

<!-- WORKS -->
<section class="works-section" id="works">
    <h2>My Works</h2>
    <p class="section-subtitle">Here are some of my recent projects and accomplishments</p>
    <div class="works-grid">
        ${portfolio.works.map(work => `
        <div class="work-card">
            ${work.image ? `<img src="${escapeHtml(work.image)}" alt="${escapeHtml(work.title)}" class="work-image">` : '<div class="work-image"><i class="fas fa-image"></i></div>'}
            <div class="work-content">
                <h3>${escapeHtml(work.title)}</h3>
                <p>${escapeHtml(work.description)}</p>
                <div class="work-tags">
                    ${work.tags.map(tag => `<span class="work-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
                ${work.link ? `<a href="${escapeHtml(work.link)}" target="_blank" class="work-link"><span>View Project</span> <i class="fas fa-arrow-right"></i></a>` : ''}
            </div>
        </div>
        `).join('')}
    </div>
</section>

<!-- SERVICES -->
<section class="services-section" id="services">
    <h2>Services</h2>
    <p class="section-subtitle">What I can do for you</p>
    <div class="services-grid">
        ${portfolio.services.map(service => `
        <div class="service-card">
            <div class="service-icon"><i class="${service.icon}"></i></div>
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.description)}</p>
        </div>
        `).join('')}
    </div>
</section>

<!-- CONTACT -->
<section class="contact-section" id="contact">
    <h2>Get in Touch</h2>
    <p class="section-subtitle">Feel free to reach out for collaborations or just a friendly hello</p>
    <div class="contact-info">
        <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>
        </div>
        ${p.phone ? `<div class="contact-item"><i class="fas fa-phone"></i><span>${escapeHtml(p.phone)}</span></div>` : ''}
        ${p.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i><span>${escapeHtml(p.location)}</span></div>` : ''}
    </div>
</section>

<footer>
    <p>© 2026 ${escapeHtml(p.name)}. All rights reserved.</p>
</footer>

</body>
</html>`);
});

// Admin login page
app.get('/admin', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/admin/dashboard');
    }
    
    const error = req.query.error ? '<p class="error">Invalid credentials</p>' : '';
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link rel="stylesheet" href="/assets/admin.css">
    <style>
        .login-container {
            max-width: 400px;
            margin: 100px auto;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .login-container h1 { margin-bottom: 1.5rem; text-align: center; }
        .error { color: #e74c3c; text-align: center; }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Admin Login</h1>
        ${error}
        <form method="POST" action="/admin/login">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <button type="submit" class="save-btn">Login</button>
        </form>
    </div>
</body>
</html>`);
});

// Admin login handler
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === portfolio.adminUser && password === portfolio.adminPass) {
        req.session.loggedIn = true;
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/admin?error=1');
    }
});

// Admin dashboard
app.get('/admin/dashboard', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/admin');
    }
    
    let message = '';
    if (req.query.success === '1') {
        message = '<p class="success">Changes saved successfully!</p>';
    } else if (req.query.success === 'password') {
        message = '<p class="success">Password changed successfully!</p>';
    } else if (req.query.error === 'current') {
        message = '<p class="error">Current password is incorrect!</p>';
    } else if (req.query.error === 'match') {
        message = '<p class="error">New passwords do not match!</p>';
    } else if (req.query.error === 'length') {
        message = '<p class="error">Password must be at least 6 characters!</p>';
    }
    
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="/assets/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .tab-buttons { display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 2px solid #e9ecef; }
        .tab-btn { padding: 1rem 2rem; background: none; border: none; cursor: pointer; font-size: 1rem; border-bottom: 3px solid transparent; }
        .tab-btn.active { border-bottom-color: #007bff; color: #007bff; font-weight: bold; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .work-item { background: #f8f9fa; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; }
        .work-item img { max-width: 200px; height: auto; border-radius: 4px; }
        .btn-delete { background: #dc3545; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
        .btn-delete:hover { background: #c82333; }
        .error { background: #fee; color: #c00; padding: 1rem; border-radius: 8px; border-left: 4px solid #c00; margin-bottom: 1rem; }
    </style>
</head>
<body>

<div class="admin-layout">
    <aside class="sidebar">
        <span class="brand">⚙ Admin</span>
        <a href="/admin/dashboard" class="active">Dashboard</a>
        <a href="/" target="_blank">View Portfolio</a>
        <a href="/admin/logout">Logout</a>
    </aside>

    <main class="main-content">
        <h1 class="page-title">Portfolio Dashboard</h1>
        ${message}

        <div class="tab-buttons">
            <button class="tab-btn active" onclick="showTab('profile')">Profile</button>
            <button class="tab-btn" onclick="showTab('about')">About</button>
            <button class="tab-btn" onclick="showTab('works')">Works</button>
            <button class="tab-btn" onclick="showTab('services')">Services</button>
            <button class="tab-btn" onclick="showTab('settings')">Settings</button>
        </div>

        <!-- PROFILE TAB -->
        <div id="profile" class="tab-content active">
            <h2>Profile Information</h2>
            <form method="POST" action="/admin/update-profile" enctype="multipart/form-data">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value="${escapeHtml(portfolio.profile.name)}" required>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value="${escapeHtml(portfolio.profile.title)}" required>
                </div>
                <div class="form-group">
                    <label>Bio</label>
                    <textarea name="bio" rows="3">${escapeHtml(portfolio.profile.bio)}</textarea>
                </div>
                <div class="form-group">
                    <label>Profile Image</label>
                    ${portfolio.profile.profileImage ? `<img src="${escapeHtml(portfolio.profile.profileImage)}" style="max-width:150px;display:block;margin:0.5rem 0;border-radius:50%;">` : ''}
                    <input type="file" name="profileImage" accept="image/*">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value="${escapeHtml(portfolio.profile.email)}">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" value="${escapeHtml(portfolio.profile.phone)}">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value="${escapeHtml(portfolio.profile.location)}">
                </div>
                <div class="form-group">
                    <label>GitHub URL</label>
                    <input type="url" name="github" value="${escapeHtml(portfolio.profile.social.github)}">
                </div>
                <div class="form-group">
                    <label>LinkedIn URL</label>
                    <input type="url" name="linkedin" value="${escapeHtml(portfolio.profile.social.linkedin)}">
                </div>
                <div class="form-group">
                    <label>Twitter URL</label>
                    <input type="url" name="twitter" value="${escapeHtml(portfolio.profile.social.twitter)}">
                </div>
                <button type="submit" class="save-btn">Save Profile</button>
            </form>
        </div>

        <!-- ABOUT TAB -->
        <div id="about" class="tab-content">
            <h2>About Section</h2>
            <form method="POST" action="/admin/update-about">
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description" rows="4">${escapeHtml(portfolio.about.description)}</textarea>
                </div>
                <div class="form-group">
                    <label>Skills (comma separated)</label>
                    <input type="text" name="skills" value="${portfolio.about.skills.join(', ')}">
                </div>
                
                <h3 style="margin-top:2rem;margin-bottom:1rem;"><i class="fas fa-briefcase"></i> Experience</h3>
                ${portfolio.about.experience.map((exp, idx) => `
                    <div style="background:#f8f9fa;padding:1rem;margin-bottom:1rem;border-radius:8px;">
                        <div class="form-group">
                            <label>Job Title</label>
                            <input type="text" name="exp_title_${idx}" value="${escapeHtml(exp.title)}" required>
                        </div>
                        <div class="form-group">
                            <label>Company</label>
                            <input type="text" name="exp_company_${idx}" value="${escapeHtml(exp.company)}" required>
                        </div>
                        <div class="form-group">
                            <label>Year/Period</label>
                            <input type="text" name="exp_year_${idx}" value="${escapeHtml(exp.year)}" placeholder="2021-Present" required>
                        </div>
                    </div>
                `).join('')}
                
                <h3 style="margin-top:2rem;margin-bottom:1rem;"><i class="fas fa-graduation-cap"></i> Education</h3>
                ${portfolio.about.education.map((edu, idx) => `
                    <div style="background:#f8f9fa;padding:1rem;margin-bottom:1rem;border-radius:8px;">
                        <div class="form-group">
                            <label>Degree</label>
                            <input type="text" name="edu_degree_${idx}" value="${escapeHtml(edu.degree)}" required>
                        </div>
                        <div class="form-group">
                            <label>School/University</label>
                            <input type="text" name="edu_school_${idx}" value="${escapeHtml(edu.school)}" required>
                        </div>
                        <div class="form-group">
                            <label>Year/Period</label>
                            <input type="text" name="edu_year_${idx}" value="${escapeHtml(edu.year)}" placeholder="2015-2019" required>
                        </div>
                    </div>
                `).join('')}
                
                <button type="submit" class="save-btn">Save About</button>
            </form>
        </div>

        <!-- WORKS TAB -->
        <div id="works" class="tab-content">
            <h2>Portfolio Works</h2>
            
            <h3>Add New Work</h3>
            <form method="POST" action="/admin/add-work" enctype="multipart/form-data">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" name="title" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label>Project Image</label>
                    <input type="file" name="workImage" accept="image/*">
                </div>
                <div class="form-group">
                    <label>Project Link</label>
                    <input type="url" name="link">
                </div>
                <div class="form-group">
                    <label>Tags (comma separated)</label>
                    <input type="text" name="tags" placeholder="React, Node.js, MongoDB">
                </div>
                <button type="submit" class="save-btn">Add Work</button>
            </form>

            <h3 style="margin-top:3rem;">Existing Works</h3>
            ${portfolio.works.map(work => `
                <div class="work-item">
                    ${work.image ? `<img src="${escapeHtml(work.image)}" alt="${escapeHtml(work.title)}">` : ''}
                    <h4>${escapeHtml(work.title)}</h4>
                    <p>${escapeHtml(work.description)}</p>
                    <p><strong>Tags:</strong> ${work.tags.join(', ')}</p>
                    ${work.link ? `<p><strong>Link:</strong> <a href="${escapeHtml(work.link)}" target="_blank">${escapeHtml(work.link)}</a></p>` : ''}
                    <form method="POST" action="/admin/delete-work" style="display:inline;">
                        <input type="hidden" name="workId" value="${work.id}">
                        <button type="submit" class="btn-delete" onclick="return confirm('Delete this work?')">Delete</button>
                    </form>
                </div>
            `).join('')}
        </div>

        <!-- SERVICES TAB -->
        <div id="services" class="tab-content">
            <h2>Services</h2>
            <p style="color:#64748b;margin-bottom:1.5rem;">Use Font Awesome icon classes (e.g., "fas fa-code", "fas fa-mobile-alt", "fas fa-paint-brush"). <a href="https://fontawesome.com/icons" target="_blank">Browse icons here</a></p>
            <form method="POST" action="/admin/update-services">
                ${portfolio.services.map((service, idx) => `
                    <div style="background:#f8f9fa;padding:1rem;margin-bottom:1rem;border-radius:8px;">
                        <div class="form-group">
                            <label>Service ${idx + 1} - Icon (Font Awesome class)</label>
                            <input type="text" name="service_icon_${idx}" value="${escapeHtml(service.icon)}" placeholder="fas fa-code">
                            <small style="color:#64748b;">Preview: <i class="${service.icon}" style="font-size:1.5rem;color:#2563eb;margin-left:0.5rem;"></i></small>
                        </div>
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" name="service_title_${idx}" value="${escapeHtml(service.title)}">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="service_desc_${idx}" rows="2">${escapeHtml(service.description)}</textarea>
                        </div>
                    </div>
                `).join('')}
                <button type="submit" class="save-btn">Save Services</button>
            </form>
        </div>

        <!-- SETTINGS TAB -->
        <div id="settings" class="tab-content">
            <h2>Settings</h2>
            
            <!-- Theme Selection -->
            <div style="background:#fff;padding:2rem;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.06);margin-bottom:2rem;">
                <h3 style="margin-bottom:1.5rem;"><i class="fas fa-palette"></i> Color Theme</h3>
                <p style="color:#64748b;margin-bottom:1.5rem;">Choose a professional dual-color scheme for your portfolio</p>
                <form method="POST" action="/admin/update-theme">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;margin-bottom:1.5rem;">
                        ${[
                            {id: 'modern-blue', name: 'Modern Blue', colors: ['#2563eb', '#3b82f6']},
                            {id: 'elegant-purple', name: 'Elegant Purple', colors: ['#7c3aed', '#a78bfa']},
                            {id: 'professional-teal', name: 'Professional Teal', colors: ['#0d9488', '#14b8a6']},
                            {id: 'corporate-gray', name: 'Corporate Gray', colors: ['#475569', '#64748b']},
                            {id: 'warm-orange', name: 'Warm Orange', colors: ['#ea580c', '#fb923c']},
                            {id: 'forest-green', name: 'Forest Green', colors: ['#16a34a', '#22c55e']},
                            {id: 'royal-indigo', name: 'Royal Indigo', colors: ['#4f46e5', '#6366f1']},
                            {id: 'crimson-red', name: 'Crimson Red', colors: ['#dc2626', '#ef4444']}
                        ].map(theme => `
                            <label style="cursor:pointer;padding:1.25rem;border:2px solid ${portfolio.theme === theme.id ? '#007bff' : '#e5e7eb'};border-radius:12px;transition:all 0.3s;background:${portfolio.theme === theme.id ? '#f0f9ff' : '#fff'};">
                                <input type="radio" name="theme" value="${theme.id}" ${portfolio.theme === theme.id ? 'checked' : ''} style="margin-right:0.5rem;">
                                <div style="display:flex;align-items:center;gap:0.75rem;margin-top:0.75rem;">
                                    <div style="width:50px;height:50px;background:linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]});border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.15);"></div>
                                    <div>
                                        <strong style="display:block;font-size:1.05rem;margin-bottom:0.25rem;">${theme.name}</strong>
                                        <small style="color:#64748b;font-size:0.85rem;">Professional & Clean</small>
                                    </div>
                                </div>
                            </label>
                        `).join('')}
                    </div>
                    <button type="submit" class="save-btn">Apply Theme</button>
                </form>
            </div>

            <!-- Change Password -->
            <div style="background:#fff;padding:2rem;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
                <h3 style="margin-bottom:1.5rem;"><i class="fas fa-lock"></i> Change Password</h3>
                <form method="POST" action="/admin/change-password">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" name="currentPassword" required>
                    </div>
                    <div class="form-group">
                        <label>New Password</label>
                        <input type="password" name="newPassword" required minlength="6">
                        <small style="color:#64748b;">Minimum 6 characters</small>
                    </div>
                    <div class="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" name="confirmPassword" required minlength="6">
                    </div>
                    <button type="submit" class="save-btn">Change Password</button>
                </form>
            </div>
        </div>
    </main>
</div>

<script>
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}
</script>

</body>
</html>`);
});

// Update profile
app.post('/admin/update-profile', upload.single('profileImage'), (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/admin');
    
    portfolio.profile.name = req.body.name;
    portfolio.profile.title = req.body.title;
    portfolio.profile.bio = req.body.bio;
    portfolio.profile.email = req.body.email;
    portfolio.profile.phone = req.body.phone;
    portfolio.profile.location = req.body.location;
    portfolio.profile.social.github = req.body.github;
    portfolio.profile.social.linkedin = req.body.linkedin;
    portfolio.profile.social.twitter = req.body.twitter;
    
    if (req.file) {
        portfolio.profile.profileImage = '/uploads/' + req.file.filename;
    }
    
    res.redirect('/admin/dashboard?success=1');
});

// Update about
app.post('/admin/update-about', (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/admin');
    
    portfolio.about.description = req.body.description;
    portfolio.about.skills = req.body.skills.split(',').map(s => s.trim()).filter(s => s);
    
    // Update experience
    portfolio.about.experience = portfolio.about.experience.map((exp, idx) => ({
        title: req.body[`exp_title_${idx}`] || exp.title,
        company: req.body[`exp_company_${idx}`] || exp.company,
        year: req.body[`exp_year_${idx}`] || exp.year
    }));
    
    // Update education
    portfolio.about.education = portfolio.about.education.map((edu, idx) => ({
        degree: req.body[`edu_degree_${idx}`] || edu.degree,
        school: req.body[`edu_school_${idx}`] || edu.school,
        year: req.body[`edu_year_${idx}`] || edu.year
    }));
    
    res.redirect('/admin/dashboard?success=1');
});

// Add work
app.post('/admin/add-work', upload.single('workImage'), (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/admin');
    
    const newWork = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        image: req.file ? '/uploads/' + req.file.filename : '',
        link: req.body.link,
        tags: req.body.tags ? req.body.tags.split(',').map(t => t.trim()).filter(t => t) : []
    };
    
    portfolio.works.push(newWork);
    res.redirect('/admin/dashboard?success=1');
});

// Delete work
app.post('/admin/delete-work', (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/admin');
    
    const workId = parseInt(req.body.workId);
    portfolio.works = portfolio.works.filter(w => w.id !== workId);
    
    res.redirect('/admin/dashboard?success=1');
});

// Update services
app.post('/admin/update-services', (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/admin');
    
    portfolio.services = portfolio.services.map((service, idx) => ({
        icon: req.body[`service_icon_${idx}`] || service.icon,
        title: req.body[`service_title_${idx}`] || service.title,
        description: req.body[`service_desc_${idx}`] || service.description
    }));
    
    res.redirect('/admin/dashboard?success=1');
});

// Update theme
app.post('/admin/update-theme', (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/admin');
    
    const validThemes = ['modern-blue', 'elegant-purple', 'professional-teal', 'corporate-gray', 'warm-orange', 'forest-green', 'royal-indigo', 'crimson-red'];
    if (validThemes.includes(req.body.theme)) {
        portfolio.theme = req.body.theme;
    }
    
    res.redirect('/admin/dashboard?success=1');
});

// Change password
app.post('/admin/change-password', (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/admin');
    
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    // Verify current password
    if (currentPassword !== portfolio.adminPass) {
        return res.redirect('/admin/dashboard?error=current');
    }
    
    // Check if new passwords match
    if (newPassword !== confirmPassword) {
        return res.redirect('/admin/dashboard?error=match');
    }
    
    // Check password length
    if (newPassword.length < 6) {
        return res.redirect('/admin/dashboard?error=length');
    }
    
    // Update password
    portfolio.adminPass = newPassword;
    res.redirect('/admin/dashboard?success=password');
});

// Logout
app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin');
});

app.listen(PORT, () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log(`Default credentials - Username: admin, Password: admin123`);
});

// Export for Vercel serverless
module.exports = app;
