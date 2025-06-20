#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Error: Project name is required.');
  console.log('Usage: npx @zeta-develop/invoxa-cli <project-name>');
  process.exit(1);
}

const templateDir = path.join(__dirname, 'template');
// Target directory is now a subdirectory named after the project
const targetDir = path.join(process.cwd(), projectName);

console.log(`Setting up new Invoza project '${projectName}'...`);

async function setupProject() {
  try {
    // Check if the target directory already exists
    if (await fs.pathExists(targetDir)) {
      console.error(`Error: Directory '${projectName}' already exists at ${targetDir}.`);
      console.error('Please choose a different project name or remove the existing directory.');
      process.exit(1);
    }

    // Create the project directory
    await fs.ensureDir(targetDir);

    // Copy template files
    await fs.copy(templateDir, targetDir, {
      overwrite: false, // Should not be necessary due to the check above, but good for safety
      errorOnExist: true // Should also not be hit due to the check, but good for safety
    });

    console.log('Project files copied successfully!');
    console.log(`New project '${projectName}' created at: ${targetDir}`);
    console.log('\nNext steps:');
    console.log(`  cd ${projectName}`);
    // You might want to add other common next steps here, e.g., npm install if your template has its own package.json
    // console.log('  npm install');
    console.log('  Happy coding!');

  } catch (err) {
    console.error('An error occurred while setting up the project:', err);
    // Attempt to clean up the created directory if an error occurs mid-process
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir);
    }
    process.exit(1);
  }
}

setupProject();
