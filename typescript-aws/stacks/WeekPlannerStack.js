"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeekPlannerStack = void 0;
const cdktf_1 = require("cdktf");
const AwsBaseStack_1 = require("./AwsBaseStack");
class WeekPlannerStack extends AwsBaseStack_1.AwsBaseStack {
    constructor(scope, id) {
        super(scope, id);
        new cdktf_1.TerraformOutput(this, 'weekPickerApiUrl', {
            value: 'https://example.com',
        });
    }
}
exports.WeekPlannerStack = WeekPlannerStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2Vla1BsYW5uZXJTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIldlZWtQbGFubmVyU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQXdDO0FBQ3hDLGlEQUE4QztBQUU5QyxNQUFhLGdCQUFpQixTQUFRLDJCQUFZO0lBQ2hELFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsSUFBSSx1QkFBZSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUM1QyxLQUFLLEVBQUUscUJBQXFCO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQVJELDRDQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBUZXJyYWZvcm1PdXRwdXQgfSBmcm9tICdjZGt0Zic7XG5pbXBvcnQgeyBBd3NCYXNlU3RhY2sgfSBmcm9tICcuL0F3c0Jhc2VTdGFjayc7XG5cbmV4cG9ydCBjbGFzcyBXZWVrUGxhbm5lclN0YWNrIGV4dGVuZHMgQXdzQmFzZVN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBuZXcgVGVycmFmb3JtT3V0cHV0KHRoaXMsICd3ZWVrUGlja2VyQXBpVXJsJywge1xuICAgICAgdmFsdWU6ICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICB9KTtcbiAgfVxufVxuIl19