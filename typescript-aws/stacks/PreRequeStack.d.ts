import { Construct } from 'constructs';
import { TerraformStack } from 'cdktf';
export interface PreReqStackProps {
    backendName: string;
}
export declare class PreReqStack extends TerraformStack {
    constructor(scope: Construct, id: string, { backendName }: PreReqStackProps);
}
