"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsBaseStack = void 0;
const cdktf_1 = require("cdktf");
const provider_aws_1 = require("@cdktf/provider-aws");
const path = require("path");
const fs = require("fs");
const config_1 = require("../config");
class AwsBaseStack extends cdktf_1.TerraformStack {
    constructor(scope, id) {
        super(scope, id);
        new provider_aws_1.provider.AwsProvider(this, 'aws-provider', {
            region: 'us-east-1',
        });
        const prereqStateFile = path.join(process.env.INIT_CWD, `./terraform.${config_1.BACKEND_NAME}.tfstate`);
        let prereqState = null;
        try {
            prereqState = JSON.parse(fs.readFileSync(prereqStateFile, 'utf-8'));
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`Could not find prerequisite state file: ${prereqStateFile}`);
            }
            throw error;
        }
        // Only one backend is supported by Terraform
        // S3 Backend - https://www.terraform.io/docs/backends/types/s3.html
        new cdktf_1.S3Backend(this, {
            bucket: prereqState.outputs.bucket.value, // Get from output of prerequisite state file
            dynamodbTable: prereqState.outputs.dynamodbTable.value, // Get from output of prerequisite state file
            region: 'us-east-1',
            key: id, // The name of this stack
        });
    }
}
exports.AwsBaseStack = AwsBaseStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXdzQmFzZVN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXdzQmFzZVN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLGlDQUFrRDtBQUNsRCxzREFBK0M7QUFDL0MsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QixzQ0FBeUM7QUFFekMsTUFBYSxZQUFhLFNBQVEsc0JBQWM7SUFDOUMsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLHVCQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDN0MsTUFBTSxFQUFFLFdBQVc7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVMsRUFBRSxlQUFlLHFCQUFZLFVBQVUsQ0FBQyxDQUFDO1FBRWhHLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUM7WUFDSCxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUNoRixDQUFDO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsNkNBQTZDO1FBQzdDLG9FQUFvRTtRQUNwRSxJQUFJLGlCQUFTLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE1BQU0sRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsNkNBQTZDO1lBQ3ZGLGFBQWEsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsNkNBQTZDO1lBQ3JHLE1BQU0sRUFBRSxXQUFXO1lBQ25CLEdBQUcsRUFBRSxFQUFFLEVBQUUseUJBQXlCO1NBQ25DLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTdCRCxvQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tZHluYW1pYy1yZXF1aXJlICovXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IFMzQmFja2VuZCwgVGVycmFmb3JtU3RhY2sgfSBmcm9tICdjZGt0Zic7XG5pbXBvcnQgeyBwcm92aWRlciB9IGZyb20gJ0BjZGt0Zi9wcm92aWRlci1hd3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IEJBQ0tFTkRfTkFNRSB9IGZyb20gJy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBjbGFzcyBBd3NCYXNlU3RhY2sgZXh0ZW5kcyBUZXJyYWZvcm1TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgbmV3IHByb3ZpZGVyLkF3c1Byb3ZpZGVyKHRoaXMsICdhd3MtcHJvdmlkZXInLCB7XG4gICAgICByZWdpb246ICd1cy1lYXN0LTEnLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcHJlcmVxU3RhdGVGaWxlID0gcGF0aC5qb2luKHByb2Nlc3MuZW52LklOSVRfQ1dEISwgYC4vdGVycmFmb3JtLiR7QkFDS0VORF9OQU1FfS50ZnN0YXRlYCk7XG5cbiAgICBsZXQgcHJlcmVxU3RhdGUgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBwcmVyZXFTdGF0ZSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHByZXJlcVN0YXRlRmlsZSwgJ3V0Zi04JykpO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHByZXJlcXVpc2l0ZSBzdGF0ZSBmaWxlOiAke3ByZXJlcVN0YXRlRmlsZX1gKTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIC8vIE9ubHkgb25lIGJhY2tlbmQgaXMgc3VwcG9ydGVkIGJ5IFRlcnJhZm9ybVxuICAgIC8vIFMzIEJhY2tlbmQgLSBodHRwczovL3d3dy50ZXJyYWZvcm0uaW8vZG9jcy9iYWNrZW5kcy90eXBlcy9zMy5odG1sXG4gICAgbmV3IFMzQmFja2VuZCh0aGlzLCB7XG4gICAgICBidWNrZXQ6IHByZXJlcVN0YXRlLm91dHB1dHMuYnVja2V0LnZhbHVlLCAvLyBHZXQgZnJvbSBvdXRwdXQgb2YgcHJlcmVxdWlzaXRlIHN0YXRlIGZpbGVcbiAgICAgIGR5bmFtb2RiVGFibGU6IHByZXJlcVN0YXRlLm91dHB1dHMuZHluYW1vZGJUYWJsZS52YWx1ZSwgLy8gR2V0IGZyb20gb3V0cHV0IG9mIHByZXJlcXVpc2l0ZSBzdGF0ZSBmaWxlXG4gICAgICByZWdpb246ICd1cy1lYXN0LTEnLFxuICAgICAga2V5OiBpZCwgLy8gVGhlIG5hbWUgb2YgdGhpcyBzdGFja1xuICAgIH0pO1xuICB9XG59XG4iXX0=