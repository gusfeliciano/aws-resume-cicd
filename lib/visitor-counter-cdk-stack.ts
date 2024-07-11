import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class VisitorCounterCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DynamoDB table
    const table = new dynamodb.Table(this, 'VisitorCounterTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // Create Lambda function
    const lambdaFunction = new NodejsFunction(this, 'VisitorCounterFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler',
      entry: 'lambda/index.js',
      environment: {
        TABLE_NAME: table.tableName,
      },
      bundling: {
        externalModules: [
          '@aws-sdk/client-dynamodb',
          '@aws-sdk/util-dynamodb',
        ],
      },
    });

    // Grant the Lambda function read/write permissions to the DynamoDB table
    table.grantReadWriteData(lambdaFunction);

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'VisitorCounterApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: ['https://heyitsgus.com'],
        allowMethods: ['OPTIONS', 'POST'],
        allowHeaders: ['Content-Type'],
      }
    });

    // Add a resource and POST method to the API
    const visitorCount = api.root.addResource('visitorcount');
    visitorCount.addMethod('POST', new apigateway.LambdaIntegration(lambdaFunction));

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });
  }
}