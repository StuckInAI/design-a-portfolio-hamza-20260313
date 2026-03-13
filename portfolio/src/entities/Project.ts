import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl!: string | null;

  @Column({ type: 'varchar' })
  techStack!: string;

  @Column({ type: 'varchar', nullable: true })
  liveUrl!: string | null;

  @Column({ type: 'varchar', nullable: true })
  githubUrl!: string | null;

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @Column({ type: 'integer', default: 0 })
  sortOrder!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
