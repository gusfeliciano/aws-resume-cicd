const { handler } = require('./index');

// Mock the DynamoDB client
jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      update: jest.fn().mockReturnThis(),
      promise: jest.fn().mockResolvedValue({
        Attributes: { visitorCount: 5 }
      })
    }))
  }
}));

describe('Lambda Handler', () => {
  it('should increment visitor count', async () => {
    const result = await handler({});
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).visitorCount).toBe(5);
  });
});