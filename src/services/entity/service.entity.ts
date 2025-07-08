import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { ServiceVersion } from './service-version.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => ServiceVersion, (version) => version.service, {
    cascade: true,
  })
  versions: ServiceVersion[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
}
