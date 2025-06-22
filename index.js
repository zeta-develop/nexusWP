#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

// Version check logic
if (process.argv.includes('-v') || process.argv.includes('--version')) {
  try {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const { version } = fs.readJsonSync(packageJsonPath);
    console.log(version);
    process.exit(0);
  } catch (error) {
    try {
        const { version } = require('./package.json');
        console.log(version);
        process.exit(0);
    } catch (innerError) {
        console.error("Error reading CLI version:", innerError);
        process.exit(1);
    }
  }
}

// Help flag check
if (process.argv.includes('-h') || process.argv.includes('--help')) {
  console.log(`
Invoza CLI - Manage Invoza projects and modules.

Usage: invoxa [command] [options]

Commands:
  [project-name]      Creates a new Invoza project with the given name.
                        If no project name is provided, you will be
                        prompted to enter one.
                        Example: invoxa my-new-project

  (no command, when inside an Invoza project directory)
                        Opens an interactive menu to manage the current
                        project, such as installing modules.
                        Example: cd ./my-invoza-project && invoxa

  install:<module-name> Installs a module into the current Invoza project.
                        Must be run from within an Invoza project directory.
                        Example: invoxa install:pterodactyl

Options:
  -v, --version         Output the current version of the Invoza CLI.
  -h, --help            Output this help message.

For more details, please refer to the README.md file.
  `);
  process.exit(0);
}

const CWD = process.cwd();

async function isLikelyInvozaProjectRoot(directory) {
  const markerFilePath = path.join(directory, '.invoza-project-marker');
  return fs.pathExists(markerFilePath);
}

async function findProjectRoot(currentPath = CWD) {
  let dir = currentPath;
  while (dir !== path.parse(dir).root) {
    if (await isLikelyInvozaProjectRoot(dir)) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  if (await isLikelyInvozaProjectRoot(dir)) {
    return dir;
  }
  return null;
}

async function createNewProject() {
  let projectName = process.argv[2];

  if (projectName && (projectName.startsWith('install:') || projectName === 'manage')) {
    projectName = null;
  }

  if (!projectName) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the name for your new Invoza project:',
        validate: function (input) {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          else return 'Project name may only include letters, numbers, underscores and hashes.';
        },
      },
    ]);
    projectName = answers.projectName;
  }

  const targetDir = path.join(CWD, projectName);
  const templateInvoxaDir = path.join(__dirname, 'template', 'invoxa');

  if (await fs.pathExists(targetDir)) {
    console.error(`Error: Directory '${projectName}' already exists at ${targetDir}.`);
    console.error('Please choose a different project name or remove the existing directory.');
    process.exit(1);
  }

  console.log(`Creating new Invoza project '${projectName}' at ${targetDir}...`);

  try {
    await fs.ensureDir(targetDir);
    await fs.copy(templateInvoxaDir, targetDir);
    await fs.writeFile(path.join(targetDir, '.invoza-project-marker'), '');
    console.log('Created .invoza-project-marker file.');
    console.log('Invoza project files copied successfully!');
    console.log(`New project '${projectName}' created at: ${targetDir}`);
    console.log('\nNext steps:');
    console.log(`  cd ${projectName}`);
    console.log('  Follow the instructions in the project\'s README to get started.');
  } catch (err) {
    console.error('An error occurred while creating the project:', err);
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir);
    }
    process.exit(1);
  }
}

async function installModule(moduleName) {
  const projectRoot = await findProjectRoot();

  if (!projectRoot) {
    console.error('Error: This command must be run from within an Invoza project directory or one of its subdirectories.');
    process.exit(1);
  }

  const moduleTemplateDir = path.join(__dirname, 'template', 'modules', moduleName);
  if (!(await fs.pathExists(moduleTemplateDir))) {
    console.error(`Error: Module '${moduleName}' not found.`);
    console.log(`Available modules can be found in the 'template/modules/' directory of the CLI package.`);
    process.exit(1);
  }

  const targetModuleDir = path.join(projectRoot, 'modules', moduleName);

  if (await fs.pathExists(targetModuleDir)) {
    console.warn(`Warning: Module directory '${targetModuleDir}' already exists. Files might be overwritten if they conflict, or new files will be added.`);
  } else {
    await fs.ensureDir(targetModuleDir);
  }

  console.log(`Installing module '${moduleName}' into '${targetModuleDir}'...`);
  try {
    await fs.copy(moduleTemplateDir, targetModuleDir, { overwrite: true });
    console.log(`Module '${moduleName}' installed successfully.`);
  } catch (err) {
    console.error(`Error installing module '${moduleName}':`, err);
    process.exit(1);
  }
}

async function showInteractiveMenu(projectRoot) {
  console.log(`
Managing Invoza project at: ${projectRoot}`);

  const mainMenuChoices = [
    { name: 'Install a new module', value: 'install_module' },
    new inquirer.Separator(),
    { name: 'Exit', value: 'exit' }
  ];

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: mainMenuChoices,
    },
  ]);

  if (action === 'install_module') {
    const modulesDir = path.join(__dirname, 'template', 'modules');
    let availableModules = [];
    try {
      const entries = await fs.readdir(modulesDir, { withFileTypes: true });
      availableModules = entries
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    } catch (err) {
      console.error('Error reading available modules:', err);
      console.log('Please ensure the `template/modules` directory exists in the CLI package.');
      return;
    }

    if (availableModules.length === 0) {
      console.log('No modules available to install.');
      console.log('You can add new modules to the `template/modules` directory in the CLI package.');
      return;
    }

    const { moduleToInstall } = await inquirer.prompt([
      {
        type: 'list',
        name: 'moduleToInstall',
        message: 'Select a module to install:',
        choices: [...availableModules, new inquirer.Separator(), {name: 'Cancel', value: null}],
      },
    ]);

    if (moduleToInstall) {
      await installModule(moduleToInstall);
    } else {
      console.log('Module installation cancelled.');
    }
  } else if (action === 'exit') {
    console.log('Exiting Invoza project manager.');
    process.exit(0);
  }
}

async function main() {
  const firstArg = process.argv[2];
  const projectRoot = await findProjectRoot();

  if (firstArg && firstArg.startsWith('install:')) {
    const moduleName = firstArg.split(':')[1];
    if (!moduleName) {
        console.error("Error: Module name not specified. Usage: invoxa install:<module-name>");
        process.exit(1);
    }
    await installModule(moduleName);
  } else if (!firstArg && projectRoot) {
    await showInteractiveMenu(projectRoot);
  } else if (firstArg && (await fs.pathExists(path.join(CWD, firstArg))) && (await isLikelyInvozaProjectRoot(path.join(CWD, firstArg)))) {
    console.log(`It looks like '${firstArg}' is an Invoza project. To manage it, cd into the directory and run 'invoxa'.`);
  } else {
    await createNewProject();
  }
}

main().catch(error => {
  console.error('A critical error occurred:', error);
  process.exit(1);
});
