# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `cdk init app --language typescript`   
OR
`cdk init --template=typescript`   

* `core prepare yarn@stable --activate`
* `touch yarn.lock`
* `yarn config set nodeLinker node-modules`
* `yarn install` 
* `yarn add -D cdktf-cli`  

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

* `yarn cdk get` get the imported terraform modules  
* `yarn deploy:prereq` Create s3 and dynamo. Be aware the you need now to load the state file into the s3 to continue the process (Adjustments in the NamePickerStack.ts probably need to be done). But you need to load the state for the new stack. Why? Because when we run this deploy:prereq i generate cdktf.out with an local state file.

To solve the issue we load the new NamePickerStack.ts without use AwsBaseStack but use TerraformStack and the aws provided. Because it will generate a new tf state file and we will load it into s3 bucket. 

run `yarn deploy` to generate the resources and a local state for the resources api e lambda
run `yarn synth` to update the file cdk.tf.json to point to the state inside the cloud

Go inside the folder to load the terraform state:
1. `cd cdktf.out/stacks/cdktf-name-picker`
2. `terraform init -migrate-state` and the new state is now in the cloud 

Then, we finish updating NamePickerStack.ts to use AwsBaseStack, because our state file will be in the s3 bucket

