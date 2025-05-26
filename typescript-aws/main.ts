import { App } from 'cdktf';
import { NamePickerStack } from './stacks/NamePickerStack';
//import { WeekPlannerStack } from './stacks/WeekPlannerStack';

const app = new App();
new NamePickerStack(app, 'cdktf-name-picker');
// Lab question 2
// ToDo
// Update the NamePickerStack class:
//    - Make the stageName configurable by adding a parameter to the constructor that accepts 'dev' or 'prod' with a default value of 'dev'.
//    - Update the code to use this parameter for the stageName of the LambdaRestApi.
// Update the stack instantiation code:
//    - Modify the existing code to create two instances of the NamePickerStack: one for 'dev' (using the default value) and one for 'prod'.
//    - Ensure the new instance for 'prod' is correctly initialized with the appropriate stageName

// Hint!
// All changes necesasry are in this file and the NamePickerStack class
//new NamePickerStack(app, 'cdktf-name-picker-prod');
app.synth();
