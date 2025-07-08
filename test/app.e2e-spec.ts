/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(200);
    expect(response.body?.message).toBe('Kong Service Catalog API is running!');
  });

  describe('/GET /services', () => {
    it('should throw validation error for invalid query parameters', async () => {
      const response = await request(app.getHttpServer()).get('/services?sortBy=invalid&sortOrder=invalid').expect(400);

      expect(response.body.message).toContain('sortBy must be one of the following values: name, created_at, updated_at');
      expect(response.body.message).toContain('sortOrder must be one of the following values: ASC, DESC, asc, desc');
    });

    it('should return all services without query parameters', async () => {
      const response = await request(app.getHttpServer()).get('/services').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(5); // Default limit is 5
    });

    it('should return paginated list of services', async () => {
      const response = await request(app.getHttpServer()).get('/services?page=1&limit=2').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(2);
    });

    it('should filter by name', async () => {
      const response = await request(app.getHttpServer()).get('/services?name=admin').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      for (const service of response.body) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        expect(service.name.toLowerCase()).toContain('admin');
      }
    });
  });

  describe('/GET /services/:id', () => {
    it('should return a service by ID', async () => {
      const response = await request(app.getHttpServer()).get('/services/1').expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe('1');
      expect(response.body).toHaveProperty('versions');
      expect(Array.isArray(response.body.versions)).toBe(true);
    });

    it('should return 404 for non-existent service ID', async () => {
      await request(app.getHttpServer()).get('/services/9999').expect(404);
    });
  });

  describe('/GET /services/:id/versions', () => {
    it('should return versions of a service by ID', async () => {
      const response = await request(app.getHttpServer()).get('/services/1/versions').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      for (const version of response.body) {
        expect(version).toHaveProperty('id');
        expect(version).toHaveProperty('version');
        expect(version.serviceId).toBe('1');
      }
    });

    it('should return 404 for non-existent service ID', async () => {
      await request(app.getHttpServer()).get('/services/9999/versions').expect(404);
    });
  });
});
