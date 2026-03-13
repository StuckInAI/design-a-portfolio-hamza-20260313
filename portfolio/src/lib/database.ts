import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Project } from '@/entities/Project';
import { Message } from '@/entities/Message';
import { Experience } from '@/entities/Experience';
import path from 'path';

const DB_PATH = process.env.DATABASE_PATH || './portfolio.sqlite';
const resolvedPath = path.isAbsolute(DB_PATH)
  ? DB_PATH
  : path.join(process.cwd(), DB_PATH);

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: resolvedPath,
    entities: [Project, Message, Experience],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();
  await seedDatabase(dataSource);
  return dataSource;
}

async function seedDatabase(ds: DataSource): Promise<void> {
  const projectRepo = ds.getRepository(Project);
  const experienceRepo = ds.getRepository(Experience);

  const projectCount = await projectRepo.count();
  if (projectCount === 0) {
    const projects: Partial<Project>[] = [
      {
        title: 'E-Commerce Platform',
        description:
          'A full-featured e-commerce platform built with Next.js and Stripe integration. Supports product catalog, shopping cart, checkout, and order management with real-time inventory tracking.',
        imageUrl: null,
        techStack: 'Next.js,TypeScript,PostgreSQL,Stripe,Tailwind CSS,Redis',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/ecommerce',
        featured: true,
        sortOrder: 1,
      },
      {
        title: 'Real-Time Chat Application',
        description:
          'A scalable real-time chat application with rooms, direct messaging, file sharing, and presence indicators. Built with WebSockets and featuring end-to-end message encryption.',
        imageUrl: null,
        techStack: 'React,Node.js,Socket.io,MongoDB,Express,JWT',
        liveUrl: 'https://chat.example.com',
        githubUrl: 'https://github.com/example/chat-app',
        featured: true,
        sortOrder: 2,
      },
      {
        title: 'AI Task Manager',
        description:
          'An intelligent task management system that uses machine learning to prioritize tasks, estimate completion times, and suggest optimal work schedules based on user behavior patterns.',
        imageUrl: null,
        techStack: 'Python,FastAPI,React,TensorFlow,PostgreSQL,Docker',
        liveUrl: null,
        githubUrl: 'https://github.com/example/ai-tasks',
        featured: true,
        sortOrder: 3,
      },
      {
        title: 'Developer Portfolio Builder',
        description:
          'A drag-and-drop portfolio builder for developers. Supports custom themes, project showcases, blog integration, and one-click deployment to various hosting platforms.',
        imageUrl: null,
        techStack: 'Next.js,TypeScript,Prisma,SQLite,Tailwind CSS',
        liveUrl: 'https://portfoliobuilder.example.com',
        githubUrl: 'https://github.com/example/portfolio-builder',
        featured: false,
        sortOrder: 4,
      },
    ];

    for (const p of projects) {
      await projectRepo.save(projectRepo.create(p));
    }
  }

  const expCount = await experienceRepo.count();
  if (expCount === 0) {
    const experiences: Partial<Experience>[] = [
      {
        company: 'TechCorp Solutions',
        role: 'Senior Full-Stack Developer',
        description:
          'Led development of microservices architecture serving 2M+ users. Mentored junior developers, conducted code reviews, and established engineering best practices. Reduced API response time by 40% through caching and query optimization.',
        startDate: 'Jan 2022',
        endDate: null,
        sortOrder: 1,
      },
      {
        company: 'Digital Innovations Inc.',
        role: 'Full-Stack Developer',
        description:
          'Developed and maintained multiple client-facing web applications using React and Node.js. Collaborated with design and product teams to deliver features on time. Implemented CI/CD pipelines reducing deployment time by 60%.',
        startDate: 'Mar 2020',
        endDate: 'Dec 2021',
        sortOrder: 2,
      },
      {
        company: 'StartupXYZ',
        role: 'Junior Frontend Developer',
        description:
          'Built responsive web interfaces for a SaaS product from scratch. Worked closely with UX designers to implement pixel-perfect designs. Contributed to component library used across all company products.',
        startDate: 'Jun 2018',
        endDate: 'Feb 2020',
        sortOrder: 3,
      },
      {
        company: 'Freelance',
        role: 'Web Developer',
        description:
          'Delivered custom web solutions for small businesses and individuals. Projects included e-commerce stores, portfolio sites, and custom CMS implementations. Built lasting client relationships through quality work and communication.',
        startDate: 'Jan 2017',
        endDate: 'May 2018',
        sortOrder: 4,
      },
    ];

    for (const e of experiences) {
      await experienceRepo.save(experienceRepo.create(e));
    }
  }
}
