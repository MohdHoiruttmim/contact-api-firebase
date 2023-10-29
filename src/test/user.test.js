const supertest = require("supertest");
const web = require("../application/web");
const db = require("../application/database");
const logger = require("../application/logging");

describe('POST /api/users', () => {
  afterAll(async () => {
    // Clean up
    const ref = db.ref("users");
    const snapshot = await ref.orderByChild("username").equalTo("test").get();
    snapshot.forEach((childSnapshot) => {
      ref.child(childSnapshot.key).remove();
    });
  });

  it('should can register user', async () => {
    // Arrange
    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: "test",
        password: "test",
        name: "test",
      });

    // Assert
    expect(result.status).toEqual(201);
    expect(result.body.data.id).toBeDefined();
  });

  it('should cant register user when not valid', async () => {
    // Arrange
    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: "",
        password: "",
        name: "test",
      });
      
      logger.info(result.body);

    // Assert
    expect(result.status).toEqual(400);
    expect(result.body.error).toBeDefined();
  });

  it('should reject if username already exists', async () => {
    // Arrange
    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: "test",
        password: "test",
        name: "test",
      });

      logger.info(result.body);

    // Assert
    expect(result.status).toEqual(400);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toEqual("Username already exists");
  });
});

