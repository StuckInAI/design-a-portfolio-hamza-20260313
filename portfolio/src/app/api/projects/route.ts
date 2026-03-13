import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Project } from '@/entities/Project';

export async function GET() {
  try {
    const ds = await getDataSource();
    const projectRepo = ds.getRepository(Project);
    const projects = await projectRepo.find({
      order: { sortOrder: 'ASC', createdAt: 'ASC' },
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
