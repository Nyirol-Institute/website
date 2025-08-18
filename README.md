# Nyirol Institute of Innovation and Technology

This repository contains the website and backend system for the Nyirol Institute of Innovation and Technology, a non-profit higher educational organization helping South Sudanese youth in Nyirol County break into the tech world.

## Project Overview

The Nyirol Institute of Innovation and Technology provides education and training to help South Sudanese youth break the cycle of poverty and build careers in the tech industry. The institute offers a comprehensive educational pathway:

1. **Digital Literacy** (3 months): Foundation in computer basics, internet skills, and office applications
2. **Tech Specialization** (6 months): Advanced training in areas like Graphic Design, UX/UI, Frontend/Backend Development, Data Science, Data Analytics, and Animation
3. **Job Placement**: Connecting graduates with employment and internship opportunities
4. **University Pathway** (8 months): Preparation for higher education through partner universities

The institute uses solar power to ensure reliable access to technology even in areas with limited electricity.

## Repository Structure

This repository is organized into two main components:

1. **Frontend**: Static website built with HTML, CSS, and JavaScript
2. **Backend**: Node.js/Express application with MySQL database for the admin dashboard and application system

```├── Files Structure

├── READMEmd               # Project description and setup instructions
├── index.html              # Main website homepage
├── about.html              # About page
├── programs.html           # Programs page
├── donate.html             # Donation page
├── volunteer.html          # Volunteer page
├── contact.html            # Contact page
├── css/                    # CSS stylesheets
├── js/                     # JavaScript files
├── images/                 # Image assets
└── backend/                # Backend application
    ├── src/                # Source code
    ├── views/              # Admin dashboard views
    ├── public/             # Static assets for admin
    ├── database/           # Database scripts
    └── README.md           # Backend documentation
```

## Frontend

The frontend is a responsive website built with HTML, CSS, and JavaScript. It includes the following pages:

- **Home**: Introduction to the institute and its mission
- **About**: Detailed information about the institute's history, team, and impact
- **Programs**: Information about the educational pathways offered
- **Donate**: Page for accepting donations to support the institute
- **Volunteer**: Information for those interested in volunteering
- **Contact**: Contact form and information

## Backend

The backend provides:

1. **Admin Dashboard**: For managing applications, students, programs, donations, and volunteers
2. **API Endpoints**: For handling form submissions from the website
3. **Application System**: With deadline checking functionality
4. **Database**: MySQL database for storing all institute data

For more details on the backend, see the [backend README](backend/README.md).

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)

### Frontend Setup

The frontend is static HTML/CSS/JS and can be served from any web server. For local development:

```bash
# Start a simple HTTP server
python -m http.server 8000
```

Then visit http://localhost:8000 in your browser.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your environment variables.

4. Initialize the database:
   ```bash
   ./init-db.sh
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

The admin dashboard will be available at http://localhost:5000/admin

Default admin credentials:
- Email: admin@nyirolinstitute.org
- Password: Admin123!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.