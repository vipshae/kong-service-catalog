import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ServicesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5433,
      username: 'konguser',
      password: 'kongpassword',
      database: 'kongdb',
      autoLoadEntities: true,
      synchronize: false, // Set to false as migrations are managed manually
    }),
  ],
})
export class AppModule {}
