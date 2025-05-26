import { TerraformModule, TerraformModuleUserConfig } from 'cdktf';
import { Construct } from 'constructs';
export interface S3DynamodbRemoteBackendConfig extends TerraformModuleUserConfig {
    /**
    * (Optional, Forces new resource) The name of the bucket. If omitted, Terraform will assign a random, unique name. Must be lowercase and less than or equal to 63 characters in length.
    */
    readonly bucket?: string;
    /**
    * (Optional, Forces new resource) Creates a unique bucket name beginning with the specified prefix. Conflicts with bucket. Must be lowercase and less than or equal to 37 characters in length.
    */
    readonly bucketPrefix?: string;
    /**
    * (Required) The name of the table, this needs to be unique within a region.
    */
    readonly dynamodbTable: string;
    /**
    * (Optional) The AWS KMS master key ID used for the SSE-KMS encryption.
    */
    readonly kmsMasterKeyId?: string;
}
/**
* Defines an S3DynamodbRemoteBackend based on a Terraform module
*
* Docs at Terraform Registry: {@link https://registry.terraform.io/modules/my-devops-way/s3-dynamodb-remote-backend/aws/latest my-devops-way/s3-dynamodb-remote-backend/aws}
*/
export declare class S3DynamodbRemoteBackend extends TerraformModule {
    private readonly inputs;
    constructor(scope: Construct, id: string, config: S3DynamodbRemoteBackendConfig);
    get bucket(): string | undefined;
    set bucket(value: string | undefined);
    get bucketPrefix(): string | undefined;
    set bucketPrefix(value: string | undefined);
    get dynamodbTable(): string;
    set dynamodbTable(value: string);
    get kmsMasterKeyId(): string | undefined;
    set kmsMasterKeyId(value: string | undefined);
    get dynamodbTableNameOutput(): string;
    get s3BucketIdOutput(): string;
    protected synthesizeAttributes(): {
        [name: string]: any;
    };
    protected synthesizeHclAttributes(): {
        [name: string]: any;
    };
}
