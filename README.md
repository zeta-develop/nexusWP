# Invoza CLI (invoxa)

This CLI tool scaffolds a new Invoza project and helps manage its modules.

## Installation

You can install this tool globally using npm:
```bash
npm install -g invoxa
```

Alternatively, for one-time use without global installation (recommended to ensure you're using the latest version):
```bash
npx invoxa@latest <command>
```
(Replace `<command>` with the specific invoxa command you want to run, e.g., `my-project-name` or `install:pterodactyl`)

## Getting Started: Creating a New Invoza Project

To create a new Invoza project (main application):

1.  Navigate to the directory where you want to create the project's parent folder.
2.  Run the command:
    *   **Directly with project name:**
        ```bash
        invoxa my-new-project
        ```
        (Or `npx invoxa@latest my-new-project`)
    *   **Interactively (prompts for project name):**
        ```bash
        invoxa
        ```
        (Or `npx invoxa@latest`)

This command scaffolds the main Invoza application from the CLI's internal `template/invoxa/` directory into a new folder named `my-new-project` (or your chosen name). It also creates an empty `.invoza-project-marker` file in the root of your new project, which helps the CLI identify it as an Invoza project.

**Note:** The project creation will exit if a directory with the chosen project name already exists in the current location.

## Managing an Existing Invoza Project

Once an Invoza project is created:

1.  Navigate into your project's root directory:
    ```bash
    cd my-new-project
    ```
2.  Run `invoxa` without any arguments:
    ```bash
    invoxa
    ```
This will open an interactive menu to help you manage your project. Current options include:
    *   **Install a new module:** Lets you choose from available modules to install into your project.
    *   **Exit:** Closes the interactive menu.

## Installing Modules

Modules provide additional functionalities and are installed into the `<your-project-root>/modules/` directory. You can install modules in two ways:

1.  **Via Interactive Menu:**
    *   Run `invoxa` from your project's root directory.
    *   Choose the "Install a new module" option.
    *   Select the desired module from the list of available modules.

2.  **Via Direct Command:**
    *   From within your project's root directory (or any subdirectory), run:
        ```bash
        invoxa install:<module-name>
        ```
        Example: `invoxa install:pterodactyl`
    *   Replace `<module-name>` with the name of the module you want to install (must match a directory name in `template/modules/`).

## CLI Template Structure (For CLI Developers)

This section describes the template structure within the `invoxa-cli` package itself, which you (as the developer of this CLI tool) would modify to change what gets scaffolded.

*   **`template/invoxa/`**:
    This directory should contain the complete file structure for the main Invoza (Remix.run) application. When a user runs `invoxa <project-name>` or `invoxa` (and provides a name), the contents of this directory are copied to the new project.
    *You should place your core Remix.run project template here.*

*   **`template/modules/`**:
    This is the parent directory for all installable modules.

*   **`template/modules/<module-name>/`**:
    Each subdirectory within `template/modules/` represents an installable module. For example, to create a module named "pterodactyl", you would create a directory `template/modules/pterodactyl/` and place all its files and subdirectories within it.
    The name of the directory (e.g., "pterodactyl") is the `<module-name>` used in `invoxa install:<module-name>` and will be listed in the interactive menu.

## Generated Project Structure

A newly generated Invoza project will have:
*   The contents of the `template/invoxa/` (your core application).
*   An empty `.invoza-project-marker` file in its root.
*   A `modules/` directory (created when you install the first module).

## Development (Testing Locally)

1.  **Clone the `invoxa-cli` repository:**
    ```bash
    git clone <your-repo-url> # Replace <your-repo-url>
    cd invoxa-cli # Or your cloned directory name
    ```
2.  **Install dependencies for the CLI tool itself:**
    ```bash
    npm install
    ```
    (This installs `fs-extra`, `inquirer`, etc.)
3.  **Link the package:**
    This makes your local version of the `invoxa` command globally available.
    ```bash
    npm link
    ```
4.  **Test Project Creation:**
    *   Navigate to a separate test directory (e.g., `mkdir ../my-cli-tests && cd ../my-cli-tests`).
    *   Test creation with argument: `invoxa test-project-arg`
    *   Test creation interactively: `invoxa` (and enter a name like `test-project-interactive`).
5.  **Test Project Management & Module Installation:**
    *   `cd test-project-arg` (or your chosen project name).
    *   Run `invoxa` to open the interactive menu. Test module installation via the menu.
    *   Test direct module installation: `invoxa install:pterodactyl` (assuming 'pterodactyl' is an available module in your CLI's `template/modules/`).
    *   Verify that modules are copied to `test-project-arg/modules/pterodactyl/`.
6.  **Making changes and re-testing:**
    Changes to your local `invoxa-cli` source code are immediately reflected in the linked `invoxa` command.
7.  **Unlinking:**
    From within the `invoxa-cli` project directory:
    ```bash
    npm unlink
    ```
    (To remove the global link. You might also need `npm uninstall -g invoxa` if you globally installed a published version for testing.)

## Publishing to npmjs.com

1.  **Login to npm:**
    If you haven't already, log in to your npm account:
    ```bash
    npm login
    ```
    Enter your npm username, password, and email.

2.  **Check Package Name Availability (Important!):**
    Ensure the package name `invoxa` is available on npmjs.com. If not, you'll need to update the `name` in `package.json` to something unique before publishing.

3.  **Publish the package:**
    Increment the version in `package.json` as needed (e.g., `npm version patch`).
    Then, publish the package using:
    ```bash
    npm publish
    ```
    If you are using two-factor authentication (2FA) on npm, you might need to append a one-time password:
    ```bash
    npm publish --otp=123456
    ```
