# Invoza CLI (invoxa)

This CLI tool scaffolds a new Invoza project.

## Installation

You can install this tool globally using npm:
```bash
npm install -g invoxa
```
Then, you can run the command:
```bash
invoxa my-new-project
```

Alternatively, you can install it as a development dependency in your project:
```bash
npm install --save-dev invoxa
```

For one-time use without global or local installation, you can use `npx` (which is recommended to ensure you're using the latest version):
```bash
npx invoxa@latest my-awesome-project
```

## Usage

To generate a new Invoza project, navigate to the directory where you want to create the project's parent folder and run:

If using `npx` (recommended for always using the latest version):
```bash
npx invoxa@latest my-new-project
```

Or, if you have installed `invoxa` globally:
```bash
invoxa my-new-project
```

This will create a new directory named `my-new-project` (or your chosen project name) inside the current directory, and copy the basic Invoza project template into it.

**Note:** The command will exit if a directory with the chosen project name already exists in the current location.

## Development (Testing Locally)

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url> # Replace <your-repo-url> with the actual repository URL
    cd invoxa # Or your cloned directory name, e.g., invoxa-cli
    ```
2.  **Install dependencies for the CLI tool itself:**
    This step is crucial to install `fs-extra` and other dependencies.
    ```bash
    npm install
    ```
3.  **Link the package:**
    This makes the `invoxa` command (as defined in `package.json`'s `bin`) available globally on your system, pointing to your local project files.
    ```bash
    npm link
    ```
    Verify by typing `invoxa` in a new terminal tab/window; it should show the help message if no project name is provided.

4.  **Test the command:**
    Navigate to a *different* directory where you want to create your test project. For example:
    ```bash
    mkdir ../cli-test-projects
    cd ../cli-test-projects
    ```
    Now run the linked `invoxa` command with a project name:
    ```bash
    invoxa my-sample-app
    ```
    You should see a new directory `my-sample-app` created inside `../cli-test-projects`, containing the template files. Check its contents.

5.  **Making changes and re-testing:**
    If you make changes to `index.js` or other files in the `invoxa` project, these changes are immediately live in your linked `invoxa` command because `npm link` creates a symbolic link. Simply re-run the command in your test directory.

6.  **Unlinking:**
    When you're done testing, you might want to remove the global link.
    From within the `invoxa` project directory, run:
    ```bash
    npm unlink
    ```
    This removes the global link for `invoxa` that was pointing to this local project. If you also installed it globally for testing from a registry, you might need `npm uninstall -g invoxa`.

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

## Project Template

The generated project (e.g., `my-sample-app/`) will have the following basic structure:

-   `index.html`: Main HTML file.
-   `src/`: Directory for your source code.
-   `README.md`: A README for the generated project.
