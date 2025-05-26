import { Construct } from 'constructs';
import { App, TerraformOutput, TerraformStack } from 'cdktf';
import { provider } from '@cdktf/provider-local';
import * as path from 'path';
import { ProjectFolder } from './constructs/ProjectFolder';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Initialize the local provider
    new provider.LocalProvider(this, 'local', {});
    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
    const projectName = 'project-1';

    new ProjectFolder(this, 'project-folder', {
      projectName: projectName,
      projectDirectory: projectDirectory,
    });

    const projectFolder = new ProjectFolder(this, 'project-folder-2', {
      projectName: 'project-2',
      projectDirectory: projectDirectory,
    });

    new TerraformOutput(this, 'readMeContent', {
      value: projectFolder.readMeFile.content
    })

  }
}

const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
