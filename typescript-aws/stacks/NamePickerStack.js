"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamePickerStack = void 0;
/* The `NamePickerStack` class deploys two Lambda functions, "roulette" and "shuffle", each with a
unique REST API using API Gateway, in an AWS environment. */
const provider_aws_1 = require("@cdktf/provider-aws");
const cdktf_1 = require("cdktf");
const LambdaFunction_1 = require("../constructs/LambdaFunction");
const LambdaRestApi_1 = require("../constructs/LambdaRestApi");
const utils_1 = require("../utils/utils");
class NamePickerStack extends cdktf_1.TerraformStack {
    constructor(scope, id) {
        super(scope, id);
        new provider_aws_1.provider.AwsProvider(this, 'aws-provider', {
            region: 'us-east-1',
        });
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
        const functionNamePicker = new LambdaFunction_1.LambdaFunction(this, 'lambda-funtion', {
            functionName: (0, utils_1.getConstructName)(this, 'api'),
            bundle: './function-name-picker',
            handler: 'index.handler',
        });
        const lambdaRestApi = new LambdaRestApi_1.LambdaRestApi(this, `lambda-rest-api`, {
            handler: functionNamePicker.lambdaFunction,
            stageName: 'dev',
        });
        new cdktf_1.TerraformOutput(this, `namePickerApiUrl`, {
            value: lambdaRestApi.url,
        });
    }
}
exports.NamePickerStack = NamePickerStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmFtZVBpY2tlclN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmFtZVBpY2tlclN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzREQUM0RDtBQUM1RCxzREFBK0M7QUFDL0MsaUNBQW1FO0FBRW5FLGlFQUE4RDtBQUM5RCwrREFBNEQ7QUFDNUQsMENBQWtEO0FBR2xELE1BQWEsZUFBZ0IsU0FBUyxzQkFBYztJQUNsRCxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksdUJBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUM3QyxNQUFNLEVBQUUsV0FBVztTQUNwQixDQUFDLENBQUM7UUFFSCxpQkFBaUI7UUFDakIsT0FBTztRQUNQLDhGQUE4RjtRQUM5RixvSEFBb0g7UUFDcEgseURBQXlEO1FBQ3pELHlEQUF5RDtRQUN6RCxvREFBb0Q7UUFDcEQsUUFBUTtRQUNSLHlDQUF5QztRQUN6Qyw4RUFBOEU7UUFDOUUseURBQXlEO1FBRXpELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSwrQkFBYyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUNwRSxZQUFZLEVBQUUsSUFBQSx3QkFBZ0IsRUFBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1lBQzNDLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUMvRCxPQUFPLEVBQUUsa0JBQWtCLENBQUMsY0FBYztZQUMxQyxTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFlLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQzVDLEtBQUssRUFBRSxhQUFhLENBQUMsR0FBRztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuQ0QsMENBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhlIGBOYW1lUGlja2VyU3RhY2tgIGNsYXNzIGRlcGxveXMgdHdvIExhbWJkYSBmdW5jdGlvbnMsIFwicm91bGV0dGVcIiBhbmQgXCJzaHVmZmxlXCIsIGVhY2ggd2l0aCBhXG51bmlxdWUgUkVTVCBBUEkgdXNpbmcgQVBJIEdhdGV3YXksIGluIGFuIEFXUyBlbnZpcm9ubWVudC4gKi9cbmltcG9ydCB7IHByb3ZpZGVyIH0gZnJvbSAnQGNka3RmL3Byb3ZpZGVyLWF3cyc7XG5pbXBvcnQgeyBUZXJyYWZvcm1TdGFjaywgUzNCYWNrZW5kLCBUZXJyYWZvcm1PdXRwdXQgfSBmcm9tICdjZGt0Zic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IExhbWJkYUZ1bmN0aW9uIH0gZnJvbSAnLi4vY29uc3RydWN0cy9MYW1iZGFGdW5jdGlvbic7XG5pbXBvcnQgeyBMYW1iZGFSZXN0QXBpIH0gZnJvbSAnLi4vY29uc3RydWN0cy9MYW1iZGFSZXN0QXBpJztcbmltcG9ydCB7IGdldENvbnN0cnVjdE5hbWUgfSBmcm9tICcuLi91dGlscy91dGlscyc7XG5pbXBvcnQgeyBBd3NCYXNlU3RhY2sgfSBmcm9tICcuL0F3c0Jhc2VTdGFjayc7XG5cbmV4cG9ydCBjbGFzcyBOYW1lUGlja2VyU3RhY2sgZXh0ZW5kcyAgVGVycmFmb3JtU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIG5ldyBwcm92aWRlci5Bd3NQcm92aWRlcih0aGlzLCAnYXdzLXByb3ZpZGVyJywge1xuICAgICAgcmVnaW9uOiAndXMtZWFzdC0xJyxcbiAgICB9KTtcblxuICAgIC8vIExhYiBxdWVzdGlvbiAxXG4gICAgLy8gVG9Eb1xuICAgIC8vIERlcGxveSB0d28gTGFtYmRhIGZ1bmN0aW9ucyB1bmRlciB0aGUgc2FtZSBzdGFjazogb25lIGZvciBcInJvdWxldHRlXCIgYW5kIG9uZSBmb3IgXCJzaHVmZmxlXCIuXG4gICAgLy8gU2V0IGFuIGVudmlyb25tZW50IHZhcmlhYmxlIFNIVUZGTEUgdG8gJ3RydWUnIGZvciB0aGUgXCJzaHVmZmxlXCIgZnVuY3Rpb24gYW5kICdmYWxzZScgZm9yIHRoZSBcInJvdWxldHRlXCIgZnVuY3Rpb24uXG4gICAgLy8gQ3JlYXRlIGEgUkVTVCBBUEkgZm9yIGVhY2ggZnVuY3Rpb24gdXNpbmcgQVBJIEdhdGV3YXkuXG4gICAgLy8gRW5zdXJlIGVhY2ggTGFtYmRhIGZ1bmN0aW9uIGFuZCBBUEkgaGFzIGEgdW5pcXVlIG5hbWUuXG4gICAgLy8gRGVwbG95IHRoZSBuZXcgYXBwIHRvIG1ha2Ugc3VyZSB5b3VyIGFuc3dlciB3b3Jrc1xuICAgIC8vIEhpbnQhXG4gICAgLy8gQWxsIGNoYW5nZXMgbmVjZXNhc3J5IGFyZSBpbiB0aGlzIGZpbGVcbiAgICAvLyBTb21lIGNvZGUgdG8gZ2V0IHlvdSBzdGFydGVkIChBZGRpbmcgJ2FzIGNvbnN0JyBnaXZlcyB1cyB0eXBlIHNhZmV0eSBoZXJlKTpcbiAgICAvLyBmb3IgKGNvbnN0IHR5cGUgb2YgWydyb3VsZXR0ZScsICdzaHVmZmxlJ10gYXMgY29uc3QpIHtcblxuICAgIGNvbnN0IGZ1bmN0aW9uTmFtZVBpY2tlciA9IG5ldyBMYW1iZGFGdW5jdGlvbih0aGlzLCAnbGFtYmRhLWZ1bnRpb24nLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6IGdldENvbnN0cnVjdE5hbWUodGhpcywgJ2FwaScpLFxuICAgICAgYnVuZGxlOiAnLi9mdW5jdGlvbi1uYW1lLXBpY2tlcicsXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgfSk7XG5cbiAgICBjb25zdCBsYW1iZGFSZXN0QXBpID0gbmV3IExhbWJkYVJlc3RBcGkodGhpcywgYGxhbWJkYS1yZXN0LWFwaWAsIHtcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uTmFtZVBpY2tlci5sYW1iZGFGdW5jdGlvbixcbiAgICAgIHN0YWdlTmFtZTogJ2RldicsXG4gICAgfSk7XG5cbiAgICBuZXcgVGVycmFmb3JtT3V0cHV0KHRoaXMsIGBuYW1lUGlja2VyQXBpVXJsYCwge1xuICAgICAgdmFsdWU6IGxhbWJkYVJlc3RBcGkudXJsLFxuICAgIH0pO1xuICB9XG59XG4iXX0=