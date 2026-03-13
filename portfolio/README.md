# Developer Portfolio

A modern, full-stack developer portfolio built with Next.js, TypeScript, Tailwind CSS, and SQLite via TypeORM.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Full-stack Next.js with App Router
- 🗃️ SQLite database with TypeORM (auto-seeded)
- 📱 Mobile-friendly with smooth scroll navigation
- 🚀 Docker-ready for easy deployment
- ✉️ Contact form with validation
- 🎯 Projects showcase fetched from API
- 📅 Work experience timeline

## Sections

- **Hero** – Name, title, and CTA buttons
- **About** – Bio and statistics
- **Skills** – Skill bars and technology badges
- **Projects** – Cards with tech stack and links (API-driven)
- **Experience** – Vertical timeline (API-driven)
- **Contact** – Form with validation and API submission

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The application will be available at http://localhost:3000

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_PATH` | `./portfolio.sqlite` | Path to SQLite database file |
| `NEXT_PUBLIC_SITE_TITLE` | `My Portfolio` | Browser tab title |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | `Developer Portfolio Website` | Meta description |

## API Endpoints

- `GET /api/projects` – List all projects
- `GET /api/experiences` – List all work experiences
- `POST /api/messages` – Submit contact form message

## Project Structure

```
portfolio/
├── src/
│   ├── app/          # Next.js App Router
│   │   ├── api/      # API routes
│   │   └── ...       # Pages and layout
│   ├── components/   # React components
│   ├── entities/     # TypeORM entities
│   └── lib/          # Database connection
├── public/           # Static assets
├── Dockerfile
└── docker-compose.yml
```
