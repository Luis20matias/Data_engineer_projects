import { Construct } from 'constructs';
import { TerraformOutput, TerraformStack } from 'cdktf';
import { provider } from '@cdktf/provider-aws';
import { DataAwsCallerIdentity } from '@cdktf/provider-aws/lib/data-aws-caller-identity';
import { S3DynamodbRemoteBackend } from '../.gen/modules/s3-dynamodb-remote-backend';

export interface PreReqStackProps {
  backendName: string;
}

export class PreReqStack extends TerraformStack {
  constructor(scope: Construct, id: string, { backendName }: PreReqStackProps) {
    super(scope, id);

    const currentAccount = new DataAwsCallerIdentity(this, 'current-account', {});

    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });

    const backend = new S3DynamodbRemoteBackend(this, 's3-dynamodb-remote-backend', {
      bucket: `${backendName}-${currentAccount.accountId}`,
      dynamodbTable: backendName,
    });

    new TerraformOutput(this, 'bucket', {
      value: backend.bucket,
    });

    new TerraformOutput(this, 'dynamodbTable', {
      value: backend.dynamodbTable,
    });
  }
}
