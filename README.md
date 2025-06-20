# Invoza CLI (invoxa-cli)

This CLI tool scaffolds a new Invoza project.

## Installation

You can install this tool globally using npm (once published):

```bash
npm install -g invoxa-cli
```
Then, you can run the command:
```bash
invoxa my-new-project
```

Alternatively, for one-time use without global installation, you can use `npx`. `npx` will use the command specified in the `bin` of `package.json` (which is `invoxa` for this package):

```bash
npx invoxa-cli my-awesome-project
```

## Usage

To generate a new Invoza project, navigate to the directory where you want to create the project's parent folder and run:

If using `npx`:
```bash
npx invoxa-cli my-new-project
```

Or, if you have installed `invoxa-cli` globally:
```bash
invoxa my-new-project
```

This will create a new directory named `my-new-project` (or your chosen project name) inside the current directory, and copy the basic Invoza project template into it.

**Note:** The command will exit if a directory with the chosen project name already exists in the current location.

## Development (Testing Locally)

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url> # Replace <your-repo-url> with the actual URL
    cd invoxa-cli
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
    If you make changes to `index.js` or other files in the `invoxa-cli` project, these changes are immediately live in your linked `invoxa` command because `npm link` creates a symbolic link. Simply re-run the command in your test directory.

6.  **Unlinking:**
    When you're done testing, you might want to remove the global link.
    From within the `invoxa-cli` project directory, run:
    ```bash
    npm unlink
    ```
    This removes the global link for `invoxa` that was pointing to this local project. If you want to be sure, you can also try `npm uninstall -g invoxa-cli` if you previously installed it globally for testing.

## Project Template

The generated project (e.g., `my-sample-app/`) will have the following basic structure:

-   `index.html`: Main HTML file.
-   `src/`: Directory for your source code.
-   `README.md`: A README for the generated project.
