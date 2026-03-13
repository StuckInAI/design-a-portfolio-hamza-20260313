import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  company!: string;

  @Column({ type: 'varchar' })
  role!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar' })
  startDate!: string;

  @Column({ type: 'varchar', nullable: true })
  endDate!: string | null;

  @Column({ type: 'integer', default: 0 })
  sortOrder!: number;
}
