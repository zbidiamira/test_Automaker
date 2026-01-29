import request from 'supertest';
import createTestApp from './testApp.js';

const app = createTestApp();

describe('Animals API', () => {
  let authToken;
  let userId;

  // Create a user and get auth token before tests
  beforeEach(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Pet',
        lastName: 'Owner',
        email: 'petowner@example.com',
        password: 'password123',
      });
    
    authToken = res.body.token;
    userId = res.body.user._id;
  });

  const testAnimal = {
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 30,
    gender: 'Male',
  };

  describe('POST /api/animals', () => {
    it('should create a new animal', async () => {
      const res = await request(app)
        .post('/api/animals')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testAnimal);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(testAnimal.name);
      expect(res.body.data.species).toBe(testAnimal.species);
      expect(res.body.data.owner).toBeDefined();
    });

    it('should not create animal without auth', async () => {
      const res = await request(app)
        .post('/api/animals')
        .send(testAnimal);

      expect(res.status).toBe(401);
    });

    it('should not create animal without required fields', async () => {
      const res = await request(app)
        .post('/api/animals')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should validate species enum', async () => {
      const res = await request(app)
        .post('/api/animals')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          ...testAnimal,
          species: 'InvalidSpecies',
        });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/animals', () => {
    beforeEach(async () => {
      // Create some animals
      await request(app)
        .post('/api/animals')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testAnimal);

      await request(app)
        .post('/api/animals')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ ...testAnimal, name: 'Max', species: 'Cat' });
    });

    it('should get all animals for user', async () => {
      const res = await request(app)
        .get('/api/animals')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(2);
    });

    it('should support pagination', async () => {
      const res = await request(app)
        .get('/api/animals?page=1&limit=1')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.pagination).toBeDefined();
      expect(res.body.pagination.total).toBe(2);
    });

    it('should support search by name', async () => {
      const res = await request(app)
        .get('/api/animals?search=Buddy')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe('Buddy');
    });
  });

  describe('GET /api/animals/:id', () => {
    let animalId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/animals')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testAnimal);
      
      animalId = res.body.data._id;
    });

    it('should get animal by ID', async () => {
      const res = await request(app)
        .get(`/api/animals/${animalId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(testAnimal.name);
    });

    it('should return 404 for non-existent animal', async () => {
      const res = await request(app)
        .get('/api/animals/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(404);
    });

    it('should not allow access to other user\'s animal', async () => {
      // Create another user
      const otherUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Other',
          lastName: 'User',
          email: 'other@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .get(`/api/animals/${animalId}`)
        .set('Authorization', `Bearer ${otherUserRes.body.token}`);

      expect(res.status).toBe(403);
    });
  });

  describe('PUT /api/animals/:id', () => {
    let animalId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/animals')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testAnimal);
      
      animalId = res.body.data._id;
    });

    it('should update animal', async () => {
      const res = await request(app)
        .put(`/api/animals/${animalId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Name', age: 4 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Updated Name');
      expect(res.body.data.age).toBe(4);
    });

    it('should not update other user\'s animal', async () => {
      const otherUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Other',
          lastName: 'User',
          email: 'other2@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .put(`/api/animals/${animalId}`)
        .set('Authorization', `Bearer ${otherUserRes.body.token}`)
        .send({ name: 'Hacked Name' });

      expect(res.status).toBe(403);
    });
  });

  describe('DELETE /api/animals/:id', () => {
    let animalId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/animals')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testAnimal);
      
      animalId = res.body.data._id;
    });

    it('should delete animal', async () => {
      const res = await request(app)
        .delete(`/api/animals/${animalId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify deletion
      const getRes = await request(app)
        .get(`/api/animals/${animalId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getRes.status).toBe(404);
    });

    it('should not delete other user\'s animal', async () => {
      const otherUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Other',
          lastName: 'User',
          email: 'other3@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .delete(`/api/animals/${animalId}`)
        .set('Authorization', `Bearer ${otherUserRes.body.token}`);

      expect(res.status).toBe(403);
    });
  });
});
