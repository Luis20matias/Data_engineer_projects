/* The `NamePickerStack` class deploys two Lambda functions, "roulette" and "shuffle", each with a
unique REST API using API Gateway, in an AWS environment. */
import { provider } from '@cdktf/provider-aws';
import { TerraformStack, S3Backend, TerraformOutput } from 'cdktf';
import { Construct } from 'constructs';
import { LambdaFunction } from '../constructs/LambdaFunction';
import { LambdaRestApi } from '../constructs/LambdaRestApi';
import { getConstructName } from '../utils/utils';
import { AwsBaseStack } from './AwsBaseStack';

export class NamePickerStack extends  AwsBaseStack {// TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    //new provider.AwsProvider(this, 'aws-provider', {
    //  region: 'us-east-1',
    //});

    // Lab question 1
    // ToDo
    // Deploy two Lambda functions under the same stack: one for "roulette" and one for "shuffle".
    // Set an environment variable SHUFFLE to 'true' for the "shuffle" function and 'false' for the "roulette" function.
    // Create a REST API for each function using API Gateway.
    // Ensure each Lambda function and API has a unique name.
    // Deploy the new app to make sure your answer works
    // Hint!
    // All changes necesasry are in this file
    // Some code to get you started (Adding 'as const' gives us type safety here):
    // for (const type of ['roulette', 'shuffle'] as const) {

    const functionNamePicker = new LambdaFunction(this, 'lambda-funtion', {
      functionName: getConstructName(this, 'api'),
      bundle: './function-name-picker',
      handler: 'index.handler',
    });

    const lambdaRestApi = new LambdaRestApi(this, `lambda-rest-api`, {
      handler: functionNamePicker.lambdaFunction,
      stageName: 'dev',
    });

    new TerraformOutput(this, `namePickerApiUrl`, {
      value: lambdaRestApi.url,
    });
  }
}
