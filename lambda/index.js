const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient();

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const params = {
        TableName: process.env.TABLE_NAME,
        Key: { id: { S: 'visitors' } },
        UpdateExpression: 'ADD visitorCount :inc',
        ExpressionAttributeValues: { ':inc': { N: '1' } },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        const command = new UpdateItemCommand(params);
        const data = await client.send(command);
        
        const visitorCount = data.Attributes.visitorCount.N;

        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://heyitsgus.com",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: JSON.stringify({ visitorCount: parseInt(visitorCount) })
        };
        
        console.log('Sending response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "https://heyitsgus.com",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: JSON.stringify({ error: 'Failed to update visitor count' })
        };
    }
};