# Cloud Resume Challenge - Backend and CI/CD

This repository contains the backend infrastructure and CI/CD pipeline for my implementation of the Cloud Resume Challenge. It uses AWS CDK to define the cloud resources and GitHub Actions for continuous integration and deployment.

## Project Structure

```
.
├── lib/
│   └── visitor-counter-cdk-stack.ts
├── bin/
│   └── visitor-counter-cdk.ts
├── lambda/
│   ├── index.js
│   └── index.test.js
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
└── README.md
```

## Technologies Used

- AWS CDK (Cloud Development Kit)
- AWS Lambda
- Amazon DynamoDB
- Amazon API Gateway
- Node.js
- TypeScript
- Jest (for testing)
- GitHub Actions (for CI/CD)

## Local Setup

1. Clone this repository:
   ```
   git clone https://github.com/gusfeliciano/visitor-counter-backend.git
   cd visitor-counter-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run tests:
   ```
   npm test
   ```

## Infrastructure as Code (IaC)

This project uses AWS CDK to define and provision AWS resources. The main stack is defined in `lib/visitor-counter-cdk-stack.ts` and includes:

- A DynamoDB table for storing the visitor count
- A Lambda function for incrementing and retrieving the count
- An API Gateway for exposing the Lambda function

To synthesize the CloudFormation template:

```
cdk synth
```

## Lambda Function

The Lambda function (`lambda/index.js`) handles incrementing the visitor count and returning the updated value. It uses the AWS SDK v3 for DynamoDB operations.

## Testing

Unit tests for the Lambda function are located in `lambda/index.test.js`. Run the tests with:

```
npm test
```

## CI/CD Pipeline

The CI/CD pipeline is implemented using GitHub Actions and defined in `.github/workflows/deploy.yml`. It performs the following steps on each push to the `main` branch:

1. Sets up Node.js
2. Installs dependencies
3. Runs tests
4. Installs AWS CDK
5. Configures AWS credentials
6. Bootstraps CDK (if necessary)
7. Deploys the stack to AWS

### Prerequisites for CI/CD:

1. AWS account with appropriate permissions
2. GitHub repository with the following secrets configured:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

## Deployment

The stack is automatically deployed via the GitHub Actions workflow when changes are pushed to the `main` branch. For manual deployment, ensure you have the AWS CLI configured and run:

```
cdk deploy
```

## Customization

To customize this backend for your own use:

1. Update the allowed origins in `visitor-counter-cdk-stack.ts` to match your frontend domain
2. Modify the Lambda function in `lambda/index.js` if you need different functionality
3. Update the tests in `lambda/index.test.js` to match any changes in functionality

## Troubleshooting

If you encounter issues with deployment:

1. Check the GitHub Actions logs for detailed error messages
2. Ensure your AWS credentials have the necessary permissions
3. Verify that the CDK bootstrap stack exists in your AWS account
4. Check the CloudFormation console in AWS for stack creation/update errors

## Contributing

This project is part of my personal implementation of the Cloud Resume Challenge. However, if you notice any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Gus Feliciano - gus.feliciano@outlook.com

Project Link: [https://github.com/gusfeliciano/visitor-counter-backend](https://github.com/gusfeliciano/visitor-counter-backend)

---

This project is part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/), an excellent way to showcase cloud skills and learn new technologies.