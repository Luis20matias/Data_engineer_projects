"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreReqStack = void 0;
const cdktf_1 = require("cdktf");
const provider_aws_1 = require("@cdktf/provider-aws");
const data_aws_caller_identity_1 = require("@cdktf/provider-aws/lib/data-aws-caller-identity");
const s3_dynamodb_remote_backend_1 = require("../.gen/modules/s3-dynamodb-remote-backend");
class PreReqStack extends cdktf_1.TerraformStack {
    constructor(scope, id, { backendName }) {
        super(scope, id);
        const currentAccount = new data_aws_caller_identity_1.DataAwsCallerIdentity(this, 'current-account', {});
        new provider_aws_1.provider.AwsProvider(this, 'aws-provider', {
            region: 'us-east-1',
        });
        const backend = new s3_dynamodb_remote_backend_1.S3DynamodbRemoteBackend(this, 's3-dynamodb-remote-backend', {
            bucket: `${backendName}-${currentAccount.accountId}`,
            dynamodbTable: backendName,
        });
        new cdktf_1.TerraformOutput(this, 'bucket', {
            value: backend.bucket,
        });
        new cdktf_1.TerraformOutput(this, 'dynamodbTable', {
            value: backend.dynamodbTable,
        });
    }
}
exports.PreReqStack = PreReqStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlUmVxdWVTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByZVJlcXVlU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQXdEO0FBQ3hELHNEQUErQztBQUMvQywrRkFBeUY7QUFDekYsMkZBQXFGO0FBTXJGLE1BQWEsV0FBWSxTQUFRLHNCQUFjO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsRUFBRSxXQUFXLEVBQW9CO1FBQ3pFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxjQUFjLEdBQUcsSUFBSSxnREFBcUIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFOUUsSUFBSSx1QkFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzdDLE1BQU0sRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLElBQUksb0RBQXVCLENBQUMsSUFBSSxFQUFFLDRCQUE0QixFQUFFO1lBQzlFLE1BQU0sRUFBRSxHQUFHLFdBQVcsSUFBSSxjQUFjLENBQUMsU0FBUyxFQUFFO1lBQ3BELGFBQWEsRUFBRSxXQUFXO1NBQzNCLENBQUMsQ0FBQztRQUVILElBQUksdUJBQWUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ2xDLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFlLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN6QyxLQUFLLEVBQUUsT0FBTyxDQUFDLGFBQWE7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdkJELGtDQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgVGVycmFmb3JtT3V0cHV0LCBUZXJyYWZvcm1TdGFjayB9IGZyb20gJ2Nka3RmJztcbmltcG9ydCB7IHByb3ZpZGVyIH0gZnJvbSAnQGNka3RmL3Byb3ZpZGVyLWF3cyc7XG5pbXBvcnQgeyBEYXRhQXdzQ2FsbGVySWRlbnRpdHkgfSBmcm9tICdAY2RrdGYvcHJvdmlkZXItYXdzL2xpYi9kYXRhLWF3cy1jYWxsZXItaWRlbnRpdHknO1xuaW1wb3J0IHsgUzNEeW5hbW9kYlJlbW90ZUJhY2tlbmQgfSBmcm9tICcuLi8uZ2VuL21vZHVsZXMvczMtZHluYW1vZGItcmVtb3RlLWJhY2tlbmQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByZVJlcVN0YWNrUHJvcHMge1xuICBiYWNrZW5kTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUHJlUmVxU3RhY2sgZXh0ZW5kcyBUZXJyYWZvcm1TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHsgYmFja2VuZE5hbWUgfTogUHJlUmVxU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCBjdXJyZW50QWNjb3VudCA9IG5ldyBEYXRhQXdzQ2FsbGVySWRlbnRpdHkodGhpcywgJ2N1cnJlbnQtYWNjb3VudCcsIHt9KTtcblxuICAgIG5ldyBwcm92aWRlci5Bd3NQcm92aWRlcih0aGlzLCAnYXdzLXByb3ZpZGVyJywge1xuICAgICAgcmVnaW9uOiAndXMtZWFzdC0xJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGJhY2tlbmQgPSBuZXcgUzNEeW5hbW9kYlJlbW90ZUJhY2tlbmQodGhpcywgJ3MzLWR5bmFtb2RiLXJlbW90ZS1iYWNrZW5kJywge1xuICAgICAgYnVja2V0OiBgJHtiYWNrZW5kTmFtZX0tJHtjdXJyZW50QWNjb3VudC5hY2NvdW50SWR9YCxcbiAgICAgIGR5bmFtb2RiVGFibGU6IGJhY2tlbmROYW1lLFxuICAgIH0pO1xuXG4gICAgbmV3IFRlcnJhZm9ybU91dHB1dCh0aGlzLCAnYnVja2V0Jywge1xuICAgICAgdmFsdWU6IGJhY2tlbmQuYnVja2V0LFxuICAgIH0pO1xuXG4gICAgbmV3IFRlcnJhZm9ybU91dHB1dCh0aGlzLCAnZHluYW1vZGJUYWJsZScsIHtcbiAgICAgIHZhbHVlOiBiYWNrZW5kLmR5bmFtb2RiVGFibGUsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==