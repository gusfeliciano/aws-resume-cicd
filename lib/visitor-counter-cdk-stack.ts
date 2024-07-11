import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class VisitorCounterCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create DynamoDB table
    const table = new dynamodb.Table(this, "VisitorCounterTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // Create Lambda function
    const lambdaFunction = new lambda.Function(this, "VisitorCounterFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        TABLE_NAME: table.tableName,
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
    const visitorCount = api.root.addResource("visitorcount");
    visitorCount.addMethod(
      "POST",
      new apigateway.LambdaIntegration(lambdaFunction, {
        proxy: true
      })
    );

    // Output the full API URL for the visitorcount resource
    new CfnOutput(this, "ApiUrl", {
      value: `${api.url}visitorcount`,
      description: "API Gateway URL for visitorcount",
    });
  }
}