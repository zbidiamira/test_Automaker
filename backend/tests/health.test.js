import request from 'supertest';
import createTestApp from './testApp.js';

const app = createTestApp();

describe('Health Records API', () => {
  let authToken;
  let animalId;

  // Create user and animal before tests
  beforeEach(async () => {
    // Register user
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Health',
        lastName: 'Tester',
        email: 'health@example.com',
        password: 'password123',
      });
    
    authToken = userRes.body.token;

    // Create animal
    const animalRes = await request(app)
      .post('/api/animals')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Buddy',
        species: 'Dog',
        breed: 'Labrador',
        age: 3,
        gender: 'Male',
      });
    
    animalId = animalRes.body.data._id;
  });

  const testHealthRecord = {
    symptoms: ['Vomiting', 'Lethargy'],
    diagnosis: 'Mild stomach upset',
    severity: 'Low',
    notes: 'Monitor for 24 hours',
  };

  describe('POST /api/health', () => {
    it('should create a health record', async () => {
      const res = await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          ...testHealthRecord,
          animalId,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.symptoms).toContain('Vomiting');
      expect(res.body.data.diagnosis).toBe(testHealthRecord.diagnosis);
      expect(res.body.data.severity).toBe('Low');
    });

    it('should not create record without symptoms', async () => {
      const res = await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          animalId,
          diagnosis: 'Test',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should not create record for non-existent animal', async () => {
      const res = await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          ...testHealthRecord,
          animalId: '507f1f77bcf86cd799439011',
        });

      expect(res.status).toBe(404);
    });

    it('should create record with medications', async () => {
      const res = await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          ...testHealthRecord,
          animalId,
          medications: [
            { name: 'Antacid', dosage: '10mg', frequency: 'Twice daily' },
          ],
        });

      expect(res.status).toBe(201);
      expect(res.body.data.medications).toHaveLength(1);
      expect(res.body.data.medications[0].name).toBe('Antacid');
    });
  });

  describe('GET /api/health/animal/:animalId', () => {
    beforeEach(async () => {
      // Create some health records
      await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ ...testHealthRecord, animalId });

      await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          animalId,
          symptoms: ['Coughing'],
          severity: 'Medium',
        });
    });

    it('should get all health records for animal', async () => {
      const res = await request(app)
        .get(`/api/health/animal/${animalId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(2);
    });

    it('should support pagination', async () => {
      const res = await request(app)
        .get(`/api/health/animal/${animalId}?page=1&limit=1`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.pagination.total).toBe(2);
    });

    it('should filter by severity', async () => {
      const res = await request(app)
        .get(`/api/health/animal/${animalId}?severity=Medium`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].severity).toBe('Medium');
    });

    it('should not access other user\'s animal records', async () => {
      const otherUser = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Other',
          lastName: 'User',
          email: 'other@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .get(`/api/health/animal/${animalId}`)
        .set('Authorization', `Bearer ${otherUser.body.token}`);

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/health/:id', () => {
    let healthRecordId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ ...testHealthRecord, animalId });
      
      healthRecordId = res.body.data._id;
    });

    it('should get health record by ID', async () => {
      const res = await request(app)
        .get(`/api/health/${healthRecordId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.diagnosis).toBe(testHealthRecord.diagnosis);
    });

    it('should return 404 for non-existent record', async () => {
      const res = await request(app)
        .get('/api/health/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/health/:id', () => {
    let healthRecordId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ ...testHealthRecord, animalId });
      
      healthRecordId = res.body.data._id;
    });

    it('should update health record', async () => {
      const res = await request(app)
        .put(`/api/health/${healthRecordId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          diagnosis: 'Updated diagnosis',
          severity: 'High',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.diagnosis).toBe('Updated diagnosis');
      expect(res.body.data.severity).toBe('High');
    });

    it('should not allow empty symptoms on update', async () => {
      const res = await request(app)
        .put(`/api/health/${healthRecordId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ symptoms: [] });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /api/health/:id', () => {
    let healthRecordId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ ...testHealthRecord, animalId });
      
      healthRecordId = res.body.data._id;
    });

    it('should delete health record', async () => {
      const res = await request(app)
        .delete(`/api/health/${healthRecordId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify deletion
      const getRes = await request(app)
        .get(`/api/health/${healthRecordId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getRes.status).toBe(404);
    });
  });

  describe('GET /api/health/recent', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ ...testHealthRecord, animalId });
    });

    it('should get recent health records for dashboard', async () => {
      const res = await request(app)
        .get('/api/health/recent')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/health/stats', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/health')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ ...testHealthRecord, animalId });
    });

    it('should get health statistics', async () => {
      const res = await request(app)
        .get('/api/health/stats')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.totalRecords).toBeDefined();
      expect(res.body.data.recordsThisMonth).toBeDefined();
    });
  });
});
