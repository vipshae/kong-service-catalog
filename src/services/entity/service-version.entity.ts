import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_versions')
export class ServiceVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version: string;

  @Column()
  description: string;

  @ManyToOne(() => Service, (service) => service.versions, {
    onDelete: 'CASCADE', // If a service is deleted, its versions will also be deleted
  })
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
}
