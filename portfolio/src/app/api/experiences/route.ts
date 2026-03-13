import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Experience } from '@/entities/Experience';

export async function GET() {
  try {
    const ds = await getDataSource();
    const expRepo = ds.getRepository(Experience);
    const experiences = await expRepo.find({
      order: { sortOrder: 'ASC' },
    });
    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}
