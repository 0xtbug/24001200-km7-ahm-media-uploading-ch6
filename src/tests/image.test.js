const request = require('supertest');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const { startServer, stopServer } = require('./testServer');

const app = require('../../app');
const prisma = new PrismaClient();

describe('Image Tests', () => {
  let createdImageId;
  const testImagePath = path.join(__dirname, 'test.jpg');
  
  beforeAll(async () => {
    if (!fs.existsSync(testImagePath)) {
      fs.writeFileSync(testImagePath, 'fake-image-content');
    }
    await prisma.$connect();
    startServer();
  });

  afterAll(async () => {
    if (createdImageId) {
      await prisma.image.deleteMany({});
    }
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
    await prisma.$disconnect();
    await stopServer();
  });

  describe('POST /images', () => {
    it('should create a new image', async () => {
      const response = await request(app)
        .post('/images')
        .attach('image', testImagePath)
        .field('title', 'Test Image')
        .field('description', 'Test Description')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      createdImageId = response.body.data.id;
    });

    it('should fail when image is not provided', async () => {
      const response = await request(app)
        .post('/images')
        .field('title', 'Test Image')
        .field('description', 'Test Description')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBe('Image is required');
    });

    it('should fail when title already exists', async () => {
      const response = await request(app)
        .post('/images')
        .attach('image', testImagePath)
        .field('title', 'Test Image')
        .field('description', 'Test Description')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe(false);
    });
  });

  describe('GET /images', () => {
    it('should get all images', async () => {
      const response = await request(app)
        .get('/images')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /images/:id', () => {
    it('should get image by id', async () => {
      if (!createdImageId) {
        console.log('Skipping test: No image created');
        return;
      }

      const response = await request(app)
        .get(`/images/${createdImageId}`)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.data.id).toBe(createdImageId);
    });

    it('should return 404 for non-existent image', async () => {
      const response = await request(app)
        .get('/images/99999')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(404);
      expect(response.body.status).toBe(false);
    });
  });

  describe('PUT /images/:id', () => {
    it('should update image details', async () => {
      if (!createdImageId) {
        console.log('Skipping test: No image created');
        return;
      }

      const response = await request(app)
        .put(`/images/${createdImageId}`)
        .field('title', 'Updated Test Image')
        .field('description', 'Updated Test Description')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.data.title).toBe('Updated Test Image');
    });

    it('should fail when updating non-existent image', async () => {
      const response = await request(app)
        .put('/images/99999')
        .field('title', 'Updated Test Image')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(404);
      expect(response.body.status).toBe(false);
    });
  });

  describe('DELETE /images/:id', () => {
    it('should delete an image', async () => {
      if (!createdImageId) {
        console.log('Skipping test: No image created');
        return;
      }

      const response = await request(app)
        .delete(`/images/${createdImageId}`)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
    });

    it('should fail when deleting non-existent image', async () => {
      const response = await request(app)
        .delete('/images/99999')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(404);
      expect(response.body.status).toBe(false);
    });
  });
});