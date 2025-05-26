import { App } from 'cdktf';
import { PreReqStack } from './stacks/PreRequeStack';
import { BACKEND_NAME } from './config';


const app = new App();

new PreReqStack(app, BACKEND_NAME, {
    backendName: BACKEND_NAME
});

app.synth();